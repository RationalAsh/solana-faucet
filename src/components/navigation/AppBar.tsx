import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { useWalletDialog } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';

import { yellow } from '@mui/material/colors';
import AboutDialog from './AboutDialog';

import imtia from '../../img/imtia.jpeg'
import brandLogo from '../../img/brand-logo.png'
import WalletButton from '../wallet/WalletButton';
import { useSnackbar } from 'notistack';

const pages = ['About', 'Contact Me'];
const settings = ['Connect Wallet'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav]   = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet();
  const { setOpen } = useWalletDialog();
  const [anchor, setAnchor] = useState<HTMLElement>();
  const [showAbout, setShowAbout] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  // Notifications for wallet connections.
  useEffect(() => {
    if (connecting) {
      enqueueSnackbar('Connecting to wallet ...', {variant: 'info', autoHideDuration: 3000});
    }

    if (connected) {
      enqueueSnackbar('Wallet Connected!', {variant: 'success', autoHideDuration: 3000});
    }
  
    return () => {
      // Cleanup code goes here.
    }
  }, [connected, connecting])
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleWalletSelect(event: any) {
    setOpen(true);
  }

  function handleWalletConnect(event: any) {
    setAnchorElUser(null);
    connect().catch(()=> {});
  }

  function handleWalletDisconnect(event: any) {
    setAnchorElUser(null);
    disconnect().catch(() => {});
  }

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img alt="logo" src={brandLogo} style={{width:"4rem", height: undefined, padding:8}}></img>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ashwin's Solana Faucet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => setShowAbout(true)}>
                  <Typography textAlign="center">About</Typography>
              </MenuItem>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '.08rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ashwin's Solana Faucet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
                onClick={() => setShowAbout(true)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
          </Button>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <WalletButton/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <AboutDialog show={showAbout} setShow={setShowAbout}/>
    </>
  );
};
export default ResponsiveAppBar;