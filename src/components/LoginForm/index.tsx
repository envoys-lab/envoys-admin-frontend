import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { FaSync } from 'react-icons/fa'
import Api from '../../utils/api/Api'
import ConnectWalletButton from '../ConnectWalletButton'

const DisconnectButton = () => {
  const { deactivate } = useWeb3React()
  const onClick = () => deactivate()

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <a href="#" onClick={onClick}>
        Or disconnect wallet
      </a>
    </div>
  )
}

const LoginForm = ({ onContinue }: { onContinue: () => void }) => {
  const EnterButton = () => {
    return (
      <Button variant="success" type="button" style={{ width: '100%' }} onClick={onContinue}>
        Continue
      </Button>
    )
  }

  const { account } = useWeb3React()
  const [showWalletConnect, setShowWalletConnect] = React.useState(false)
  const [fetchingAccessToken, setFetchingAccessToken] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState('')

  React.useEffect(() => {
    if (accessToken.length === 0) return

    const t = setTimeout(async () => {
      //const api = new Api(accessToken);
      // TODO: implements logic to verify access token
    
      !showWalletConnect && setShowWalletConnect(true)
      setFetchingAccessToken(false)

    }, 1000)

    return () => clearTimeout(t)
  }, [accessToken])

  const onInputAccessToken = (e: any) => {
    const accessToken = e.target.value as string
    setAccessToken(accessToken)
    setFetchingAccessToken(true)
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formAccessToken">
        <Form.Label>Access Token</Form.Label>

        <InputGroup>
          <Form.Control type="password" placeholder="Enter token" onInput={onInputAccessToken} />
        </InputGroup>

        <Form.Text className="text-muted">
          {fetchingAccessToken ? <FaSync className="spinner" /> : 'Contact to owners to get access token'}
        </Form.Text>
      </Form.Group>

      {showWalletConnect && (
        <>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Wallet</Form.Label>
            <br />
            {account ? (
              <>
                <Form.Text className="text-primary">{account}</Form.Text>
                <br />
                <Form.Text className="text-muted">
                  Access: <Form.Text className="text-success">airdrops, sales</Form.Text>
                </Form.Text>
              </>
            ) : (
              <>
                <Form.Text className="text-danger">Not connected</Form.Text>
                <br />
                <Form.Text className="text-muted">Please, connect your wallet</Form.Text>
              </>
            )}
          </Form.Group>
          {!account && (
            <Form.Group>
              <ConnectWalletButton />
            </Form.Group>
          )}
          {account && (
            <Form.Group>
              <EnterButton />
              <DisconnectButton />
            </Form.Group>
          )}
        </>
      )}
    </Form>
  )
}

export default LoginForm
