import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import React from "react"
import { Button } from "react-bootstrap"

const ConnectWalletButton = () => {
    const injectedConnector = new InjectedConnector({ supportedChainIds: [56], })
    const { activate } = useWeb3React<Web3Provider>()
    const onClick = () => {
        activate(injectedConnector)
    }

    return (
        <Button variant="primary" type="button" style={{width: "100%"}} onClick={onClick}>
            Connect Metamask 
        </Button>
    )
}

export default ConnectWalletButton;