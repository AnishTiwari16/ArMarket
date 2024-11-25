const generateWalletApi = async () => {
    const resp = await fetch(
        'https://armarket-production.up.railway.app/generate-wallet',
        { method: 'POST' }
    );
    const data = await resp.json();
    return data;
};
const handleTrxApi = async ({
    wallet,
    data,
}: {
    wallet: string;
    data: any;
}) => {
    const resp = await fetch(
        'https://armarket-production.up.railway.app/post-transaction',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet, data }),
        }
    );
    const result = await resp.json();
    return result;
};
const getBalance = async (addr: string) => {
    const resp = await fetch(
        `https://armarket-production.up.railway.app/balance/${addr}`
    );
    const data = await resp.json();
    return data;
};
const getAiResponse = async (details: string) => {
    const resp = await fetch(
        `https://wapo-testnet.phala.network/ipfs/QmXDgi7jbmQjEVdqSuJhWxTpAx5fvgqLzbhPTWg2XGjePk?key=c74d9db176043e5e&chatQuery=${details}`
    );
    const data = await resp.json();
    return data.message;
};
const uploadFile = async ({ file: formData }: { file: FormData }) => {
    const resp = await fetch(
        'https://armarket-production.up.railway.app/upload-file',
        {
            method: 'POST',

            body: formData,
        }
    );
    const data = await resp.json();
    return data;
};
const sendTestTokensApi = async ({
    processId,
    recipient,
    quantity,
}: {
    processId: string;
    recipient: string;
    quantity: number;
}) => {
    const resp = await fetch(
        'https://ao-transfer-production.up.railway.app/transfer',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ processId, recipient, quantity }),
        }
    );
    const data = await resp.json();
    return data;
};
export {
    generateWalletApi,
    handleTrxApi,
    getBalance,
    getAiResponse,
    uploadFile,
    sendTestTokensApi,
};
