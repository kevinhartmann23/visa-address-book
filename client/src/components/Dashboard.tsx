import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/AppContext'
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const { setAppState, appState } = useGlobalState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getAllContacts = async () => {
    setError(false)
    setLoading(true)

    const config: CONFIG = {
      method: 'GET',
      endpoint: 'api/contacts'
    }

    const [isRequestSuccessful, response] = await axiosRequestHandler(config)

    if (isRequestSuccessful) {
      setAppState({
        ...appState,
        allContacts: response.data
      })
    } else {
      setError(true)
      console.log(response)
    }
  }

  useEffect(() => {
    getAllContacts()
  }, [appState.allContacts])

  return (
    <div style={{padding: '2rem 1rem', height: '80vh',  backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <Box sx={{backgroundColor: '#FFF', height: '100%', width: '45%'}}>
          Contact List ... 
      </ Box>
      <Box sx={{ backgroundColor: '#FFF', height: '100%', width: '45%' }} >
          favorites, recents buttons
      </Box>
    </div>
  );
}

export default Dashboard;