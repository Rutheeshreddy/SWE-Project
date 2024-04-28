import authenticateToken from "./Authenticate.js";
import express, { Router } from 'express';
import client from '../config/database.js'

const router = express.Router();

router.post('/registration/start',authenticateToken, async (req,res) => {
    console.log('Hi');
    var course_reg = 0;
    var prev_period = 0;
    try {
        const query = {
        name: 'check if we can start course reg',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_reg = res1.rows[0].course_reg ;
        prev_period = res1.rows[0].prev_period ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(prev_period == 1) {
        // start the course-reg period
        if(course_reg == 0) {
            try {
                const query = {
                name: 'start course registration',
                text: 'update timeline set course_reg = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            return res.json({message : 1});
        }
        // course-reg period is already active
        else if (course_reg == 1)
        {
            return res.json({message : -1}); 
        }
    }
    // course-registrtaion is active, so new courses can not be added
    else return res.json({message : -2}); 
})

router.post('/registration/stop',authenticateToken, async (req,res) => {

    var course_reg = 0;
    try {
        const query = {
        name: 'check if course reg is started',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_reg = res1.rows[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_reg == 1) {
        try {
            const query = {
            name: 'stop course reg',
            text: 'update timeline set course_reg = 0, prev_period = 2 ;'
            }
            const res1 = await client.query(query);
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

router.get('/present-courses',authenticateToken, async (req,res) => {
    console.log("Hi")
    try {
        const query = {
        name: 'get-present-courses',
        text: 'select course_id, name, instructor_id, slot from present_courses',
        values: []
        }
        const res1 = await client.query(query);
        res.json({
          status:1,
          courses:res1.rows
        })
    }
    catch(err) {
        console.log(err.stack);
        res.json({
          status:0,
        })
    }
  
  })

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
  
  router.post('/remove-student', authenticateToken, async (req,res) => {

    try {
        const query = {
          name: 'admin-removes-student-from-course',
          text: 'delete from student_courses_present where course_id = $1 and student_id = $2;',
          values : [req.body.course_id, req.body.student_id]
        }
        const res1 = await client.query(query);

        return res.json({status: 1, message : res1.rowCount});
      }
      catch(err) {
        console.log(err.stack);
      }
  
})

export default router