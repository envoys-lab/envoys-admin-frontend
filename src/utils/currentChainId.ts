export enum ChainId {
    Mainnet = 56,
    Testnet = 97
}

export const BaseExplorerUrl = {
    [ChainId.Mainnet]: "https://bscscan.com",
    [ChainId.Testnet]: "https://testnet.bscscan.com",
}

const envChainId = parseInt(process.env.CHAIN_ID as string, 10);

export const CURRENT_CHAIN_ID: ChainId = isNaN(envChainId) ? ChainId.Testnet : ChainId.Testnet;

export const BaseExplorerUrlCurrent = BaseExplorerUrl[CURRENT_CHAIN_ID];
