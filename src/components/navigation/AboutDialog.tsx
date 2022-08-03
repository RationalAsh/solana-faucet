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
          <Typography variant="h3">
          1. What does this dApp do?
          </Typography>
        </Dialog>
      </div>
    );
  }