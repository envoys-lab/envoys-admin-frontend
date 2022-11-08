import { useWeb3React } from "@web3-react/core";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useAuthKey } from "../../contexts/AuthContext";
import HiddenText from "../HiddenText";

const StyledHeader = styled.div`
    background: black;
    color: white;
    padding: 10px;
`;
const Header = () => {
    const { account } = useWeb3React()
    const { authKey, setAuthKey } = useAuthKey()
    const exit = () => {
        setAuthKey(undefined)
    }
    return <StyledHeader>
        Connected at: <HiddenText viewStartCount={6} viewEndCount={4}>{account!}</HiddenText> with auth key <HiddenText viewEndCount={0}>{authKey!}</HiddenText> <Button onClick={exit}>Exit</Button>
    </StyledHeader>;
}
 
export default Header;