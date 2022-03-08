import { styled, alpha } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ContactCard = ({ firstName, lastName, email, phoneNumber, favorite, id }: any) => {
  
  const formatAvatar = () => {
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
    return firstInitial + lastInitial
  }
  
  return (
    <StyledPaper id={id.toString()}>
      <Avatar sx={{ bgcolor: '#093FA9'}}>{formatAvatar()}</Avatar>
      <Box sx={{padding: '.25rem'}}>
        <Typography variant="overline" color="initial">{firstName + ' ' + lastName}</Typography>
        <Typography variant="subtitle1" color="initial" sx={{ length: 'contain', fontSize: '12px' }}>{phoneNumber}</Typography>
        <Typography variant="subtitle2" color="initial" sx={{length: 'contain', fontSize: '10px'}}>{email}</Typography>
      </Box>
    </StyledPaper>
  )
}

export default ContactCard;