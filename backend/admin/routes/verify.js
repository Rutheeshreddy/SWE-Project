import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'

const router = express.Router();

router.get('/test',authenticateToken,(req,res)=>
  {
     res.json({ok:1});
})

router.get('/verify',authenticateToken, async (req,res) => 
{

    var current_sem = "";
    var current_year = 0;
    var current_period = "";
  
    try {
      const query = {
        name: 'get-sem-details',
        text: 'SELECT * FROM current_sem ;'
      }
      const res1 = await client.query(query);
      current_sem = res1.rows[0].semester;
      current_year = res1.rows[0].year;
    }
    catch(err) {
      console.log(err.stack);
    }
  
    try {
      const query = {
        name: 'get-period-details',
        text: 'SELECT * FROM timeline ;'
      }
      const res1 = await client.query(query);
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
      period : current_period
    })
  
  
})

export default router;