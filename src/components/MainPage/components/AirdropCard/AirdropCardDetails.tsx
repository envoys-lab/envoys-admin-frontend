import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { FaSync } from 'react-icons/fa'
import { EnvoysAirdropFactory } from '../../../../abi/types'
import { AirdropInfoStruct } from '../../../../abi/types/EnvoysAirdrop'
import useCurrentBlock from '../../../../hooks/useCurrentBlock'
import useTokenInfo from '../../../../hooks/useTokenInfo'
import { getEnvoysAirdropContract, getEnvoysAirdropFactoryContract } from '../../../../utils/contractHelpers'
import { BaseExplorerUrlCurrent } from '../../../../utils/currentChainId'
import { getProviderOrSigner } from '../../../../utils/getProviderOrSigner'
import BlockchainTimestamp from '../../../BlockchainTimestamp'

type AirdropInfoStructEx = AirdropInfoStruct & {
  address: string
  owner: string
}
const AirdropCardDetails = ({ address }: { address: string }) => {
  const { name, symbol, decimals, error, ready } = useTokenInfo(address)
  const [airdropInfo, setAirdropInfo] = React.useState<AirdropInfoStructEx | undefined>(undefined)
  const { library, account } = useWeb3React()
  const tokenInfo = useTokenInfo(address)

  const updateAirdropInfo = async (airdropFactory: EnvoysAirdropFactory) => {
    const airdropAddress = await airdropFactory.airdrops(address)
    if (parseInt(airdropAddress, 16) === 0) {
      setAirdropInfo(undefined)
      return
    }

    const airdrop = getEnvoysAirdropContract(airdropAddress, getProviderOrSigner(library, account))
    const airdropInfo = await airdrop.airdropInfo()
    const owner = await airdrop.owner()

    setAirdropInfo({
      token: airdropInfo.token,
      amount: airdropInfo.amount,
      end: airdropInfo.end,
      start: airdropInfo.start,
      address: airdropAddress,
      owner: owner,
    })
  }

  React.useEffect(() => {
    const airdropFactory = getEnvoysAirdropFactoryContract(getProviderOrSigner(library, account))
    updateAirdropInfo(airdropFactory)
  }, [address])

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
      {airdropInfo && (
        <>
          <ListGroup.Item>
            Owner:{' '}
            <a href={`${BaseExplorerUrlCurrent}/address/${airdropInfo.owner}`} target="_blank">
              {airdropInfo.owner}
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            Start: <BlockchainTimestamp>{airdropInfo.start}</BlockchainTimestamp>
          </ListGroup.Item>
          <ListGroup.Item>
            End: <BlockchainTimestamp>{airdropInfo.end}</BlockchainTimestamp>
          </ListGroup.Item>
          {tokenInfo && tokenInfo.ready && (
            <ListGroup.Item>
              Amount: {ethers.utils.formatUnits(airdropInfo.amount.toString(), tokenInfo.decimals)} {tokenInfo.symbol}
            </ListGroup.Item>
          )}
        </>
      )}

      <ListGroup.Item>
        <a href={`${BaseExplorerUrlCurrent}/token/${address}`} target="_blank">
          Token
        </a>
        {airdropInfo && (
          <>
            <br></br>
            <a href={`${BaseExplorerUrlCurrent}/token/${airdropInfo.address}`} target="_blank">
              Airdrop
            </a>
          </>
        )}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default AirdropCardDetails
