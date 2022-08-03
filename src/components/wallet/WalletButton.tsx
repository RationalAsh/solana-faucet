import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useWalletDialog, WalletIcon } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { useMemo, useState } from 'react';
import WalletConnectButton from './WalletConnectButton';
import WalletSelectButton from './WalletSelectButton';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useSnackbar } from 'notistack';

export interface IWalletButtonProps {
}

export default function WalletButton (props: IWalletButtonProps) {
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const { setOpen } = useWalletDialog();
    const [anchor, setAnchor] = useState<HTMLElement>();
    const { enqueueSnackbar } = useSnackbar();

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

    if (!wallet) {
        return (
            <WalletSelectButton/>
        );
    }
    if (!base58) {
        return (
            <WalletConnectButton/>
        );
    }


    return (
        <>
            <Tooltip title={connected?"Wallet Connected":"Connect Wallet"}>
              <IconButton onClick={(event) => setAnchor(event.currentTarget)} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: connected ? "#14F195" : "#F11470" }}>
                    <WalletIcon wallet={wallet}/>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu 
                sx={{ mt: '45px' }}
                id='menu-wallet'
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!anchor}
                onClose={() => setAnchor(undefined)}>
                
                <MenuItem 
                    onClick={ async () => {
                        setAnchor(undefined);
                        await navigator.clipboard.writeText(base58);
                        enqueueSnackbar('Address copied!', { variant: 'info', autoHideDuration: 3000});
                    }}>
                    <ContentCopyIcon color='primary'/>
                    <Typography color='primary'>
                        Copy address
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setAnchor(undefined);
                        setOpen(true);
                    }}>
                    <SwapHorizIcon color='primary'/>
                    <Typography color='primary'>
                        Change Wallet
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setAnchor(undefined);
                        disconnect().catch(() => {

                        })
                        enqueueSnackbar('Wallet disconnected!', { variant: 'error', autoHideDuration: 3000});
                    }}>
                    <LinkOffIcon color='primary'/>
                    <Typography color='primary'>
                        Disconnect
                    </Typography>
                </MenuItem>

            </Menu>
        </>
    );
}
