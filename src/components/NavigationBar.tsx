import * as React from 'react';
import { Button, Col, Container, Image, Modal, Navbar, Row } from 'react-bootstrap';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

interface INavigationBarProps {
}

const NavigationBar: React.FunctionComponent<INavigationBarProps> = (props) => {
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
            to airdrop myself SOL for the many Solana projects I'm trying to do.</p>

            <h4> Minting Instructions </h4>
            <p className='text-justify'>
              This app currently works on the Solana <a target="_blank" href="https://docs.solana.com/clusters">testnet </a> 
               so you do not need to spend any money to test it out. However, to use it you need to change your wallet network
               to testnet. 
            </p>

            <Container fluid="sm">
              <Row>
                <Col lg={4} sm={12}>
                  <Image fluid rounded src="phantom-settings.png"/>
                </Col>
                <Col lg={4} sm={12}>
                  <Image fluid rounded src="phantom-wallet-change-network.png"/>
                </Col>
                <Col lg={4} sm={12}>
                  <Image fluid rounded src="phantom-wallet-network.png"/>
                </Col>
              </Row>
            </Container>
            <p>

            <p className='text-justify'>
              You will also need some SOL in your testnet wallet. You can use  
              a <a href='https://solfaucet.com' target='_blank'>Solana Faucet</a> to airdrop
              yourself some SOL.
            </p>

            </p>
            <p className='text-justify'>After changing your network, connect your phantom wallet, enter a name for your new NFT and click mint. The solana network sometimes 
            has issues with throughput and minting might fail. If that happens, try minting again. Sometimes, the transaction
            times out and "fails". If this happens, please wait for a few minutes and reload the page or check your wallet to see if the NFT was minted.</p>

            <h4>Can I customize the image / description / symbol / other metadata? </h4>
            <p className='text-justify'>The app will mint a new NFT with the name you entered in the input form. The name is the only thing you can 
            customize about the NFT right now. Check back later for more features!</p>

            <h4> Why are my existing NFTs not showing? </h4>
            This app only shows NFTs that were minted here. 
        </Modal.Body>
    </Modal>
    </>
  );
};

export default NavigationBar;
