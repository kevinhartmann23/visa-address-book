import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useGlobalState, GlobalContactInterface } from '../context/AppContext';
import { useNavigate, useLocation } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: '1rem 1rem 0rem 1rem',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ContactCard = ({ firstName, lastName, email, phoneNumber, favorite, id }: any) => {
  const { appState, setAppState } = useGlobalState()
  const navigate = useNavigate()
  const location = useLocation()
  const [favorited, setFavorited] = useState(favorite)
  const [viewMore, setViewMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const formatAvatar = () => {
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
    return firstInitial + lastInitial
  }

  const formatPhoneNumber = () => {
    if(phoneNumber.length === 10){
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (phoneNumber.length === 11){
      return phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
    }
  }

  const updateFavorites = () => {
    if(appState.allContacts){
      const cloneContacts: GlobalContactInterface[] = [...appState!.allContacts]
  
      cloneContacts.forEach((e: any) => {
        if(e.id === id){
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

  const handleEditButton = () => {
    const config: GlobalContactInterface = {
      firstName,
      lastName,
      email,
      phoneNumber,
      favorite: favorited,
      id
    }
    
    if (location.pathname === '/') {
      navigate(`contacts/${id}`)
    } else {
      navigate(`/contacts/${id}`, { replace: true})
    }
  }
  
  return (
    <StyledPaper id={id.toString()}>
      <Avatar sx={{ bgcolor: '#093FA9'}}>{formatAvatar()}</Avatar>
      <Box sx={{padding: '.25rem'}}>
        <Typography variant="overline" color="initial">{firstName + ' ' + lastName}</Typography>
        <Typography variant="subtitle1" color="initial" sx={{ length: 'contain', fontSize: '12px' }}>{formatPhoneNumber()}</Typography>
        {viewMore &&
          <Typography variant="subtitle2" color="initial" sx={{length: 'contain', fontSize: '10px'}} component='a' href={`mailto:${email}`}>{email}</Typography>
        }
      </Box>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <IconButton aria-label={!favorited ? 'Add to favorites' : 'Contact is favorited'} size='small' onClick={() => updateFavorites()}>
          {favorited && <FavoriteIcon fontSize='small' color='primary' />}
          {!favorited && <FavoriteBorderIcon fontSize='small' color='primary' />}
        </IconButton>
        <IconButton aria-label='view more information' size='small' onClick={() => setViewMore(!viewMore)}>
          <ExpandMoreIcon />
        </IconButton>
        <IconButton aria-label='edit selected contact' size='small' onClick={() => handleEditButton()}>
          <EditIcon />
        </IconButton>  
      </Box>
    </StyledPaper>
  )
}

export default ContactCard;