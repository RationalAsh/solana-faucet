import * as React from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, Nav, Row, Toast, ToastContainer } from 'react-bootstrap';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export interface IFaucetProps {
}


export default function Faucet (props: IFaucetProps) {
    // Set up our context and state.
    const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet, connected } = useWallet();
    const [ currentPubkey, setCurrentPubkey ] = useState("");
    const [ solAmount, setSolAmount ] = useState<number>(1.0);
    const [ isTestnet, setIsTestnet ] = useState<boolean>(true);
    // const [ showError, setShowError ] = useState<string>("");

    // Set up different connections for testnet and devnet.
    const testnetURL = clusterApiUrl(WalletAdapterNetwork.Testnet);
    const testnetConnection = new Connection(testnetURL);
    const devnetURL = clusterApiUrl(WalletAdapterNetwork.Devnet);
    const devnetConnection = new Connection(devnetURL);


    function handleSolChange(event: any) {
        setSolAmount(event.target.value.parseFloat());
    }

    // Request airdrop
    async function handleAirdropRequest(event: any) {
        if (publicKey) {
            try {
                await ((isTestnet ? testnetConnection : devnetConnection)
                    .requestAirdrop(publicKey, LAMPORTS_PER_SOL * solAmount))
                    .then((resp: any) => {
                        console.log(resp);
                    });
            } catch (error: any) {
                console.log(error);
            }
        } else {
            try {
                const pkey = new PublicKey(currentPubkey);
                await ((isTestnet ? testnetConnection : devnetConnection)
                    .requestAirdrop(pkey, LAMPORTS_PER_SOL * solAmount))
                    .then((resp: any) => {
                        console.log(resp);
                    });
            } catch (error: any) {
                console.log(error);
            }
        }
        
    }
    
    return (
        <>
        <Container fluid="sm">
            <Row>
                <Col className='d-flex justify-content-center px-2 py-5'>
                    <Card className='shadow' style={{width: '48rem'}}>
                        <Card.Header>
                            <Card.Title>Airdrop Yourself SOL</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Form>
                                    <Form.Group as={Row} className='px-2 py-2'>
                                    <Form.Label htmlFor='wallet-pubkey'>Public Key:</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        disabled={connected}
                                        value={publicKey ? publicKey.toBase58() : currentPubkey}/>
                                    </Form.Group>
                                    <Form.Group as={Row} className='px-2 py-2'>
                                    <Form.Label htmlFor='sol-amount'>SOL</Form.Label>
                                    <Form.Control 
                                        type='number' 
                                        defaultValue="1.0"
                                        step="0.5"
                                        onChange={handleSolChange}/>
                                    </Form.Group>

                                    <Form.Check 
                                        checked={isTestnet}
                                        onClick={() => setIsTestnet((old) => {return !old})}
                                        type="switch"
                                        label="Testnet"
                                        id="testnet-switch"
                                    />
                                    <Form.Check 
                                        checked={!isTestnet}
                                        onClick={() => setIsTestnet((old) => {return !old})}
                                        type="switch"
                                        label="Devnet"
                                        id="devnet-switch"
                                    />
                                </Form>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Container>
                                <Button 
                                    className='ml-auto' 
                                    variant='primary'
                                    onClick={handleAirdropRequest}>
                                Send
                                </Button>
                            </Container>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
        <ToastContainer>
            
        </ToastContainer>
        </>
    );
}
