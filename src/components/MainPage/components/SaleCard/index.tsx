import { Button, Card, CardProps } from 'react-bootstrap'

const SaleCard = ({ border }: CardProps) => {
  return (
    <Card border={border}>
      <Card.Header>Sale</Card.Header>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Confirm</Button>
      </Card.Body>
    </Card>
  )
}

export default SaleCard
