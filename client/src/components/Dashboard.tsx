import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/AppContext'
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material';
import CardFade from './CardFade';

const Dashboard = () => {
  const { setAppState, appState } = useGlobalState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getAllContacts = async () => {
    setError(false)
    setLoading(true)

    const configAll: CONFIG = {
      method: 'GET',
      endpoint: 'api/contacts'
    }

    const configFav: CONFIG = {
      method: 'GET',
      endpoint: 'api/favorites'
    }

    const [isAllRequestSuccessful, allResponse] = await axiosRequestHandler(configAll)
    const [isFavRequestSuccessful, favResponse] = await axiosRequestHandler(configFav)

    if (isAllRequestSuccessful && isFavRequestSuccessful) {
      setAppState({
        ...appState,
        favoriteContacts: favResponse.data,
        allContacts: allResponse.data
      })
    } else {
      setError(true)
      console.log(allResponse, favResponse)
    }
  }

  useEffect(() => {
    getAllContacts()
  }, [appState.allContacts])

  return (
    <div style={{padding: '2rem 1rem', height: '83.25vh', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <Box sx={{backgroundColor: '#FFF', height: '100%', width: '45%'}}>
          {/* Contact List ...  */}
      </ Box>
      <Box sx={{ height: '100%', width: '45%', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
          <CardFade title='All Contacts' iconName='contacts' redirectUrl='/contacts'/>
          <CardFade title='Newly Added' iconName='added' redirectUrl='/contacts' />
          <CardFade title='Deleted' iconName='deleted' redirectUrl='/recently-deleted' />
      </Box>
    </div>
  );
}

export default Dashboard;