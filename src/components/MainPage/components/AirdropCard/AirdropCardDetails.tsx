import { useWeb3React } from "@web3-react/core";
import { ListGroup } from "react-bootstrap";
import { FaSync } from "react-icons/fa";
import useTokenInfo from "../../../../hooks/useTokenInfo";
import { getErc20Contract } from "../../../../utils/contractHelpers";
import { getProviderOrSigner } from "../../../../utils/getProviderOrSigner";

const AirdropCardDetails = ({address}: {address: string}) => {
    const {name, symbol, decimals, ready} =  useTokenInfo(address);
    if(!ready) {
        return <FaSync className="spinner" />
    }

    return <ListGroup variant="flush">
        <ListGroup.Item>Name: {name}</ListGroup.Item>
        <ListGroup.Item>Symbol: {symbol}</ListGroup.Item>
        <ListGroup.Item>Decimals: {decimals}</ListGroup.Item>
        <ListGroup.Item>
            <a href={`https://testnet.bscscan.com/token/${address}`} target="_blank">Token</a>
            <br></br><a href={`https://testnet.bscscan.com/token/${address}`} target="_blank">Airdrop</a>
        </ListGroup.Item>
    </ListGroup>
}
 
export default AirdropCardDetails;