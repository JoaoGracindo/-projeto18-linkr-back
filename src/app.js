import express, { json } from 'express';
import cors from 'cors';

import { routes } from './routes/routes.js';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.listen(5000, () => console.log('Server is running on port 5000'));