import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import AirdropCard from './components/AirdropCard'
import CompaniesCard from './components/CompaniesCard'
import SaleCard from './components/SaleCard'

const StyledMainPage = styled(Row)`
  min-height: 100vh;
`

const CardWrapper = styled('div')`
  padding: 15px 5px;
`

const MainPage = () => {
  return (
    <StyledMainPage>
      <Row>
        <Col md="4">
          <CardWrapper>
            <AirdropCard border="primary" />
          </CardWrapper>
          <CardWrapper>
            <SaleCard border="success" />
          </CardWrapper>
        </Col>
        <Col md="8">
          <CardWrapper>
            <CompaniesCard border="muted" />
          </CardWrapper>
        </Col>
      </Row>
    </StyledMainPage>
  )
}

export default MainPage
