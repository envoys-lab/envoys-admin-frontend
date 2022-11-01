import { Form, ListGroup } from 'react-bootstrap'
import { FaSync } from 'react-icons/fa'
import useTokenInfo from '../../../../hooks/useTokenInfo'
import { BaseExplorerUrlCurrent } from '../../../../utils/currentChainId'

const AirdropCardDetails = ({ address }: { address: string }) => {
  const { name, symbol, decimals, error, ready } = useTokenInfo(address)

  if (!ready && !error) {
    return <FaSync className="spinner" />
  }

  if (error) {
    return <Form.Text className="text-danger">{error}</Form.Text>
  }

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>Name: {name}</ListGroup.Item>
      <ListGroup.Item>Symbol: {symbol}</ListGroup.Item>
      <ListGroup.Item>Decimals: {decimals}</ListGroup.Item>
      <ListGroup.Item>
        <a href={`${BaseExplorerUrlCurrent}/token/${address}`} target="_blank">
          Token
        </a>
        <br></br>
        <a href={`${BaseExplorerUrlCurrent}/token/${address}`} target="_blank">
          Airdrop
        </a>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default AirdropCardDetails
