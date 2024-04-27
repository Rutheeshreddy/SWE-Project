import authenticateToken from "./Authenticate.js";
import express, { Router } from 'express';
import client from '../config/database.js'

const router = express.Router();

router.post('/grading/start',authenticateToken, async (req,res) => {
    console.log('Hi');
    var course_grading = 0;
    var prev_period = 0;
    try {
        const query = {
        name: 'check if we can start course grading',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_grading = res1.rows[0].course_grading ;
        prev_period = res1.rows[0].prev_period ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(prev_period == 3) {
        // start the course-grading period
        if(course_grading == 0) {
            try {
                const query = {
                name: 'start course Grading Period',
                text: 'update timeline set course_grading = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            return res.json({message : 1});
        }
        // course-grading period is already active
        else if (course_grading == 1)
        {
            return res.json({message : -1}); 
        }
    }
    // course-grading can not be started
    else return res.json({message : -2}); 
})

router.post('/grading/stop',authenticateToken, async (req,res) => {

    var course_grading = 0;
    try {
        const query = {
        name: 'check if course grading is started',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_grading = res1.rows[0].course_grading;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_grading == 1) {
        try {
            const query = {
            name: 'stop course Grading period',
            text: 'update timeline set course_grading = 0, prev_period = 0 ;'
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