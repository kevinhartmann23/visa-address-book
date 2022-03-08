import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import visaLogo from '../assets/visa_logo.png'

const StyledHeader = styled(AppBar)({
  backgroundColor: "#FFF",
  position: 'static',
  height: '4rem'
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#EBEBEB', 0.5),
  '&:hover': {
    backgroundColor: alpha('#EBEBEB', 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#3E3E3E',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledHeader>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#3E3E3E' }}
          >
            <MenuIcon />
          </IconButton>
          <img src={visaLogo} alt='Visa Logo' aria-label='Visa Logo' style={{height: '50px'}} />
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: '#3E3E3E', fontSize: '20px' }}
          >
            Address Book
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon 
                sx={{ mr: 2, color: '#3E3E3E' }}
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </StyledHeader>
    </Box>
  );
}

export default Header;