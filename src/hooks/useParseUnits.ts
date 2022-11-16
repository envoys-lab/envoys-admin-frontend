import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { getErc20Contract } from '../utils/contractHelpers';

const parseUnits = async (address: string, units: string, decimals: ethers.BigNumber | number) => {
    return ethers.utils.parseUnits(units, decimals);
}

export const useParseUnits = (address: string) => {
    const {library} = useWeb3React();
    const erc20 = getErc20Contract(address, library);
    const decimals = erc20.decimals();
    
    return (async (units: string) => parseUnits(address, units, await decimals));
}

export default useParseUnits;