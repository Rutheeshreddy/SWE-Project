import express from 'express';
const app = express();
import Routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.listen(5000)
app.use('', Routes);