import { useWeb3React } from "@web3-react/core";
import { Form, ListGroup } from "react-bootstrap";
import { FaSync } from "react-icons/fa";
import useTokenInfo from "../../../../hooks/useTokenInfo";
import { getErc20Contract } from "../../../../utils/contractHelpers";
import { BaseExplorerUrl, CURRENT_CHAIN_ID } from "../../../../utils/currentChainId";
import { getProviderOrSigner } from "../../../../utils/getProviderOrSigner";

const AirdropCardDetails = ({address}: {address: string}) => {
    const {name, symbol, decimals, error, ready} =  useTokenInfo(address);

    if(!ready && !error) {
        return <FaSync className="spinner" />
    }

    if(error) {
        return <Form.Text className="text-danger">{error}</Form.Text>
    }

    return <ListGroup variant="flush">
        <ListGroup.Item>Name: {name}</ListGroup.Item>
        <ListGroup.Item>Symbol: {symbol}</ListGroup.Item>
        <ListGroup.Item>Decimals: {decimals}</ListGroup.Item>
        <ListGroup.Item>
            <a href={`${BaseExplorerUrl[CURRENT_CHAIN_ID]}/token/${address}`} target="_blank">Token</a>
            <br></br><a href={`${BaseExplorerUrl[CURRENT_CHAIN_ID]}/token/${address}`} target="_blank">Airdrop</a>
        </ListGroup.Item>
    </ListGroup>
}
 
export default AirdropCardDetails;