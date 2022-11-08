import React from 'react'
import Company from '../utils/api/types/Company'
type ProvidedCompanyContextProps = {
  company: Company | undefined
  setCompany: (key: Company | undefined) => void
}
const Context = React.createContext<ProvidedCompanyContextProps>({
  company: undefined,
  setCompany: () => {},
})

export const useProvidedCompany = () => {
  return React.useContext(Context)
}

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
  const [company, setCompany] = React.useState<Company | undefined>(undefined)
  return <Context.Provider value={{ company, setCompany }}>{children}</Context.Provider>
}

export default Context
