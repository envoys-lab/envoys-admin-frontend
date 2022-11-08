import React from 'react'
type AuthContextProps = {
  authKey: string | undefined
  setAuthKey: (key: string | undefined) => void
}
const Context = React.createContext<AuthContextProps>({ authKey: undefined, setAuthKey: () => {} })

export const useAuthKey = () => {
  return React.useContext(Context)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authKey, setAuthKey] = React.useState<string | undefined>(undefined)
  return <Context.Provider value={{ authKey, setAuthKey }}>{children}</Context.Provider>
}

export default Context
