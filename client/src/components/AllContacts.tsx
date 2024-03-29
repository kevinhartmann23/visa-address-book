import { useState, useEffect } from 'react';
import { useGlobalState } from '../context/AppContext'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import ContactCard from './ContactCard';
import Divider from '@mui/material/Divider';

const AllContacts = (props: {title: string}) => {
  const { appState } = useGlobalState()
  const [contacts, setContacts] = useState<any>([])

  useEffect(() => {
    if (appState.allContacts) {
      if(props.title === 'All Contacts'){
        setContacts(appState.allContacts)
      } else if (props.title === 'Favorites') {
        setContacts(appState.allContacts.filter((el: any) => el.favorite === true))
      }
    }
  }, [appState.allContacts, props.title])
  
  return (
    <div style={{padding: '.5rem 3rem 7rem 3rem', marginTop: '4rem' }}>
      <Box sx={{ flexGrow: 1, height: '80%' }}>
        <Typography variant="overline" component='h2' color="initial" sx={{ width: '100%', fontSize: '40px', fontWeight: '300', textAlign: 'center', height: '5rem'}}>{props.title}</Typography>
        <Divider sx={{ marginBottom: '1rem' }} />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{overflow: 'scroll'}}>
          {contacts!.length > 0 && contacts!.map((obj: any, index: number) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ContactCard firstName={obj.firstName} lastName={obj.lastName} email={obj.email} phoneNumber={obj.phoneNumber} favorite={obj.favorite} id={obj.id} />
            </Grid>
          ))}
        </Grid>
        {contacts!.length === 0 && <Typography variant="body1" color="initial" sx={{ length: '100%', textAlign: 'center', marginTop: '4rem' }}>No contacts</Typography>}
      </Box>
    </div>
  );
}

export default AllContacts;