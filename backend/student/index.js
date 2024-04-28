import express from 'express';
const app = express();
import Routes from './routes/studentDetails.js';
import Routes2 from './routes/feedback_grade.js'
import Routes3 from './routes/register.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.listen(process.env.PORT)
app.use('', Routes);
app.use('', Routes2);
app.use('',Routes3)