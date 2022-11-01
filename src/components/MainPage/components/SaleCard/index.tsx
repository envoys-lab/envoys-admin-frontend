import { Button, Card } from "react-bootstrap";

const SaleCard = () => {
    return <Card border="primary">
        <Card.Header>Sale</Card.Header>
        <Card.Body>
            <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Confirm</Button>
        </Card.Body>
    </Card>;
}
 
export default SaleCard;