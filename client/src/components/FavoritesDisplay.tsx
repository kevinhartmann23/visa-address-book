import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/AppContext'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import ContactCard from './ContactCard';
import Divider from '@mui/material/Divider';


const FavoritesDisplay = () => {
  const { appState } = useGlobalState()
  const [favorites, setFavorites] = useState<any>([])

  
  useEffect(() => {
    if (appState.allContacts){
      setFavorites(appState.allContacts.filter((el: any) => el.favorite === true).splice(0, 6))
    }
  }, [appState.allContacts])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="overline" component='h2' color="initial" sx={{width: '100%', fontSize: '40px', fontWeight: '300', textAlign: 'center', height: '5rem'}}>Top Favorites</Typography>
      <Divider sx={{marginBottom: '1rem'}}/>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {favorites!.length > 0 && favorites!.map((obj: any, index: number) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ContactCard firstName={obj.firstName} lastName={obj.lastName} email={obj.email} phoneNumber={obj.phoneNumber} favorite={obj.favorite} id={obj.id}/>
          </Grid>
        ))}
        {favorites!.length === 0 && <Typography variant="body1" color="initial">No Favorites</Typography>}
      </Grid>
    </Box>
  );
}

export default FavoritesDisplay;