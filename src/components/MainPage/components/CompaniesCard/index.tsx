import { Card, CardProps } from 'react-bootstrap'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'
import CompaniesList from './CompaniesList'
import CompanyEditor from './CompanyEditor'

const CompaniesCard = ({ border }: CardProps) => {
  const { company } = useProvidedCompany()

  return (
    <Card border={border}>
      <Card.Header>Companies</Card.Header>
      <Card.Body>{company === undefined ? <CompaniesList /> : <CompanyEditor />}</Card.Body>
    </Card>
  )
}

export default CompaniesCard
