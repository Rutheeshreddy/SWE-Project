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


router.post('/give-feedback/',authenticateToken,async (req,res)=>
{

  const feedback = req.body.feedback
  let res1;

  console.log(req.body)
  console.log()

  try {
      const query = {
        name : 'get-current-sem',
        text : 'select * from current_sem',
        values : []     
      }
      res1 = await client.query(query)
  }
  catch(err) {
      console.log(err.stack);
  }

  try {
    const query1 = {
      name : 'insert-feedback',
      text : 'insert into feedback values (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)',
      values : [req.body.course_id, res1.rows[0].semester, res1.rows[0].year, feedback[0].iq1, feedback[0].iq2, feedback[0].iq3, feedback[0].iq4, feedback[0].cq1, feedback[0].cq2, feedback[0].cq3, feedback[0].cq4, feedback[1].cr1, feedback[1].cr2, feedback[1].cr3, feedback[1].ir1, feedback[1].ir2, feedback[1].ir3, feedback[2], feedback[3], req.body.instructor_id]    
    }
    const res2 = await client.query(query1)
  
  }
   catch(err) {
      console.log(err.stack);
  }

  try {
    const query2 = {
      name : 'update-feedback',
      text : 'update student_courses_present set feedback = true where student_id = $1 AND course_id = $2',
      values : [req.user.userName, req.body.course_id]
    }
    const res3 = await client.query(query2)
  }
   catch(err) {
      console.log(err.stack);
  }
})
  
   



export default router;