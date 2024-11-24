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
export { generateWalletApi, handleTrxApi };
