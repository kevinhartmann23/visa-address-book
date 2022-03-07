import React from 'react';
import errorIcon from '../assets/404-icon-visa.png'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', padding: '2rem'}}>
      <div style={{height: '50%', justifyContent: 'space-around', marginTop: '2rem'}}>
        <img src={errorIcon} alt='Page Not Found' aria-label='Page not found' />
        <Typography variant="h5" color="initial">The page you are looking for cannot be found!</Typography>
      </div>
      <div style={{ height: '40%', padding: '4rem' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default NotFound;