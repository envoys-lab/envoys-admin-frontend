import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { Button, Card, Form, FormText, InputGroup } from 'react-bootstrap'
import { getErc20Contract } from '../../../../utils/contractHelpers'
import { getProviderOrSigner } from '../../../../utils/getProviderOrSigner'
import ERC20Input from '../../../ERC20Input'
import AirdropCardDetails from './AirdropCardDetails'

const AirdropCard = () => {
  const [address, setAddress] = React.useState<string | undefined>(undefined)
  const onChangeAddress = (newAddress: string) => {
    setAddress(newAddress)
  }
  return (
    <Card border="success">
      <Card.Header>Airdrop</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>ERC20 Token Address</Form.Label>

            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Paste token address here"
                onChange={(e) => onChangeAddress(e.target.value)}
              />
            </InputGroup>
            {address && <AirdropCardDetails address={address} />}
          </Form.Group>
        </Form>
        {/* <Button variant="primary">Confirm</Button> */}
      </Card.Body>
    </Card>
  )
}

export default AirdropCard
