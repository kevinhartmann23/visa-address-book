import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/AppContext'
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import Box from '@mui/material/Box';
import CardFade from './CardFade';
import FavoritesDisplay from './FavoritesDisplay';

const Dashboard = () => {
  const { setAppState, appState } = useGlobalState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getFavorites = async () => {
    setError(false)
    setLoading(true)

    const configFav: CONFIG = {
      method: 'GET',
      endpoint: 'api/favorites'
    }

    const [isFavRequestSuccessful, favResponse] = await axiosRequestHandler(configFav)

    if (isFavRequestSuccessful) {
      setAppState({
        ...appState,
        favoriteContacts: JSON.parse(favResponse.data),
      })
    } else {
      setError(true)
      console.log(favResponse)
    }
  }

  useEffect(() => {
    if (!appState.favoriteContacts) {
      getFavorites()
    }
  }, [appState.favoriteContacts])

  return (
    <div style={{padding: '2rem 1rem', height: '83.25vh', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <Box sx={{height: '100%', width: '45%'}}>
          <FavoritesDisplay />
      </ Box>
      <Box sx={{ height: '100%', width: '45%', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
          <CardFade title='All Contacts' iconName='contacts' redirectUrl='/contacts'/>
          <CardFade title='Newly Added' iconName='added' redirectUrl='/recently-added' />
          <CardFade title='Deleted' iconName='deleted' redirectUrl='/recently-deleted' />
      </Box>
    </div>
  );
}

export default Dashboard;