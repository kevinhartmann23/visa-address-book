import express, { Request, Response } from 'express'
import routes from './routes';

const app = express();
const router = express.Router()

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

router.use('/api', routes)
app.use(router)

export default app
