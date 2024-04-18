import express from 'express';
const app = express();
import Routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.listen(process.env.PORT)
app.use('', Routes);