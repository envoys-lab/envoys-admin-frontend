import { useWeb3React } from "@web3-react/core";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import ConnectWalletButton from "../ConnectWalletButton";

const LoginForm = () => {
    const {account} = useWeb3React();
    const [showWalletConnect, setShowWalletConnect] = React.useState(false);
    const [fetchingAccessToken, setFetchingAccessToken] = React.useState(false);
    const [accessToken, setAccessToken] = React.useState("");


    React.useEffect(() => {
        if(accessToken.length === 0) return;

        
        const t = setTimeout(() => {

            !showWalletConnect && setShowWalletConnect(true);
            setFetchingAccessToken(false);

        }, 1000);
        return () => clearTimeout(t);
    }, [accessToken]);

    const onInputAccessToken = (e: any) => {
        const accessToken = e.target.value as string;
        setAccessToken(accessToken);
        setFetchingAccessToken(true);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formAccessToken">
                <Form.Label>Access Token</Form.Label>

                <InputGroup>
                    <Form.Control type="password" placeholder="Enter token" onInput={onInputAccessToken} />
                    {fetchingAccessToken && <InputGroup.Text>...</InputGroup.Text>}
                </InputGroup>

                <Form.Text className="text-muted">
                    Contact to owners to get access token
                </Form.Text>
            </Form.Group>

            {showWalletConnect &&
                <>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Wallet</Form.Label><br />
                        {account ? 
                            <Form.Text className="text-primary">
                                {account}
                            </Form.Text>
                            : 
                            <Form.Text className="text-danger">
                                Not connected
                            </Form.Text>
                        }
                    </Form.Group>
                    {!account ? <ConnectWalletButton /> : <></>}
                </>
            }
            
        </Form>
    );
}
 
export default LoginForm;