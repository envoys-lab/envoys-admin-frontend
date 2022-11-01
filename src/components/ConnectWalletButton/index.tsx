import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import React from "react"
import { Button } from "react-bootstrap"
import {FaSync } from "react-icons/fa"
import { CURRENT_CHAIN_ID } from "../../utils/currentChainId"

const ConnectWalletButton = () => {
    const injectedConnector = new InjectedConnector({ supportedChainIds: [CURRENT_CHAIN_ID], })
    const { activate } = useWeb3React<Web3Provider>()
    const [loading, setLoading] = React.useState(false)
    const onClick = () => {
        setLoading(true);
        activate(injectedConnector).catch((e) => {
            console.log("err");
            setLoading(false)
            console.log(e);
        }).then(() => {
            console.log("success");
            setLoading(false)
        })
    }

    return <Button variant="primary" type="button" style={{width: "100%"}} onClick={onClick}>
        {loading ? <FaSync className="spinner" /> : "Connect Metamask"}
    </Button>
}

export default ConnectWalletButton;