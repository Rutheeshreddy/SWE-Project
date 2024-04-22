import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import verify from './routes/verify.js';
import proposedCourses from './routes/proposedCourses.js';
import courseSelection  from './routes/courseSelection.js';

dotenv.config()
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.listen(process.env.PORT)
app.use('', verify);
app.use('',proposedCourses);
app.use('',courseSelection)
