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

router.get('available-courses/:pagenum',authenticateToken,(req,res)=>
{
  
})



export default router;