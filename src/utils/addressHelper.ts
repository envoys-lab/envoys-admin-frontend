import { ChainId, CURRENT_CHAIN_ID } from './currentChainId'

const addresses: { [key: string]: { [key: number]: string } } = {
  EnvoysAirdropFactory: {
    [ChainId.Testnet]: '0x68bEb8f54B53A4a4f1FD0AfadFcFe21EC0e6648C',
  },
  EnvoysSaleFactory: {
    [ChainId.Testnet]: '0xCE13afeF478dB995b9B80076268F0beF9A846814',
  },
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
