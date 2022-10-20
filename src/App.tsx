import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Bulb from './components/Bulb';
import LoginForm from './components/LoginForm';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container>
        <Row style={{marginTop: '10%'}}>
          <Col md={{offset: 4, span: 4}}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </Web3ReactProvider>
  );
}

export default App;
