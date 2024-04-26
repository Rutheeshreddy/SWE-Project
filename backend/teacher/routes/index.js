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
  let res1,res2, res3;
  // getting teacher details
  try {
    console.log(req.user)
    const query = {
      name: 'get-teacher-name',
      text: ' select * from instructor where id = $1  ',
      values: [req.user.userName]
    }
    res1 = await client.query(query);
    console.log(res1)
   
  }
  catch(err) {
    console.log(err.stack);
    res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
  // getting the courses he teaches for in this semester
  try {
    const query1 = {
      name: 'get-teaching-courses',
      text: ' select * from present_courses  '+
            "WHERE instructor_id = $1",
      values: [req.user.userName]
    }

    res3 = await client.query(query1);
    console.log(res3)

    res.json({
      tokenStatus:1,
      status:1,
      details:res1.rows[0],
      courses : res3.rows
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



export default router;