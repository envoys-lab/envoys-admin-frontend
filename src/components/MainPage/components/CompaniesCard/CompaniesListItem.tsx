import styled from 'styled-components'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'
import Company from '../../../../utils/api/types/Company'

const StyledCompaniesListItem = styled('span')`
  cursor: pointer;
  font-weight: bold;
`

const CompaniesListItem = ({ company }: { company: Company }) => {
  const { setCompany } = useProvidedCompany()

  return (
    <StyledCompaniesListItem onClick={() => setCompany(company)}>
      {company.name} ({company._id})
    </StyledCompaniesListItem>
  )
}

export default CompaniesListItem
