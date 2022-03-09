import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes';
const contacts = require('./data/contacts')

const app = express();
const router = express.Router()
app.use(express.json())

app.use(morgan('tiny'))

app.use(
  cors({
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

app.use(express.static('./ui'))

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

router.use('/api', routes)

app.locals.title = 'VISA address book API'
app.locals.contacts = contacts

app.use(router)

export default app
