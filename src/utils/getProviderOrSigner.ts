import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

export function getProviderOrSigner(library: Web3Provider, account?: string | null): Web3Provider | JsonRpcSigner {
  return typeof account === 'string' ? getSigner(library, account) : library
}

function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}
