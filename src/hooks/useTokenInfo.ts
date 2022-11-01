import { useWeb3React } from "@web3-react/core";
import React from "react";
import { getErc20Contract } from "../utils/contractHelpers";
import { getProviderOrSigner } from "../utils/getProviderOrSigner";

const useTokenInfo = (address: string) => {
    const [name, setName] = React.useState<string>("");
    const [symbol, setSymbol] = React.useState<string>("");
    const [decimals, setDecimlas] = React.useState<number>(0);
    const [ready, setReady] = React.useState<boolean>(false);
    const {library} = useWeb3React();
    
    React.useEffect(() => {
        if(!library) return;

        const token = getErc20Contract(address, library);
        
        // token.symbol().then(s => console.log("symbol", s));
        // token.name().then(name => console.log("name", name));
        // token.decimals().then(d => console.log("dec", d));

        token.name().then(setName);
        token.symbol().then(setSymbol);
        token.decimals().then(setDecimlas);
    }, [library]);

    React.useEffect(() => {
        if(name.length > 0 && symbol.length > 0 && decimals > 0 && !ready) {
            setReady(true);
        } else if(ready) {
            setReady(false);
        }
    }, [name, symbol, decimals])

    return {
        name,
        symbol,
        decimals,
        ready
    }
}

export default useTokenInfo;