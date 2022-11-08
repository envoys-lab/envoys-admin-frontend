import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from '@ethersproject/providers'

export function getProivider(library?: Web3Provider): Web3Provider | JsonRpcProvider {
  if (!library) {
    return new JsonRpcProvider(process.env.REACT_APP_RPC_URL as string)
  }
  return library
}

export function getProviderOrSigner(
  library?: Web3Provider,
  account?: string | null,
): Web3Provider | JsonRpcProvider | JsonRpcSigner {
  const providerDefault = getProivider(library)

  return typeof account === 'string' && library !== undefined ? getSigner(library, account) : providerDefault
}

function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}
