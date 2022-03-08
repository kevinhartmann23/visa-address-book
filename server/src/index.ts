import app from './app'

import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
  console.log(`Listening on PORT:\n ~~~~${PORT}~~~~`);
});


// Allows server to exit gracefully on ctrl-c ⬇️
process.on('SIGINT', () => {
  console.log('exiting SIGINT')
  process.exit(0)
})