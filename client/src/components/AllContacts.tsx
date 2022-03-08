import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/AppContext'
import axiosRequestHandler,{ CONFIG } from '../utils/apiHandler';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import ContactCard from './ContactCard';
import Divider from '@mui/material/Divider';

const AllContacts = () => {
  const { setAppState, appState } = useGlobalState()
  const [contacts, setContacts] = useState<any>([])
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
      setAppState({
        ...appState,
        allContacts: JSON.parse(response.data),
      })
    } else {
      setError(true)
      console.log(response)
    }
  }

  useEffect(() => {
    if (!appState.allContacts) {
      getContacts()
    } else {
      setContacts(appState.allContacts)
    }
  }, [appState.allContacts])
  
  return (
    <div style={{ height: '90vh', padding: '.5rem 3rem' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="overline" component='h2' color="initial" sx={{ width: '100%', fontSize: '40px', fontWeight: '300', textAlign: 'center', height: '5rem' }}>All Contacts</Typography>
        <Divider sx={{ marginBottom: '1rem' }} />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {contacts!.length > 0 && contacts!.map((obj: any, index: number) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ContactCard firstName={obj.firstName} lastName={obj.lastName} email={obj.email} phoneNumber={obj.phoneNumber} favorite={obj.favorite} id={obj.id} />
            </Grid>
          ))}
          {contacts!.length === 0 && <Typography variant="body1" color="initial">No contacts</Typography>}
        </Grid>
      </Box>
    </div>
  );
}

export default AllContacts;