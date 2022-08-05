import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDialogProvider, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/navigation/AppBar';
import { Box, Container } from '@mui/material';

import{ SnackbarProvider, useSnackbar } from 'notistack'
import OutlinedCard from './components/airdrop/Airdropper';
import Airdropper from './components/airdrop/Airdropper';

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork.Devnet;
    const network = WalletAdapterNetwork.Testnet;

    // You can also provide a custom RPC endpoint.
    // const endpoint = "http://localhost:8899";
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolanaMobileWalletAdapter(
                {   appIdentity: {name: "I Mint, Therefore I Am"}, 
                    authorizationResultCache: createDefaultAuthorizationResultCache(),
                    cluster: network
                }),
            new SolflareWalletAdapter()
        ],
        [network]
    );

  return (
        <SnackbarProvider maxSnack={5}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider autoConnect wallets={wallets}>
                    <WalletDialogProvider>
                        {children}
                    </WalletDialogProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SnackbarProvider>
  );
};

const Content: FC = () => {
  return (
      <div className="App">
          <ResponsiveAppBar/>
          <Box height="100vh" sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'palette.background.paper' }}>
            <Airdropper/>
          </Box>
      </div>
  );
};

const App: FC = () => {
  return (
      <Context>
          <Content />
      </Context>
  );
};

export default App;
