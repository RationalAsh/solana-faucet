import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useWalletDialog, WalletDialogProvider, WalletIcon, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';

import { AiOutlineWallet } from 'react-icons/ai'
import { yellow } from '@mui/material/colors';
import AboutDialog from './AboutDialog';

import imtia from '../images/imtia.jpeg'

const pages = ['About', 'Contact Me'];
const settings = ['Connect Wallet'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav]   = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet();
  const { setOpen } = useWalletDialog();
  const [anchor, setAnchor] = useState<HTMLElement>();
  const [showAbout, setShowAbout] = useState(false);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

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
    connect().catch(()=> {});
  }

  function handleWalletDisconnect(event: any) {
    disconnect().catch(() => {});
    handleCloseUserMenu();
  }

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img alt="logo" src={imtia} style={{width:"4rem", height: undefined, padding:8}}></img>
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
            I MINT, THEREFORE I AM
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
              fontSize: 10,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            I MINT, THEREFORE I AM
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

          <Box sx={{ flexGrow: 0, bgcolor: "#9945FF" }}>
            <Tooltip title={connected?"Wallet Connected":"Connect Wallet"}>
              <IconButton onClick={wallet?handleOpenUserMenu:handleWalletSelect} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: connected ? "#14F195" : "#F11470" }}>
                  { wallet ? 
                    <WalletIcon wallet={wallet}/> :
                    <AiOutlineWallet/>
                  }
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { publicKey ?
                <MenuItem onClick={publicKey?handleWalletDisconnect:handleWalletConnect}>
                  <Typography textAlign="center">
                  { connected ? 
                    "Disconnect Wallet" :
                    "Connect Wallet"
                  }
                  </Typography>
                </MenuItem> :
                <></>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <AboutDialog show={showAbout} setShow={setShowAbout}/>
    </>
  );
};
export default ResponsiveAppBar;