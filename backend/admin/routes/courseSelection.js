import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'

const router = express.Router();
router.post('/course-selection/start',authenticateToken, async (req,res) => {

    var course_selection = 0;
    var prev_period = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
        prev_period = res1.rows[0].prev_period ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(prev_period == 0) {
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
            return res.json({message : 1});
        }
        // course-selection period is already active
        else if (course_selection == 1)
        {
            return res.json({message : -1}); 
        }
    }
    // course-registrtaion is active, so new courses can not be added
    else return res.json({message : -2}); 
})

router.post('/course-selection/stop',authenticateToken, async (req,res) => {
  
    var course_selection = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_selection == 1)
    {
        var num_prop_courses = 0;
        var num_selected_teacher = 0;
        var num_selected_slot = 0;

        try {
        const query = {
            name: 'get-number-of-proposed-courses',
            text: 'select count(*) as cnt from  proposed_courses ;'
        }
        const res1 = await client.query(query);
        num_prop_courses = res1.rows[0].cnt;
        
        const query2 = {
            name: 'get-number-of-selected-teachers',
            text: 'select count(*) as cnt from  selected_teacher where teacher_selected = 1 ;'
        }
        const res2 = await client.query(query2);
        num_selected_teacher = res2.rows[0].cnt;
        
        const query3 = {
            name: 'get-number-of-selected-slots',
            text: 'select count(*) as cnt from  selected_slot where slot_selected = 1 ;'
        }
        const res3 = await client.query(query3);
        num_selected_slot = res3.rows[0].cnt;

        if(num_prop_courses == num_selected_slot &&
            num_prop_courses == num_selected_teacher) 
        {
                
            const query4 = {
                name: 'stop-course-selection',
                text: 'update timeline set course_selection = 0, prev_period = 1 ;'
            }
            const res4 = await client.query(query4);

            const query5 = {
                name: 'empty-proposed-courses-table',
                text: 'delete from proposed_courses ;'
            }
            const res5 = await client.query(query5);

            return res.json({message : 1});

        }

        else return res.json({message : -1});
        
    }
        catch(err) {
        console.log(err.stack);
        }
    }
    // course-selection not even started
    else return res.json({message : -2});
  
  })

  export default router;