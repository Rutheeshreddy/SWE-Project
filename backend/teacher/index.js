import express from 'express';
const app = express();
// import Routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import courseSelection from './routes/courseSelection.js';
import getAllTeachingCourses from './routes/getAllTeachingCourses.js';
import getAvailableCourses from './routes/getAvailableCourses.js';
import getCourseDetails from './routes/getCourseDetails.js'
import getSelectedCourseDetails from './routes/getSelectedCourseList.js';
import getTeacherDetails from './routes/getTeacherDetails.js';
import gradeSubmission from './routes/gradeSubmission.js';

dotenv.config()

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.listen(process.env.PORT)
// app.use('',Routes)
app.use('', courseSelection);
app.use('', getAllTeachingCourses);
app.use('', getAvailableCourses);
app.use('', getCourseDetails);
app.use('', getSelectedCourseDetails);
app.use('', getTeacherDetails);
app.use('', gradeSubmission);