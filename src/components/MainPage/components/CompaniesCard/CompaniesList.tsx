import React from 'react'
import { useAuthKey } from '../../../../contexts/AuthContext'
import Api from '../../../../utils/api/Api'
import Company from '../../../../utils/api/types/Company'
import CompaniesListItem from './CompaniesListItem'

const CompaniesList = () => {
  const [companies, setCompanies] = React.useState<Company[]>([])
  const { authKey } = useAuthKey()

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
    </ul>
  )
}

export default CompaniesList
