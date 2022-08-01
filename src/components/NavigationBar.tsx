import * as React from 'react';
import { Button, Col, Container, Image, Modal, Navbar, Row } from 'react-bootstrap';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface INavigationBarProps {
}

const NavigationBar: React.FunctionComponent<INavigationBarProps> = (props) => {
  // Set up our context and state
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
    <Navbar collapseOnSelect bg="dark" expand="md" variant="dark">
        <Container>
            <Navbar.Brand href="/">
              <img
                src="/brand-logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              /> {' '}
              Ashwin's Solana Faucet
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Button variant="dark" onClick={() => {setShowAboutModal(true)}}>About</Button>
            <div className='ms-auto'><WalletMultiButton/></div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    <Modal show={showAboutModal} fullscreen={true} onHide={() => setShowAboutModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='text-justify'>This is a React app that airdrops SOL to your testnet or devnet 
            wallets. I made it to learn how to write apps that interact with Solana and to make it easier 
            to airdrop myself SOL for the many Solana projects I'm trying out. To find out more about me, 
            check out <a href="https://www.ashwinnarayan.com/" target="_blank">my home page</a>.</p> 
        </Modal.Body>
    </Modal>
    </>
  );
};

export default NavigationBar;
