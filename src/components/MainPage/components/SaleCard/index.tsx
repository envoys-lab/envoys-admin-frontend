import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { usePopup } from '../../../../contexts/PopupContext'
import useFeaturedToken from '../../../../hooks/useFeaturedToken'
import CardProps from '../CardProps'
import SaleCardDetails from './SaleCardDetails'
import StartNewSale from './StartNewSale'

const SaleCard = ({ border }: CardProps) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined)
  const featuredToken = useFeaturedToken()
  const {setPopup} = usePopup();

  const onChangeAddress = (newAddress: string) => {
    setAddress(newAddress)
  }
  
  const startNewSale = () => {
    if(!address) return;
    setPopup(<StartNewSale address={address} />);
  }

  return (
    <Card border={border}>
      <Card.Header>Sale</Card.Header>
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

            {featuredToken && featuredToken !== address && (
              <a href="#" onClick={() => onChangeAddress(featuredToken)}>
                Use company token
              </a>
            )}

            {address && <SaleCardDetails address={address} />}
          </Form.Group>
          <Form.Group>
            {address && address.length > 0 && <Button variant="primary" onClick={startNewSale}>Start new Sale</Button>}
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SaleCard
