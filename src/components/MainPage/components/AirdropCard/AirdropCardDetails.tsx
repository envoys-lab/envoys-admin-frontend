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
const AirdropCardDetails = ({ address = "0x0" }: { address: string }) => {
  const { name, symbol, decimals, error, ready } = useTokenInfo(address)
  const [airdropInfo, setAirdropInfo] = React.useState<AirdropInfoStructEx | undefined | null>(undefined)
  const { library, account } = useWeb3React()

  const updateAirdropInfo = async (airdropFactory: EnvoysAirdropFactory) => {
    setAirdropInfo(null)
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
  }, [address, ready, error])

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
          {ready && ready && (
            <ListGroup.Item>
              Amount: {ethers.utils.formatUnits(airdropInfo.amount.toString(), decimals)} {symbol}
            </ListGroup.Item>
          )}
        </>
      )}

      <ListGroup.Item>
        <a href={`${BaseExplorerUrlCurrent}/token/${address}`} target="_blank">
          Token
        </a>
        {
          airdropInfo === null && (
            <FaSync className='spinner' />
          )
        }
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
