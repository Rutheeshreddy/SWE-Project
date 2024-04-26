import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import client from '../config/database.js'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'../.env' });
const app = express();

const router = express.Router();


function authenticateToken(req, res, next) {
  const bearer = req.headers['authorization'];
  const token = bearer && bearer.split(' ')[1];
  if (token == null) {
    res.json({ tokenStatus: 0 });
    console.log("token not confirmed ",token)
    
  }
  else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log("token is invalid")
        res.json({ tokenStatus: 0 });
      }
      else {
        req.user=user
        console.log("token confirmed")
        next();
      }
    })
  }

};

router.get('/test',authenticateToken,(req,res)=>
{
   res.json({ok:1});
})

router.get('/verify',authenticateToken,async (req,res) => 
{
  let res1,res2;
  // getting student details
  try {
    // console.log(req.user)
    const query = {
      name: 'get-student-name',
      text: ' select * from student where id = $1  ',
      values: [req.user.userName]
    }
    res1 = await client.query(query);
    // console.log(res1)
   
  }
  catch(err) {
    console.log(err.stack);
    res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
  // getting the present year and semester
  try {
    const query1 = {
      name: 'get-present-year',
      text: ' select * from current_sem  ',
      values: []
    }
    res2 = await client.query(query1);   
  }
  catch(err) {
    console.log(err.stack);
    res.json({
      tokenStatus:1,
      status:0
    })
  }
  // getting the courses he registered for in this semester
  try {
    const query1 = {
      name: 'get-registered-courses',
      text: ' select * from student_courses_present  '+
            "WHERE student_id = $1",
      values: [req.user.userName]
    }
    const res = await client.query(query1);
    res.json({
      tokenStatus:1,
      status:1,
      details:res1.rows[0],
      sem:res2.rows[0],
      courses : res.rows
    })
   
  }
  catch(err) {
    console.log(err.stack);
    res.json({
      tokenStatus:1,
      status:0
    })
  }
})

router.post('available-courses/:pagenum',authenticateToken,async (req,res)=>
{
  const pagenum = req.params.pagenum; var num_courses = 0;
  var per_page = 5;
  try {
      const query = {
      name: 'get-num-of-courses',
      text: 'select count(*) as cnt from present_courses ' +
            "WHERE instructor_name like '%%$1%%' AND credits like '%%$2%%' "+
            "name like '%%$3%%' AND course_id like  '%%$4%%' AND slot like '%%$5%%'",
      value: [ filters.instructor,filters.credits,filters.courseName,filters.courseId,filters.slot]
      }
      const res1 = await client.query(query);
      num_courses = res1.rows[0].cnt;
  }
  catch(err) {
      console.log(err.stack);
  }

  var num_pages = Math.ceil(num_courses / per_page );
  if(pagenum > num_pages) return res.json({ message : -1 , totPages : num_pages });
  var offset = per_page *(pagenum-1);

  const filters = req.body.filters
  try {
    const query = {
    name: 'send available courses',
    text: 'select * from present_courses '+
          "WHERE instructor_name like '%%$1%%' AND credits like '%%$2%%' "+
          "name like '%%$3%%' AND course_id like  '%%$4%%' AND slot like '%%$5%%' "+
          "order by course_id limit $7 offset $6 ;",
    value: [ filters.instructor,filters.credits,filters.courseName,filters.courseId,filters.slot,offset,per_page]
    
    }
    const res1 = await client.query(query);
    res.json({ message : 1, courses : res1.rows , totPages : num_pages});
   }
   catch(err) {
      console.log(err.stack);
  }
})



export default router;