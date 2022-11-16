import React from 'react'
type AuthContextProps = {
  authKey: string | undefined
  setAuthKey: (key: string | undefined) => void
}
const Context = React.createContext<AuthContextProps>({ authKey: undefined, setAuthKey: () => {} })

export const useAuthKey = () => {
  const {authKey, setAuthKey} = React.useContext(Context);

  React.useEffect(() => {
    if(!localStorage) return;
    const authKey = localStorage.getItem('__auth-key') as string | undefined | null;
    if(authKey === null || authKey === undefined) return console.log('auth key not found');
    setAuthKey(authKey);
  }, []);

  const setAuthKeyWithSaving = (key: string | undefined) => {
    if(localStorage) {
      if(key) {
        localStorage && localStorage.setItem('__auth-key', key)
        console.log('set auth key:', '*'.repeat(key.length));
      } else {
        localStorage.removeItem('__auth_key')
        console.log('remove auth key from localstorage');
      }
    }
    setAuthKey(key);
  }

  return {authKey, setAuthKey: setAuthKeyWithSaving}
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authKey, setAuthKey] = React.useState<string | undefined>(undefined)
  return <Context.Provider value={{ authKey, setAuthKey }}>{children}</Context.Provider>
}

export default Context
