import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction } from 'react';
import { Box, Grid, Link } from '@mui/material';
import { Container } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AboutDialogProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function AboutDialog(props: AboutDialogProps) {
    // const [open, setOpen] = React.useState(props.show);

  
    return (
      <div>
        <Dialog
          fullScreen
          open={props.show}
          onClose={() => props.setShow(false)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => props.setShow(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                About
              </Typography>
              <Button autoFocus color="inherit" onClick={() => props.setShow(false)}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
              <Typography variant="body1">
              This is a React app that airdrops SOL to your testnet or devnet 
              wallets. I made it to learn how to write apps that interact with Solana and to make it easier 
              to airdrop myself SOL for the many Solana projects I'm trying out. To find out more about me, 
              check out <Link rel="noreferrer" href="https://www.ashwinnarayan.com/" target="_blank">my home page</Link>.
              <p>This project is open source. Check out the code 
              <Link href='https://github.com/RationalAsh/solana-faucet' target='_blank' rel='noreferrer'> here</Link></p>
              </Typography>

              <Typography variant="h4">
              FAQ
              </Typography>
              <Typography variant="h5">
              Why do I need to connect my wallet?
              </Typography>
              <Typography variant="body1">
              You do not need to. If you connect your wallet however, the website will auto-fill your public key for the airdrop.
              </Typography>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </div>
    );
  }