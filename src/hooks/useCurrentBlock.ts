import { Block } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'
import { getProivider, getProviderOrSigner } from '../utils/getProviderOrSigner'

const useCurrentBlock = () => {
  const { library } = useWeb3React()
  const provider = getProivider(library)
  const [blockData, setBlockData] = useState<Block | undefined>()

  const update = () => {
    const block = provider.getBlock('latest')

    block.then((b) => {
      setBlockData(b)
    })
  }

  React.useEffect(() => {
    update()

    const i = setInterval(() => update(), 2000)
    return () => clearInterval(i)
  }, [library])

  return blockData
}

export default useCurrentBlock
