import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'
import {getSem} from "./getTeacherName.js";

const router = express.Router();

router.get('/test',authenticateToken,(req,res)=>
  {
     res.json({ok:1});
})

router.get('/verify',authenticateToken, async (req,res) => 
{

    var current_period = "";
    var prev_period = 0;
  
    var {current_sem,current_year} = await getSem();
  
    try {
      const query = {
        name: 'get-period-details',
        text: 'SELECT * FROM timeline ;'
      }
      const res1 = await client.query(query);
      prev_period = res1.rows[0].prev_period;
      if(res1.rows[0].course_reg == 1) current_period = 'course_reg';
      else if(res1.rows[0].course_feedback == 1) current_period = 'course_feedback';
      else if(res1.rows[0].course_grading == 1) current_period = 'course_grading';
      else current_period = 'course_selection';

    }
    catch(err) {
      console.log(err.stack);
    }
    
    res.json({
      tokenStatus : 1,
      sem : current_sem,
      year : current_year,
      name : req.user.userName.split('@')[0],
      period : current_period,
      prev_period : prev_period
    })
  
  
})

export default router;