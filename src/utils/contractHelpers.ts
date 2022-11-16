import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'

import EnvoysAirdropFactoryAbi from '../abi/EnvoysAirdropFactory.json'
import EnvoysSaleFactoryAbi from '../abi/EnvoysSaleFactory.json'
import EnvoysSaleAbi from '../abi/EnvoysSale.json'
import EnvoysAirdropAbi from '../abi/EnvoysAirdrop.json'
import ERC20Abi from '../abi/ERC20.json'

import { EnvoysAirdrop, EnvoysAirdropFactory, EnvoysSale, EnvoysSaleFactory, ERC20 } from '../abi/types'
import { getAddress } from './addressHelper'

const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer
  return new Contract(address, abi, signerOrProvider)
}

export const getEnvoysAirdropFactoryContract = (signer?: Signer | Provider) => {
  return getContract(EnvoysAirdropFactoryAbi, getAddress('EnvoysAirdropFactory'), signer) as EnvoysAirdropFactory
}

export const getEnvoysSaleFactoryContract = (signer?: Signer | Provider) => {
  return getContract(EnvoysSaleFactoryAbi, getAddress('EnvoysSaleFactory'), signer) as EnvoysSaleFactory
}

export const getErc20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(ERC20Abi, address, signer) as ERC20
}

export const getEnvoysAirdropContract = (address: string, signer?: Signer | Provider) => {
  return getContract(EnvoysAirdropAbi, address, signer) as EnvoysAirdrop
}

export const getEnvoysSaleContract = (address: string, signer?: Signer | Provider) => {
  return getContract(EnvoysSaleAbi, address, signer) as EnvoysSale
}
