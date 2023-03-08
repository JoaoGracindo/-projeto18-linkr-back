import express from 'express';
import cors from "cors"
import authRouter from './routers/authRouters.js';

const app = express();

app.use(cors())
app.use(express.json())
app.use([authRouter])


app.listen(5000, () => console.log('Server is running on port 5000'));