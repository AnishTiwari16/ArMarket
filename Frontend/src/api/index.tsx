const generateWalletApi = async () => {
    const resp = await fetch(
        'https://6008-2405-201-4024-580a-207c-b99b-9fe4-e48a.ngrok-free.app/generate-wallet',
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
        'https://6008-2405-201-4024-580a-207c-b99b-9fe4-e48a.ngrok-free.app/post-transaction',
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
