import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/AppContext'
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import Box from '@mui/material/Box';
import CardFade from './CardFade';
import FavoritesDisplay from './FavoritesDisplay';

const Dashboard = () => {
  const { setAppState, appState } = useGlobalState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getContacts = async () => {
    setError(false)
    setLoading(true)

    const config: CONFIG = {
      method: 'GET',
      endpoint: 'api/contacts'
    }

    const [isRequestSuccessful, response] = await axiosRequestHandler(config)

    if (isRequestSuccessful) {
      const data = JSON.parse(response.data)
      setAppState({
        ...appState,
        allContacts: data,
      })
    } else {
      setError(true)
      console.log(response)
    }
  }

  useEffect(() => {
    if (!appState.allContacts) {
      getContacts()
    }
  }, [appState.allContacts])

  return (
    <div style={{ padding: '2rem 1rem', height: '83.25vh', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4rem'}}>
      <Box sx={{height: '100%', width: '45%'}}>
          <FavoritesDisplay />
      </ Box>
      <Box sx={{ height: '100%', width: '45%', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
          <CardFade title='All Contacts' iconName='contacts' redirectUrl='/contacts'/>
          <CardFade title='Favorites' iconName='favorites' redirectUrl='/favorites' />
          <CardFade title='Add Contact' iconName='new contact' redirectUrl='/add-new-contact' />
      </Box>
    </div>
  );
}

export default Dashboard;