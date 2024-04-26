import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'

const router = express.Router();
router.post('/course-selection/start',authenticateToken, async (req,res) => {

    var course_selection = 0;
    var course_reg = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
        course_reg = res1.roes[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_reg == 0) {
        // start the course-selection period
        if(course_selection == 0) {
            try {
                const query = {
                name: 'start course selection',
                text: 'update timeline set course_selection = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            res.json({message : 1});
        }
        // course-selection period is already active
        else if (course_selection == 1)
        {
            res.json({message : -1}); 
        }
    }
    // course-registrtaion is active, so new courses can not be added
    else res.json({message : -2}); 
})

router.post('/course-selection/stop',authenticateToken, async (req,res) => {
  
    var course_selection = 0;
    var course_reg = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
        course_reg = res1.rows[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_selection == 1)
    {
        var num_prop_courses = 0;
        var num_selected_courses = 0;

        try {
        const query = {
            name: 'get-number-of-proposed-courses',
            text: 'select count(*) as cnt from  proposed_courses;'
        }
        const res1 = await client.query(query);
        num_prop_courses = res1.rows[0].cnt;
        }
        catch(err) {
        console.log(err.stack);
        }
    
        try {
        const query = {
            name: 'get-number-of-selected-courses',
            text: 'select count(*) as cnt from selected_courses ' +
            ' where teacher_selected = 1 and slot_selected = 1;'
        }
        const res1 = await client.query(query);
        num_selected_courses = res1.rows[0].cnt;
        // course-selection period is stopped
        if(num_prop_courses == num_selected_courses) 
        {
            try {
                const query2 = {
                name: 'stop-course-selection',
                text: 'update timeline set course_selection = 0 ;'
                }
                const res2 = await client.query(query2);
            }
            catch(err) {
                console.log(err.stack);
            }
            res.json({
            message : 1
            });
        }
        // course-selection period can't be stopped due to pending courses
        else 
        {
            try {
            const query3 = {
                name: 'get-pending-courses',
                text: ' select course_id  from proposed_courses as A where ' +
                ' (select count(*) from selected_courses as B where ' + 
                ' A.course_id = B.course_id and B.teacher_selected = 1 and slot_selected = 1 ) = 0 ; '
            }
            const res3 = await client.query(query3);
            res.json({
                message : -1,
                courses : res3.rows
            })
            }
            catch(err) {
            console.log(err.stack);
            }
        }
        }
        catch(err) {
        console.log(err.stack);
        }
    }
    // course-selection not even started
    else res.json({message : -2});
  
  })

  export default router;