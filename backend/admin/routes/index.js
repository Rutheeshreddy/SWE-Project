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
  const query = {
    name: 'get-sem-details',
    text: 'SELECT * FROM current_sem'
  }

  var current_sem = "";
  var current_year = 0;

  client.query(query , (err,res1) => {
    if (err) { 
      console.log(err.stack)
    } 
    else {
        current_sem = res1.rows[0].semester;
        current_year = res1.rows[0].year;
    }
  })

  res.json({
    tokenStatus : 1,
    sem : current_sem,
    year : current_year,
    name : req.user.userName
  })

})



export default router;