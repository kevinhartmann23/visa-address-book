import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes';

const app = express();
const router = express.Router()

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
app.use(router)

export default app
