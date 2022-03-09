import React, { 
  createContext, 
  useContext, 
  useState, 
  Dispatch, 
  SetStateAction 
} from 'react'

export interface GlobalStateInterface {
  allContacts: GlobalContactInterface[] | undefined
}

export interface GlobalContactInterface {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  phoneNumber: string | undefined
  favorite: boolean | undefined
  id: string | undefined
}


const GlobalStateContext = createContext({
  appState: {} as Partial<GlobalStateInterface>,
  setAppState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
})

const GlobalStateProvider = ({
  children,
  appValue = {} as GlobalStateInterface,
} : {
  children: React.ReactNode,
  appValue?: Partial<GlobalStateInterface>,
}) => {
  const [appState, setAppState] = useState(appValue)

  return <GlobalStateContext.Provider value={{ appState, setAppState }}>{children}</GlobalStateContext.Provider> 
}

const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if(!context) {
    throw new Error('useGlobalState funstion must be used within GlobalStateContext')
  }
  return context
}

export { GlobalStateProvider, useGlobalState }