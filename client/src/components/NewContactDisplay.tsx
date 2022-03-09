import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Typography, Divider, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import { GlobalContactInterface, useGlobalState } from '../context/AppContext'
import { useNavigate } from 'react-router';

const NewContactDisplay = () => {
  const { setAppState, appState } = useGlobalState()
  const navigate = useNavigate()
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const firstRef: any = useRef()
  const lastRef: any = useRef()
  const emailRef: any = useRef()
  const phoneRef: any = useRef()

  const sendContacts = async () => {
    setError(false)
    setLoading(true)

    const config: CONFIG = {
      method: 'POST',
      endpoint: 'api/contacts',
      data: configData(),
    }

    const [isRequestSuccessful, response] = await axiosRequestHandler(config)

    if (isRequestSuccessful) {
      const data = JSON.parse(response.data)
      resetRefs()
      setAppState({
        ...appState,
        allContacts: data.contacts,
      })
      navigate(favorited ? '/favorites':'/contacts')
    } else {
      setError(true)
      console.log(response)
    }
  }
  
  const resetRefs = () => {
    firstRef.current.value = ''
    lastRef.current.value = ''
    phoneRef.current.value = ''
    emailRef.current.value = ''
  }

  const configData = () => {
 
    const config: GlobalContactInterface = {
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
      favorite: favorited,
      id: Date.now()
    }

    return config
  }


  return (
    <div style={{ height: '87vh', padding: '.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant='overline' component='h2' color='initial' sx={{ width: '100%', fontSize: '40px', fontWeight: '300', textAlign: 'center', height: '5rem' }}>Add New Contact</Typography>
      <Divider sx={{ marginBottom: '1.5rem', width: '80%' }} />
      <Paper elevation={2} sx={{display: 'flex', flexDirection: 'column', width: '50%', height: '75%', alignItems: 'center', justifyContent: 'center'}}>
          <Box 
            component='form'
            sx={{
              '& .MuiTextField-root': { width: '100%', margin: '1rem 0rem' },
              width: '90%',
              height: '80%'
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              required
              id='first-name'
              label='First Name'
              aria-label='Input First Name'
              inputRef={firstRef}
            />
            <TextField
              id='last-name'
              label='Last Name'
              aria-label='Input Last Name'
              inputRef={lastRef}
            />
            <TextField
              required
              id='phone-number'
              label='Phone Number'
              aria-label='Input First Name'
              inputRef={phoneRef}
            />
            <TextField
              id='email-address'
              label='Email Address'
              aria-label='Input Email Address'
              inputRef={emailRef}
            />
          </Box>
          <Box sx={{width: '90%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <IconButton aria-label={!favorited ? 'Add to favorites': 'Contact is favorited'} size='large' onClick={() => setFavorited(!favorited)}>
              {favorited && <FavoriteIcon fontSize='large' color='primary'/>}
              {!favorited && <FavoriteBorderIcon fontSize='large'color='primary'/>}
            </IconButton>
            <Button aria-label='Save Contact' variant='contained' color='primary' size='small' onClick={sendContacts}>
              SAVE
            </Button>
          </Box>
      </Paper>
    </div>
  );
}

export default NewContactDisplay;