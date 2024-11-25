import React from 'react';
import ShimmerButton from '../button';
import { account } from '../../App';
import useGlobalStore from '../../store';
import toast from 'react-hot-toast';
import { toastStyles } from '../../lib/helper';
import MyModal from '../modal';
import { ArAccount } from 'arweave-account';
import { message, createDataItemSigner, result } from '@permaweb/aoconnect';
import SlideToggle from '../toggle/SlideToggle';
import { useMutation, useQuery } from '@tanstack/react-query';
import { generateWalletApi, getBalance, sendTestTokensApi } from '../../api';
import { SquareArrowOutUpRight } from 'lucide-react';
import Logo from '../../assets/logoar.png';
const processId = 'maAYW2mCi0dJZuJudHkgFMGIPO_nBv-0wXThdkJ-w3Y';
const Header = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const {
        userDetails,
        setUserDetails,
        userWallet,
        setUserWallet,
        isToggled,
    } = useGlobalStore();
    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = React.useState<any>({});
    const [userBalance, setUserBalance] = React.useState('');
    const [trxId, setTrxId] = React.useState('');
    const { mutateAsync: addGenerateWalletMutation, isPending } = useMutation({
        mutationFn: generateWalletApi,
        onSuccess: (data) => {
            setUserWallet({ wallet: data.wallet, addr: data.addr });
        },
    });
    const { data } = useQuery({
        queryKey: ['balance'],
        queryFn: () => getBalance(userWallet.addr),
        enabled: !!userWallet.addr,
    });
    const { mutateAsync: sendTestTokens } = useMutation({
        mutationFn: sendTestTokensApi,
        onSuccess: (data) => {
            toast.dismiss();
            toast.success('Woo Ho your funds have arrived 🎉', toastStyles);
            setTrxId(data.rawResponse);
        },
        onError: () => {
            toast.error('Error sending test token', toastStyles);
        },
    });
    const handleConnect = async () => {
        await window.arweaveWallet.connect([
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'DISPATCH',
        ]);
        setIsConnected(true);
    };
    const handleGenerateWallet = async () => {
        try {
            await addGenerateWalletMutation();
        } catch (e) {
            toast.error('Error generating wallet', toastStyles);
        }
    };

    const fetchUserBalance = async (addr: string) => {
        const response = await message({
            process: processId,
            tags: [{ name: 'Action', value: 'Balance' }],
            signer: createDataItemSigner(window.arweaveWallet),
            data: addr,
        });
        const r = await result({
            message: response,
            process: processId,
        });
        setUserBalance(r.Messages[0].Data);
        return r.Messages[0].Data;
    };
    React.useEffect(() => {
        const handler = async () => {
            const activeAddress = await window.arweaveWallet.getActiveAddress();
            const info: ArAccount = await account.get(activeAddress);
            setInfo(info.profile);
            setUserDetails({
                address: info.handle,
                profile: info.profile.avatarURL,
                name: info.profile.name,
                bio: info.profile.bio,
            });
            const resp = await fetchUserBalance(info.addr); //fetch balance from contract

            if (resp <= '0') {
                toast.loading('Sending test token...', toastStyles);
                await sendTestTokens({
                    processId: processId,
                    recipient: info.addr,
                    quantity: 100,
                });
                fetchUserBalance(info.addr);
            }
        };
        if (isConnected) {
            handler();
        }
    }, [isConnected]);

    return (
        <>
            {open && <MyModal open={open} setOpen={setOpen} info={info} />}
            <div className="px-12 mx-auto flex items-center justify-between pt-5">
                <div className="font-bold text-lg flex items-center gap-x-2">
                    <img
                        src={Logo}
                        alt="logo"
                        height={80}
                        width={80}
                        className="rounded-lg"
                    />
                    ArMarket
                </div>

                {!userWallet.addr && !isConnected ? (
                    <div className="flex items-center gap-x-4">
                        <p
                            className={`${
                                !isToggled && 'text-[#ff6b65]'
                            } font-semibold`}
                        >
                            Testnet
                        </p>
                        <SlideToggle />
                        <p
                            className={`${
                                isToggled && 'text-[#905abc]'
                            } font-semibold`}
                        >
                            Mainnet
                        </p>
                        <ShimmerButton
                            className="shadow-2xl"
                            onClick={
                                !isToggled
                                    ? handleGenerateWallet
                                    : handleConnect
                            }
                        >
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                {isToggled
                                    ? 'Connect Wallet'
                                    : !isToggled && isPending
                                    ? 'Loading...'
                                    : 'Generate Wallet'}
                            </span>
                        </ShimmerButton>
                    </div>
                ) : (
                    <ShimmerButton className=" flex items-center">
                        {isToggled &&
                            (userDetails.profile ? (
                                <img
                                    src={userDetails.profile}
                                    alt="profile"
                                    height={40}
                                    width={40}
                                />
                            ) : (
                                <div className="text-white">Loading...</div>
                            ))}
                        <div
                            className="text-white px-4"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    userDetails.address
                                );
                                toast.success(
                                    'Address copied to clipboard',
                                    toastStyles
                                );
                            }}
                        >
                            {isToggled
                                ? userDetails.address +
                                  ' ' +
                                  (userBalance
                                      ? userBalance + ' USDC'
                                      : 'Fetching balance...')
                                : userWallet.addr.slice(0, 6) +
                                  '...' +
                                  userWallet.addr.slice(-6) +
                                  '  ' +
                                  (data?.balance / 1e18).toString().slice(0, 5)}
                        </div>
                        {trxId && (
                            <a
                                href={`https://www.ao.link/#/message/${trxId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white pr-4"
                            >
                                <SquareArrowOutUpRight size={15} />
                            </a>
                        )}
                        <div
                            className="text-white"
                            onClick={async () => {
                                await window.arweaveWallet.disconnect();
                                setUserWallet({ wallet: '', addr: '' });
                                setIsConnected(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                                />
                            </svg>
                        </div>
                        <div
                            className="text-white ml-3"
                            onClick={() => setOpen(true)}
                        >
                            ...
                        </div>
                    </ShimmerButton>
                )}
            </div>
        </>
    );
};

export default Header;
