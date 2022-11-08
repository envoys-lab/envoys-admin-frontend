import { useWeb3React } from "@web3-react/core";
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
    const { authKey } = useAuthKey()
    
    return <StyledHeader>
        Connected at: <HiddenText viewStartCount={6} viewEndCount={4}>{account!}</HiddenText> with auth key <HiddenText viewEndCount={0}>{authKey!}</HiddenText>
    </StyledHeader>;
}
 
export default Header;