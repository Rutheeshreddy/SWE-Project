import authenticateToken from "./Authenticate.js";
import express, { Router } from 'express';
import client from '../config/database.js'

const router = express.Router();

router.post('/feedback/start',authenticateToken, async (req,res) => {
    console.log('Hi');
    var course_feedback = 0;
    var prev_period = 0;
    try {
        const query = {
        name: 'check if we can start course feedback',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_feedback = res1.rows[0].course_feedback ;
        prev_period = res1.rows[0].prev_period ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(prev_period == 2) {
        // start the course-feedback period
        if(course_feedback == 0) {
            try {
                const query = {
                name: 'start course Feedback Period',
                text: 'update timeline set course_feedback = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            return res.json({message : 1});
        }
        // course-feedback period is already active
        else if (course_feedback == 1)
        {
            return res.json({message : -1}); 
        }
    }
    // course-feedback can not be started
    else return res.json({message : -2}); 
})

router.post('/feedback/stop',authenticateToken, async (req,res) => {

    var course_feedback = 0;
    try {
        const query = {
        name: 'check if course feedback is started',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_feedback = res1.rows[0].course_feedback ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_feedback == 1) {
        try {
            const query = {
            name: 'stop course Feedback period',
            text: 'update timeline set course_feedback = 0, prev_period = 3 ;'
            }
            const res1 = await client.query(query);
        }
        catch(err) {
            console.log(err.stack);
        }
        return res.json({message : 1});
    }
    else 
    {
        return res.json({message : -1}); 
    } 
})

export default router