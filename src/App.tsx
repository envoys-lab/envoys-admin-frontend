import { Col, Container, Row } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import './App.css'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import MainPage from './components/MainPage'
import { AuthProvider, useAuthKey } from './contexts/AuthContext'
import { CompanyProvider } from './contexts/ProvidedCompanyContext'
import { Popup, PopupProvider } from './contexts/PopupContext'
import useIsAuthed from './hooks/useIsAuthed'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function Providers() {
  return (
    <PopupProvider>
      <CompanyProvider>
        <AuthProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <App />
          </Web3ReactProvider>
        </AuthProvider>
      </CompanyProvider>
    </PopupProvider>
  )
}

function App() {
  const isAuthed = useIsAuthed()

  return (

    <Container>
      <Popup />
      <Row style={!isAuthed ? { marginTop: '10%' } : {}}>
        {!isAuthed ? (
          <Col md={{ offset: 4, span: 4 }}>
            <LoginForm />
          </Col>
        ) : (
          <Col>
            <MainPage />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default Providers
