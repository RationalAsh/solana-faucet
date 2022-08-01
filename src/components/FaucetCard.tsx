import * as React from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export interface IFaucetProps {
}


export default function Faucet (props: IFaucetProps) {
    // Set up our context and state.
    const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet, connected } = useWallet();
    const [ currentPubkey, setCurrentPubkey ] = useState("");
    const [ solAmount, setSolAmount ] = useState<Number>(1.0);
    // const [ network]


    function handleSolChange(event: any) {
        setSolAmount(event.target.value.parseFloat());
    }
    
    return (
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
                                        inline
                                        label="Testnet"
                                        name="testnet"
                                        type="radio"
                                        id="inline-testnet-radio"
                                        checked={wallet?.adapter.url.includes('testnet')}
                                        disabled
                                        />
                                    <Form.Check
                                        inline
                                        label="Devnet"
                                        name="devnet"
                                        type='radio'
                                        id='inline-devnet-radio'
                                        checked={wallet?.adapter.url.includes('devnet')}
                                        disabled
                                        />
                                    <Form.Check
                                        inline
                                        label="Mainnet-beta"
                                        name="mainnet"
                                        type='radio'
                                        id='inline-mainnet-radio'
                                        checked={wallet?.adapter.url.includes('mainnet')}
                                        disabled
                                        />
                                    
                                </Form>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
