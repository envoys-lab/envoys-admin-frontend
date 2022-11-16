import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { FaSync } from 'react-icons/fa'
import { EnvoysAirdropFactory, EnvoysSaleFactory } from '../../../../abi/types'
import { SaleInfoStruct } from '../../../../abi/types/EnvoysSale'
import useTokenInfo from '../../../../hooks/useTokenInfo'
import { getEnvoysAirdropContract, getEnvoysAirdropFactoryContract, getEnvoysSaleContract, getEnvoysSaleFactoryContract } from '../../../../utils/contractHelpers'
import { BaseExplorerUrlCurrent } from '../../../../utils/currentChainId'
import { getProviderOrSigner } from '../../../../utils/getProviderOrSigner'
import BlockchainTimestamp from '../../../BlockchainTimestamp'

type SaleInfoStructEx = SaleInfoStruct & {
  address: string
  owner: string
}
const SaleCardDetails = ({ address = "0x0" }: { address: string }) => {
  const { name, symbol, decimals, error, ready } = useTokenInfo(address)
  const [saleInfo, setSaleInfo] = React.useState<SaleInfoStructEx | undefined | null>(undefined)
  const { library, account } = useWeb3React()

  const updateSaleInfo = async (saleFactory: EnvoysSaleFactory) => {
    setSaleInfo(null)
    const saleAddress = await saleFactory.sales(address)
    if (parseInt(saleAddress, 16) === 0) {
      setSaleInfo(undefined)
      return
    }

    const sale = getEnvoysSaleContract(saleAddress, getProviderOrSigner(library, account))
    const saleInfo = await sale.saleInfo()
    const owner = await sale.owner()

    setSaleInfo({
      token: saleInfo.token,
      end: saleInfo.end,
      start: saleInfo.start,
      address: saleAddress,
      owner: owner,
      hard: saleInfo.hard,
      soft: saleInfo.soft,
      buyToken: saleInfo.buyToken,
      price: saleInfo.price
    })
  }

  React.useEffect(() => {
    const saleFactory = getEnvoysSaleFactoryContract(getProviderOrSigner(library, account))
    updateSaleInfo(saleFactory)
  }, [address, ready, error, account])

  if (!ready && !error) {
    return <FaSync className="spinner" />
  }

  if (error) {
    return <Form.Text className="text-danger">{error}</Form.Text>
  }

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>Address: {address}</ListGroup.Item>
      <ListGroup.Item>Name: {name}</ListGroup.Item>
      <ListGroup.Item>Symbol: {symbol}</ListGroup.Item>
      <ListGroup.Item>Decimals: {decimals}</ListGroup.Item>
      {saleInfo && (
        <>
          <ListGroup.Item>
            Owner:{' '}
            <a rel="noopener" href={`${BaseExplorerUrlCurrent}/address/${saleInfo.owner}`} target="_blank">
              {saleInfo.owner}
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            Start: <BlockchainTimestamp>{saleInfo.start}</BlockchainTimestamp>
          </ListGroup.Item>
          <ListGroup.Item>
            End: <BlockchainTimestamp>{saleInfo.end}</BlockchainTimestamp>
          </ListGroup.Item>
          <ListGroup.Item>
            Buy token:{' '}
            <a rel="noopener" href={`${BaseExplorerUrlCurrent}/address/${saleInfo.owner}`} target="_blank">
              {saleInfo.buyToken.toString()}
            </a>
          </ListGroup.Item>
          
          {ready && (
            <ListGroup.Item>
              Price: {ethers.utils.formatUnits(saleInfo.price.toString(), decimals)} {symbol}
            </ListGroup.Item>
          )}
        </>
      )}

      <ListGroup.Item>
        <a rel="noopener" href={`${BaseExplorerUrlCurrent}/token/${address}`} target="_blank">
          Token
        </a>
        {
          saleInfo === null && (
            <FaSync className="spinner" />
          )
        }
        {saleInfo && (
          <>
            <br></br>
            <a rel="noopener" href={`${BaseExplorerUrlCurrent}/token/${saleInfo.address}`} target="_blank">
              Sale
            </a>
          </>
        )}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default SaleCardDetails;
