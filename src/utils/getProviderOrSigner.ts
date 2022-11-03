import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from '@ethersproject/providers'

export function getProviderOrSigner(
  library?: Web3Provider,
  account?: string | null,
): Web3Provider | JsonRpcProvider | JsonRpcSigner {
  if (!library) {
    return new JsonRpcProvider(process.env.RPC_URL as string)
  }
  return typeof account === 'string' ? getSigner(library, account) : library
}

function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}
