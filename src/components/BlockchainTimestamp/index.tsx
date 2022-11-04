import { BigNumber, BigNumberish } from 'ethers'
import { FaSync } from 'react-icons/fa'
import { PromiseOrValue } from '../../abi/types/common'
import useCurrentBlock from '../../hooks/useCurrentBlock'
import timeFormat from '../../utils/timeFormat'

const BlockchainTimestamp = ({ children }: { children: PromiseOrValue<BigNumberish> }) => {
  const currentBlock = useCurrentBlock()

  if (!currentBlock) {
    return <FaSync className="spinner" />
  }

  const currentTimestamp = currentBlock.timestamp
  const timestamp = parseInt(children.toString())
  const diff = timestamp - currentTimestamp
  return <span>{timeFormat(diff)}</span>
}

export default BlockchainTimestamp
