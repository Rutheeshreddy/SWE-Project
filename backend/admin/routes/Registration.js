import authenticateToken from "./Authenticate.js";
import express, { Router } from 'express';
import client from '../config/database.js'

const router = express.Router();

router.post('/registration/start',authenticateToken, async (req,res) => {
    console.log('Hi');
    var course_reg = 0;
    var prev_period = 0;
    try {
        const query = {
        name: 'check if we can start course reg',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_reg = res1.rows[0].course_reg ;
        prev_period = res1.rows[0].prev_period ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(prev_period == 1) {
        // start the course-reg period
        if(course_reg == 0) {
            try {
                const query = {
                name: 'start course registration',
                text: 'update timeline set course_reg = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            return res.json({message : 1});
        }
        // course-reg period is already active
        else if (course_reg == 1)
        {
            return res.json({message : -1}); 
        }
    }
    // course-registrtaion is active, so new courses can not be added
    else return res.json({message : -2}); 
})

router.post('/registration/stop',authenticateToken, async (req,res) => {

    var course_reg = 0;
    try {
        const query = {
        name: 'check if course reg is started',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_reg = res1.rows[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_reg == 1) {
        try {
            const query = {
            name: 'stop course reg',
            text: 'update timeline set course_reg = 0, prev_period = 2 ;'
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