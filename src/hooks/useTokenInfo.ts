import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { getErc20Contract } from '../utils/contractHelpers'

const useTokenInfo = (address: string) => {
  const [name, setName] = React.useState<string>('')
  const [symbol, setSymbol] = React.useState<string>('')
  const [decimals, setDecimlas] = React.useState<number>(0)
  const [ready, setReady] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const { library } = useWeb3React()
  const onError = (e: any) => {
    setError(e.toString())
  }
  React.useEffect(() => {
    setError(undefined)
  }, [address])

  React.useEffect(() => {
    if (!library) return

    const token = getErc20Contract(address, library)
    token.name().then(setName).catch(onError)
    token.symbol().then(setSymbol).catch(onError)
    token.decimals().then(setDecimlas).catch(onError)
  }, [library])

  React.useEffect(() => {
    if (name.length > 0 && symbol.length > 0 && decimals > 0 && !ready) {
      setReady(true)
    } else if (ready) {
      setReady(false)
    }
  }, [name, symbol, decimals])

  return {
    name,
    symbol,
    decimals,
    ready,
    error,
  }
}

export default useTokenInfo
