import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.post('/give-grade',authenticateToken,async (req,res) => 
{
  let res1;
  // getting timeline details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'give-grade',
      text: ' update student_courses_present set grade = $1 where course_id = $2 and student_id = $3',
      values: [req.body.grade, req.body.course_id, req.body.student_id]
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
    return res.json({

      tokenStatus:1,
      status:1
    })
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
   
})

export default router ;