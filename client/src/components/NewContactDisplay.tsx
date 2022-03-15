import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Typography, Divider, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import axiosRequestHandler, { CONFIG } from '../utils/apiHandler';
import { GlobalContactInterface, useGlobalState } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router';
import ErrorModal from './general/ErrorModal';
import ConfirmationModal from './general/ConfirmModal';
import Progress from './general/ProgressWheel';
import { debug } from 'console';
import { BrowserRouter } from 'react-router-dom';

const NewContactDisplay = () => {
  const { setAppState, appState } = useGlobalState()
  const navigate = useNavigate()
  const params = useParams()

  const [display, setDisplay] = useState('NEW')
  const [favorited, setFavorited] = useState<boolean | undefined>(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [ id, setID] = useState<string | undefined>('')

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
      setMessage('Something went wrong, try again.')
    }
    setLoading(false)
  }

  const updateContact = async () => {
    setError(false)
    setLoading(true)

    const config: CONFIG = {
      method: 'POST',
      endpoint: 'api/contacts/update',
      params: { id },
      data: configData()
    }

    const [isRequestSuccessful, response] = await axiosRequestHandler(config)

    if (isRequestSuccessful) {
      const data = JSON.parse(response.data)
      
      resetRefs()
      setAppState({
        ...appState,
        allContacts: data.contacts,
      })
      navigate(favorited ? '/favorites' : '/contacts')
    } else {
      setError(true)
      setMessage('Something went wrong, try again.')
    }
    setLoading(false)
  }

  const deleteContact = async () => {
    setError(false)
    setLoading(true)

    const config: CONFIG = {
      method: 'DELETE',
      endpoint: 'api/contacts',
      params: { id }
    }

    const [isRequestSuccessful, response] = await axiosRequestHandler(config)

    if (isRequestSuccessful) {
      const data = JSON.parse(response.data)
      resetRefs()
      navigate('/')
      setAppState({
        ...appState,
        allContacts: data.contacts,
      })
      setDisplay('NEW')
    } else {
      setError(true)
      setMessage('Something went wrong, try again.')
    }
    setLoading(false)
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
      id: id ? id : Date.now().toString()
    }

    return config
  }

  const findContact = (id: any) => {
    return appState.allContacts!.find((e: any) => e.id === id)
  }

  const updateFavorites = () => {
    if (appState.allContacts) {
      const cloneContacts: GlobalContactInterface[] = [...appState!.allContacts]

      cloneContacts.forEach((e: any) => {
        if (e.id === id) {
          e.favorite = !favorited
        }
      })

      setAppState({
        ...appState,
        allContacts: cloneContacts
      })

      setFavorited(!favorited)
    }
  }

  useEffect(() => {
    if(params.id){
      setDisplay('EDIT')
      
      const foundContact: any = findContact(params.id) 
      firstRef.current.value = foundContact.firstName
      lastRef.current.value = foundContact.lastName
      phoneRef.current.value = foundContact.phoneNumber
      emailRef.current.value = foundContact.email
      setFavorited(foundContact.favorite)
      setID(params.id)

    } else {
      setDisplay('NEW')
    }
  }, [params]) //eslint-disable-line
  
  const validateInputs = (next: any) => {
    const contactInfo = configData()

    if(!contactInfo.firstName || !contactInfo.phoneNumber) {
      setError(true)
      setMessage('Contact must include a first name and phone number.')
    }

    if (contactInfo.firstName && contactInfo.phoneNumber) {
      if (contactInfo.phoneNumber.length === 10 || contactInfo.phoneNumber.length === 10){
        const digitsOnly = contactInfo.phoneNumber.split('').every(c => '0123456789'.includes(c))
        if (digitsOnly){
          if (contactInfo.email) {
            if (validateEmail()) {
              next()
            } else {
              setError(true)
              setMessage('Email address must include proper email format - example@address.com')
            }
          }
        } else {
          setError(true)
          setMessage('Phone number is not valid, must contain numbers only.')
        }
      } else {
        setError(true)
        setMessage('Phone number is not valid, must be 10 or 11 digits.')
      }
    }
  }

  const validateEmail = () => {
      return emailRef.current.value.split('').includes('@')
  }

  return (
    <div style={{ marginTop: '4rem', height: '87vh', padding: '.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant='overline' component='h2' color='initial' sx={{ width: '100%', fontSize: '40px', fontWeight: '300', textAlign: 'center', height: '5rem' }}>{display === 'NEW' ? 'Add New Contact' : 'Edit Contact'}</Typography>
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
            <IconButton aria-label={!favorited ? 'Add to favorites' : 'Contact is favorited'} size='large' onClick={() => display === 'NEW' ? setFavorited(!favorited) : updateFavorites()}>
              {favorited && <FavoriteIcon fontSize='large' color='primary'/>}
              {!favorited && <FavoriteBorderIcon fontSize='large'color='primary'/>}
            </IconButton>
            <Box sx={{ width: 'auto', flexDirection: 'row', justifyContent: 'flex-start'}}>
                { display === 'EDIT' &&
                  <Button sx={{marginRight: '1rem', height: '2.5rem', marginTop: '.5rem'}} aria-label='Delete Contact' variant='contained' color='error' size='small' onClick={() => setConfirm(true)}>
                    DELETE
                  </Button>
                }            
                <Button sx={{ height: '2.5rem', marginTop: '.5rem' }}aria-label='Save Contact' variant='contained' color='primary' size='small' onClick={() => display === 'NEW'? validateInputs(sendContacts) : validateInputs(updateContact)}>
                  SAVE
                </Button>
              </Box>
          </Box>
      </Paper>
      <Progress open={loading}/>
      <ConfirmationModal 
        openModal={confirm}
        closeModal={() => setConfirm(false)}
        confirm={() => deleteContact()}
        bodyMessage='This will delete contact permanently. Click continue to proceed.'
      />
      <ErrorModal 
        openModal={error}
        closeModal={() => {
          setError(false)
          setMessage('')
        }}
        bodyMessage={message}/>
    </div>
  );
}

export default NewContactDisplay;