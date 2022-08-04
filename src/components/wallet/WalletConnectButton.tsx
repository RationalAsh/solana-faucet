import { Avatar, IconButton, Tooltip } from '@mui/material';
import { WalletIcon } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useMemo } from 'react';

export interface IWalletConnectButtonProps {
}

export default function WalletConnectButton (props: IWalletConnectButtonProps) {
    const { wallet, connect, connecting, connected } = useWallet();
    const { enqueueSnackbar } = useSnackbar();

    function handleClick(event: any) {
        if (!connected) {
            connect()
                .then(() => {
                    enqueueSnackbar('Wallet Connected!', { variant: 'success', autoHideDuration: 3000});
                })
                .catch(() => {

            })
            
        }
    }

    const tooltipContent = useMemo(() => {
        if (connecting) return 'Connecting...'
        if (connected) return 'Wallet Connected'
        if (wallet) return 'Connect'
        return 'Connect Wallet'
    }, [connecting, connected, wallet])

    return (
        <Tooltip title={tooltipContent}>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: connected ? "#14F195" : "#F11470" }}>
                <WalletIcon wallet={wallet}/>
            </Avatar>
            </IconButton>
        </Tooltip>
    );
}
