import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.get('/taught-courses/:instructor_id',authenticateToken,async (req,res) => 
{

  let res1;
  // getting sem details
  try {
    const query1 = {
      name: 'get-sem-details',
      text: ' select * from past_courses where instructor_id = $1 order by (semester,year)  ',
      values: [req.params.instructor_id]
    }
    res1 = await client.query(query1);
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }

    if(res1.rowCount == 0) {
      return res.json({

        tokenStatus:1,
        status:1,
        courses : res1.rows,

      })
  }
    var cur_sem =res1.rows[0].semester;
    var cur_year = res1.rows[0].year;
     var output = [];
     var courses = [];
     for (var i=0;i<res1.rowCount;i++) {
      if(res1.rows[i].semester == cur_sem  &&
        res1.rows[i].year == cur_year ) {
          courses.push(res1.rows[i]);
        }
        else {
          output.push({sem : cur_sem , year : cur_year, courses : courses });
          courses = [];
          courses.push(res1.rows[i]);
          cur_sem = res1.rows[i].semester;
          cur_year = res1.rows[i].year;
        }
     }
    //  courses.push(res1.rows[res1.rowCount-1]);
     output.push({sem : cur_sem , year : cur_year, courses : courses });

     return res.json({
      tokenStatus:1,
      status:1,
      courses : output
     })

   
})

export default router ;