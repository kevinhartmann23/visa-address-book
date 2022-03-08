import React, { Component } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import ContactsIcon from '@mui/icons-material/Contacts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import { CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string
  redirectUrl: string
  iconName: string
}
const StyledCard = styled(Card)(({ theme }) => ({
  height: '30%', 
  width: '100%', 
  display: 'flex',
  flexDirection: 'row',
  backgroundImage: 'linear-gradient(to right, #093FA9, #f7f7f7)',
  [theme.breakpoints.down('sm')]: {
    backgroundImage: 'linear-gradient(to right, #093FA9, #093FA9)',
    fontSize: '15px'
  },
  ":hover": {
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(to right, #093FA9, #093FA9)',
  }
}))

const StyledTypog = styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  marginLeft: '.75rem',
  height: '100%',
  marginTop: '1.5rem',
  textTransform: 'uppercase',
  fontWeight: '300',
  [theme.breakpoints.down('lg')]: {
      fontSize: '28px',
    },
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.down('xs')]: {
    display: 'none'
  },
}));

const StyledBox = styled(Typography)(({ theme }) => ({
  width: '95%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  padding: '2rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const CardFade = ({ title, redirectUrl, iconName }: IProps) => {
  const navigate = useNavigate()

  return (
      <StyledCard elevation={0} onClick={() => navigate(redirectUrl)}>
        <CardActionArea>
        <StyledBox>
          {iconName === 'contacts' && <ContactsIcon sx={{color: '#F7BD19', fontSize: '90px'}} />}
          {iconName === 'favorites' && <FavoriteIcon sx={{ color: '#F7BD19', fontSize: '90px' }} />}
          {iconName === 'new contact' && <AddCircleIcon sx={{ color: '#F7BD19', fontSize: '90px', }} />}
          <StyledTypog variant='h3'>{title}</StyledTypog>
        </StyledBox>
        <Box sx={{ flexGrow: 1 }} />
        </ CardActionArea>
      </StyledCard>
  );
}

export default CardFade;