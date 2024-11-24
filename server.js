const express = require("express");
const ArLocal = require("arlocal").default;
const Arweave = require("arweave");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { TurboFactory } = require("@ardrive/turbo-sdk");

const app = express();
const port = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Setup Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Initialize ArLocal and Arweave
let arLocal;
let arweave;

// Start ArLocal and initialize Arweave
const initialize = async () => {
  arLocal = new ArLocal(1984, true, "./db", true);
  await arLocal.start();

  arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });

  console.log("ArLocal started on port 1984");
};

// Stop ArLocal on server shutdown
const cleanup = async () => {
  if (arLocal) {
    await arLocal.stop();
    console.log("ArLocal stopped");
  }
};

// File Upload Endpoint
app.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Load JWK from server directory
    const jwkPath = path.join(__dirname, "jwk.json");
    const jwk = JSON.parse(fs.readFileSync(jwkPath, "utf8"));

    const filePath = file.path;
    const turbo = TurboFactory.authenticated({ privateKey: jwk });
    const address = await arweave.wallets.jwkToAddress(jwk);
    const fileSize = fs.statSync(filePath).size;

    // Get the cost of uploading the file
    const [{ winc: fileSizeCost }] = await turbo.getUploadCosts({
      bytes: [fileSize],
    });
    const { winc: balance } = await turbo.getBalance();

    if (balance < fileSizeCost) {
      const { url } = await turbo.createCheckoutSession({
        amount: fileSizeCost,
        owner: address,
      });
      return res
        .status(402)
        .json({ message: "Insufficient balance. Top-up required.", url });
    }

    // Upload the file
    const { id, owner, dataCaches, fastFinalityIndexes } =
      await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fileSize,
      });

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "File uploaded successfully!",
      id,
      owner,
      dataCaches,
      fastFinalityIndexes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, async () => {
  await initialize();
  console.log(`Server is running at http://localhost:${port}`);
});

// Handle cleanup on shutdown
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
