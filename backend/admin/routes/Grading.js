import authenticateToken from "./Authenticate.js";
import express, { Router } from 'express';
import client from '../config/database.js'
import { calculateGpa,calculateRating } from "./calculateGpa.js";

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

            const query2 = {
                name: 'get-present-courses',
                text: 'select * from present_courses ;'
                }
            const res2 = await client.query(query2);
            const courses = res2.rows;
            for (var i=0;i<courses.length;i++) 
            {
                var avg_gpa = await calculateGpa(courses[i].course_id);
                var rating = await calculateRating(courses[i].course_id);
                const query = {
                    name: 'insert into past_courses',
                    text: 'insert into past_courses values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);',
                    values: [courses[i].course_id,courses[i].semester,courses[i].year,
                        courses[i].name,courses[i].credits,courses[i].instructor_id,
                        courses[i].prerequisites,avg_gpa,rating.r1,rating.r2,rating.r3,courses[i].max_capacity]
                    }
                    const res1 = await client.query(query);
            }

            const query3 = {
                name: 'get-present-courses-students',
                text: 'select * from student_courses_present ;'
                }
            const res3 = await client.query(query3);
            const students = res2.rows;
            for (var i=0;i<students.length;i++) 
            {
                const query = {
                    name: 'insert into past_students',
                    text: 'insert into student_courses_present values ($1,$2,$3,$4,$5,$6,$7,$8);',
                    values: [students[i].course_id,students[i].semester,students[i].year,
                        students[i].name,students[i].credits,students[i].elective,
                        students[i].student_id,students[i].grade]
                    }
                    const res1 = await client.query(query);
            }
            const query4 = {
                name: 'delete-present-courses',
                text: 'delete from present_courses ;'
                }
            const res4 = await client.query(query4);
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