import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  backgroundColor: '#FFF',
  top: 'auto',
  bottom: 0,
  height: '4rem'
})

const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.8),
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 1),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 1),
  },
}));

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <CssBaseline />
      <StyledAppBar>
        {(location.pathname === '/contacts' || location.pathname === '/favorites') &&
        <Toolbar>
          <StyledButton variant="contained" color='secondary' startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/')}>
            Home
          </StyledButton>
          <Box sx={{ flexGrow: 1 }} />
          <StyledFab aria-label="add contact">
            <AddIcon onClick={() => navigate('/add-new-contact')}/>
          </StyledFab>
        </Toolbar>
      }
        {(location.pathname === '/add-new-contact' || location.state ) &&
          <Toolbar>
            <StyledButton variant="contained" color='secondary' startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/')}>
              Home
            </StyledButton>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
      }
      </StyledAppBar>
    </>
  );
}

export default Footer