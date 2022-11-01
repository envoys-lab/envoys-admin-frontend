import { ChainId, CURRENT_CHAIN_ID } from './currentChainId'

const addresses: { [key: string]: { [key: number]: string } } = {
  EnvoysAirdropFactory: {},
  EnvoysSaleFactory: {},
}

type AvaliableAddressKeys = 'EnvoysAirdropFactory' | 'EnvoysSaleFactory'

export const getAddress = (key: AvaliableAddressKeys) => {
  if (addresses[key] === undefined) {
    throw new Error(`Invalid address key: ${key}`)
  }
  const currentChainId = CURRENT_CHAIN_ID
  if (addresses[key][currentChainId] === undefined) {
    throw new Error(`Not found address ${key} in chainId: ${currentChainId}`)
  }

  return addresses[key][currentChainId]
}
