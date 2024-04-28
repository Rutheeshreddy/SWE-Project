import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.post('/register-courses',authenticateToken,async (req,res) => 
{
  
    // removing all courses the student already registered for
    
    try {
        const query = {
        name: 'delete-teacher-courses',
        text: 'delete from selected_teacher WHERE teacher_id = $1',
        values: [req.user.userName]
        }
        const res1 = await client.query(query);
  
    }
    catch(err) {
        console.log(err.stack);
        res.json({
          status:0,
        })
    }
    let sem,year  
    // getting the present year and semester
            try {
                const query1 = {
                name: 'get-present-year',
                text: ' select * from current_sem  ',
                values: []
                }
              const res2 = await client.query(query1); 
              sem = res2.rows[0].semester
              year = res2.rows[0].year  
            }
            catch(err) {
                console.log(err.stack);
                res.json({
                tokenStatus:1,
                status:0
                })
            }
    // adding the new list of courses
    let carr = req.body.regCourses
    // console.log(carr);
    for(let i = 0;i<carr.length;i++)
    {   
        try {
                const query = {
                name: 'send-request-to-teach',
                text: 'insert into selected_teacher(course_id,teacher_id,teacher_selected) VALUES ($1,$2,0) ;',
                values: [carr[i].course_id,req.user.userName]
                }
                const res1 = await client.query(query);
        
            }
            catch(err) {
                console.log(err.stack);
                return res.json({
                status:0,
                })
            }
  }

  return res.json({
    status:1
  })
   
})

export default router ;