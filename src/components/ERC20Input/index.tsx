import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(Form.Control)``;

const ERC20Input = () => {
    return <StyledInput type="text" placeholder="Paste token address here" />;
}
 
export default ERC20Input;