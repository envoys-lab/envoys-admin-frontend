import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuthKey } from '../../../../contexts/AuthContext'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'
import Api from '../../../../utils/api/Api'
import Company from '../../../../utils/api/types/Company'
import CompaniesListItem from './CompaniesListItem'

const CompaniesList = () => {
  const [companies, setCompanies] = React.useState<Company[]>([])
  const { authKey } = useAuthKey()
  const { setCompany } = useProvidedCompany()


  React.useEffect(() => {
    if (!authKey) return alert('Invalid auth key')
    const api = new Api(authKey)
    api
      .companies({
        page: 0,
        size: 1000,
      })
      .then((companies) => {
        setCompanies(companies.items)
      })
  }, [])
  return (
    <ul>
      {companies.map((company) => {
        return (
          <li key={company._id}>
            <CompaniesListItem company={company} />
          </li>
        )
      })}

      <br />
      <Button onClick={() => setCompany(null)}>New company</Button>
    </ul>
  )
}

export default CompaniesList
