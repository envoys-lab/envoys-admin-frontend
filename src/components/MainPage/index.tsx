import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import AirdropCard from "./components/AirdropCard";
import SaleCard from "./components/SaleCard";

const StyledMainPage = styled(Row)`
    min-height: 100vh
`;

const CardWrapper = styled('div')`
    padding: 15px 5px
`;

const MainPage = () => {
    return <StyledMainPage>
        <Row>
            <Col md="4" as={"div"} >
                <CardWrapper>
                    <AirdropCard />
                </CardWrapper>
                {/*
                <CardWrapper>
                    <SaleCard />
                </CardWrapper> */}
                
            </Col>
        </Row>
    </StyledMainPage>
}
 
export default MainPage;