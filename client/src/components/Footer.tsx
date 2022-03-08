import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  backgroundColor: '#FFF',
  top: 'auto',
  bottom: 0,
  height: '4rem'
})

const Footer = () => {
  return (
    <>
      <CssBaseline />
      <StyledAppBar />
    </>
  );
}

export default Footer