import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { Button, Card, Form, FormText, InputGroup } from 'react-bootstrap'
import useFeaturedToken from '../../../../hooks/useFeaturedToken'
import { getErc20Contract } from '../../../../utils/contractHelpers'
import { getProviderOrSigner } from '../../../../utils/getProviderOrSigner'
import ERC20Input from '../../../ERC20Input'
import CardProps from '../CardProps'
import AirdropCardDetails from './AirdropCardDetails'

const AirdropCard = ({ border }: CardProps) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined)
  const featuredToken = useFeaturedToken()

  const onChangeAddress = (newAddress: string) => {
    setAddress(newAddress)
  }
  return (
    <Card border={border}>
      <Card.Header>Airdrop</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>ERC20 Token Address</Form.Label>

            <Form.Control
              type="text"
              placeholder="Paste token address here"
              value={address}
              onChange={(e) => onChangeAddress(e.target.value)}
            />

            {featuredToken && featuredToken != address && (
              <a href="#" onClick={() => onChangeAddress(featuredToken)}>
                Use company token
              </a>
            )}

            {address && <AirdropCardDetails address={address} />}
          </Form.Group>
        </Form>
        {/* <Button variant="primary">Confirm</Button> */}
      </Card.Body>
    </Card>
  )
}

export default AirdropCard
