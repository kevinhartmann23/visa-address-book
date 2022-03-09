import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import visaLogo from '../assets/visa_logo.png'

const StyledHeader = styled(AppBar)({
  backgroundColor: "#FFF",
  position: 'fixed',
  height: '4rem'
})

const Header = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledHeader>
        <Toolbar>
          <IconButton aria-label='Return Home' disableRipple onClick={() => navigate('/', {replace: true})}>
            <img src={visaLogo} alt='Visa Logo' aria-label='Visa Logo' style={{height: '50px'}} />
            <Typography
              variant="h1"
              noWrap
              component="h1"
              sx={{ display: { xs: 'none', sm: 'block' }, color: '#3E3E3E', fontSize: '20px' }}
            >
              Address Book
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </StyledHeader>
    </Box>
  );
}

export default Header;