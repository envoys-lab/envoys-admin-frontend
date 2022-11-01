import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Bulb from './components/Bulb';
import LoginForm from './components/LoginForm';
import "./App.css"

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import MainPage from './components/MainPage';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  const [viewStatus, setViewStatus] = React.useState(0);
  const showMain = () => {
    console.log("show main")
    setViewStatus(1);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container>
        <Row style={viewStatus == 0 ? {marginTop: '10%'} : {}}>
          {viewStatus == 0 &&
            <Col md={{offset: 4, span: 4}}>
              <LoginForm onContinue={showMain} />
            </Col>
          }

          {viewStatus == 1 &&
            <Col  >
              <MainPage />
            </Col>
          }
        </Row>
      </Container>
    </Web3ReactProvider>
  );
}

export default App;
