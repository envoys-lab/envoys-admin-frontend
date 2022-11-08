import { useProvidedCompany } from '../contexts/ProvidedCompanyContext'

const useFeaturedToken = () => {
  const { company } = useProvidedCompany()
  return company ? company.token : undefined
}

export default useFeaturedToken
