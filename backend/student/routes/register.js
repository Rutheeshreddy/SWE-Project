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

router.get('/past-and-present-courses',authenticateToken, async(req, res) =>
{
  try{
    const query = {
      name :  'bring-past-and-present-courses',
      text : 'select * from student_courses_past where student_id = $1',
      values : [req.user.userName]
    }

    const res1 = await client.query(query)
    console.log(res1.rows)
    res.json({
      courses: res1.rows,
      status: 1})
  }

  catch(err){

    console.log(err.stack);
    res.json({
      status:0,
    })
  }
})



router.post('/register-courses',authenticateToken,async (req,res) => 
{
  
    // removing all courses the student already registered for
    
    try {
        const query = {
        name: 'delete-student-courses',
        text: 'delete from student_courses_present WHERE student_id = $1',
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
    for(let i = 0;i<carr.length;i++)
    {   
        try {
                const query = {
                name: 'add-course-to-student',
                text: 'insert into student_courses_present VALUES ($1,$2,$3,$4,$5,$6,$7,NULL,false)',
                values: [carr[i].course_id,sem,year,carr[i].name,carr[i].credits,carr[i].elective,req.user.userName]
                }
                const res1 = await client.query(query);
        
            }
            catch(err) {
                console.log(err.stack);
                res.json({
                status:0,
                })
            }
  }

  res.json({
    status:1
  })
   
})
  
   



export default router;