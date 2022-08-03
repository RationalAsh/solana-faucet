import { Avatar, IconButton, Tooltip } from '@mui/material';
import { useWalletDialog, WalletIcon } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { AiOutlineWallet } from 'react-icons/ai';

export interface IWalletSelectButtonProps {
}

export default function WalletSelectButton (props: IWalletSelectButtonProps) {

    const { setOpen } = useWalletDialog();

    return (
        <Tooltip title="Select Wallet">
            <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "#F11470" }}>
                    <AiOutlineWallet/>
                </Avatar>
              </IconButton>
        </Tooltip>
    );
}
