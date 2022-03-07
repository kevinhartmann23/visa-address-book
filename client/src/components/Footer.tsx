import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  backgroundColor: '#FFF',
  top: 'auto',
  bottom: 0,
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

const Footer = () => {
  return (
    <>
      <CssBaseline />
      <StyledAppBar>
        <Toolbar>
          <StyledFab aria-label="add contact">
            <AddIcon />
          </StyledFab>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          {/* TO ADD GAP BETWEEN ADDITONAL ICONS ^^ */}
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

export default Footer