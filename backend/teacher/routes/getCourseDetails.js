import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.get('/view-feedback/:course_id',authenticateToken, async (req,res) => {
    var res2
    console.log(req.params.course_id)
    try {
      const query = {
      name: 'get-sem-year',
      text: 'select * from current_sem',
      values : []
      }
      res2 = await client.query(query);
  }
  catch(err) {
      console.log(err.stack);
      return res.json({   // check if there is a error fetching
        tokenStatus:1,
        status:0
      })
  }
  var res3;
  try {
    const query3 = {
    name: 'get-written-feedback-for-a-course',
    text: 'select cf, tf from feedback where course_id = $1 and semester = $2 and year = $3',
    values : [req.params.course_id, res2.rows[0].semester, res2.rows[0].year]
    }
    res3 = await client.query(query3);
    console.log(res3.rows);
    
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
  
    try {
        const query1 = {
        name: 'get-feedback-for-a-course',
        text: 'select AVG(iq1) as avgiq1, AVG(iq2) as avgiq2, AVG(iq3) as avgiq3, AVG(iq4) as avgiq4, AVG(cq1) as avgcq1, AVG(cq2) as avgcq2, AVG(cq3) as avgcq3, AVG(cq4) as avgcq4, AVG(ir1) as avgir1, AVG(ir2) as avgir2, AVG(ir3) as avgir3, AVG(cr1) as avgcr1, AVG(cr2) as avgcr2, AVG(cr3) as avgcr3 from feedback where course_id = $1 and semester = $2 and year = $3',
        values : [req.params.course_id, res2.rows[0].semester, res2.rows[0].year]
        }
        const res1 = await client.query(query1);
        console.log(res1.rows);
        return res.json({
          tokenStatus:1,
           status : 1, 
           feedback : {avgs: res1.rows, cftf: res3.rows} 
          });
    }
    catch(err) {
        console.log(err.stack);
        return res.json({   // check if there is a error fetching
          tokenStatus:1,
          status:0
        })
    }
  
  })

  router.get('/present-course-details/:course_id/:num',authenticateToken, async (req,res) => {

    var num_students = 0;
    var per_page = 3;
    try {
        const query = {
        name: 'get-num-of-students',
        text: 'select count(*) as cnt from student_courses_present where course_id = $1 ;',
        values: [req.params.course_id]
        }
        const res1 = await client.query(query);
        num_students = res1.rows[0].cnt;
    }
    catch(err) {
        console.log(err.stack);
        return res.json({   // check if there is a error fetching
          tokenStatus:1,
          status:0
        })
    }
  
    if(num_students == 0)
    {
      return res.json({
        status : -2
      });
    }
  
    var num_pages = Math.ceil(num_students / per_page );
  
    // If page number is greater than max_number of pages
    if(req.params.num > num_pages) {
      return res.json({ 
        tokenStatus:1,
        status : -1 ,
         totPages : num_pages 
        });
    }
  
    var offset = per_page *(req.params.num-1);
    try {
        const query = {
        name: 'get-current-page-students',
        text: 'select B.name,B.id,A.grade from ' +
        ' student_courses_present as A , student as B where ' + 
        ' A.student_id = B.id and course_id = $3 order by student_id limit $2 offset $1 ;',
        values : [offset,per_page,req.params.course_id]
        }
        const res1 = await client.query(query);
        
        return res.json({
          tokenStatus:1,
           status : 1, 
           students : res1.rows , 
           totPages : num_pages
          });
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