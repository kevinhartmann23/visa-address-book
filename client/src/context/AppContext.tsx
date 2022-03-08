import React, { 
  createContext, 
  useContext, 
  useState, 
  Dispatch, 
  SetStateAction 
} from 'react'

export interface GlobalStateInterface {
  allContacts: {}[] | undefined
  recentlyDeleted: {}[] | undefined
}

export interface GlobalContactInterface {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  phoneNumber: string | undefined
  favorite: boolean | undefined
  id: number | undefined
}


const GlobalStateContext = createContext({
  appState: {} as Partial<GlobalStateInterface>,
  setAppState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
  newContactState: {} as Partial<GlobalContactInterface>,
  setNewContactState: {} as Dispatch<SetStateAction<Partial<GlobalContactInterface>>>
})

const GlobalStateProvider = ({
  children,
  appValue = {} as GlobalStateInterface,
  contactValue = {} as GlobalContactInterface
} : {
  children: React.ReactNode,
  appValue?: Partial<GlobalStateInterface>,
  contactValue?: Partial<GlobalContactInterface>
}) => {
  const [appState, setAppState] = useState(appValue)
  const [newContactState, setNewContactState] = useState(contactValue)

  return <GlobalStateContext.Provider value={{ appState, setAppState, newContactState, setNewContactState }}>{children}</GlobalStateContext.Provider> 
}

const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if(!context) {
    throw new Error('useGlobalState funstion must be used within GlobalStateContext')
  }
  return context
}

export { GlobalStateProvider, useGlobalState }