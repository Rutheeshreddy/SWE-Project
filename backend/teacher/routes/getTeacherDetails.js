import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.get('/verify',authenticateToken,async (req,res) => 
{
  let res1, res2;
  // getting teacher details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'get-teacher-name',
      text: ' select * from instructor where id = $1  ',
      values: [req.user.userName]
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
   
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
  // getting the courses he teaches for in this semester
  try {
    const query2 = {
      name: 'get-teaching-courses',
      text: ' select * from present_courses  '+
            "WHERE instructor_id = $1",
      values: [req.user.userName]
    }

    res2 = await client.query(query2);
    // console.log(res3)

    return res.json({

      tokenStatus:1,
      status:1,
      details : res1.rows[0],
      courses : res2.rows

    })
   
  }
  catch(err) {
    console.log(err.stack);
    return res.json({
      tokenStatus:1,
      status:0
    })
  }
})

router.get('/get-timelines',authenticateToken,async (req,res) => 
{
  let res1;
  // getting timeline details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'get-timeline-details',
      text: ' select * from timeline  '
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
    return res.json({

      tokenStatus:1,
      status:1,
      grade : res1.rows[0].course_grading,
      selection : res1.rows[0].course_selection,
      prev_period : res1.rows[0].prev_period

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

export default router;