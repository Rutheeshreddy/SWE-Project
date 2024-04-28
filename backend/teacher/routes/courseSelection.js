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
        // console.log("token confirmed")
        next();
      }
    })
  }

};

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


export default router;