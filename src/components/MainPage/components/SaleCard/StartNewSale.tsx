import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import useParseUnits from "../../../../hooks/useParseUnits";
import startEndDelayHelper from "../../../../utils/startEndDelayHelper";

type StartNewSaleProps = {
    address: string
}

const StartNewSale = ({address}: StartNewSaleProps) => {
    const [buyToken, setBuyToken] = useState("");
    const [soft, setSoft] = useState("");
    const [hard, setHard] = useState("");
    const [price, setPrice] = useState("");
    const [delay, setDelay] = useState("");
    const [owner, setOwner] = useState("");
    const {library} = useWeb3React();
    const parseUnits = useParseUnits(address);

    const confirm = async () => {
        const timestamp = await startEndDelayHelper({delay: "2", provider: library})
        const saleInfo = {
            token: address,
            buyToken,
            soft: await parseUnits(soft),
            hard: await parseUnits(hard),
            price: await parseUnits(price),
        }
    }

    return <>
        <Form.Group>
            <Form.Label>Delay</Form.Label>
            <Form.Control type="text" placeholder="Example: 1h or 3d" onInput={(e:any) => setDelay(e.target.value)}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Buy token</Form.Label>
            <Form.Control type="text" placeholder="Address" onInput={(e:any) => setBuyToken(e.target.value)} />
        </Form.Group>

        <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="0.0" onInput={(e:any) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group>
            <Form.Label>Soft</Form.Label>
            <Form.Control type="number" placeholder="0.0" onInput={(e:any) => setSoft(e.target.value)} />
        </Form.Group>

        <Form.Group>
            <Form.Label>Hard</Form.Label>
            <Form.Control type="number" placeholder="0.0" onInput={(e:any) => setHard(e.target.value)} />
        </Form.Group>

        <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control type="text" placeholder="Address" onInput={(e:any) => setOwner(e.target.value)} />
        </Form.Group>

        <br />
        <ButtonGroup>
            <Button variant="success" onClick={confirm}>Continue</Button>
        </ButtonGroup>
    </>;
}
 
export default StartNewSale;