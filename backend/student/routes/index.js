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

router.get('/verify',authenticateToken,(req,res) => 
{
    res.json({
      tokenStatus : 1
    })
})

router.post('available-courses/:pagenum',authenticateToken,async (req,res)=>
{
  const filters = req.body.filters
  try {
    const query = {
    name: 'send available courses',
    text: 'select * from present_courses '+
          'WHERE instructor_name ~ \'.*$1.*\' AND'+
          'course_name ~ \'$2\'',
    values: [filters.instructor,filters.]
    }
    const res1 = await client.query(query);
    course_selection = res1.rows[0].course_selection ;
    course_reg = res1.roes[0].course_reg ;
   }
  catch(err) {
      console.log(err.stack);
  }
})



export default router;