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

// Authentication Routes
router.post('/login', async (req, res) => {
  
  const query = {
    name: 'fetch-user',
    text: 'SELECT * FROM login WHERE username = $1',
    values: [req.body.userName],
  }

  client.query(query, (err, resl) => {
    if (err) { 
      console.log(err.stack)
    } 
    else 
    {
      
      if(resl.rows.length == 0)
      {
    res.json({ logRes: -1 }); // if there is no user with given username the return -1
      }
    else 
     {  
    if (resl.rows[0].password == req.body.password) {

      jwt.sign({
        userName: resl.rows[0].username,
        userid:resl.rows[0].id
      }, process.env.SECRET_KEY, (err, token) => {
        if (err) { console.log(err); }
        res.json(
          {
          userid:resl.rows[0].id,
          token: token,
          logRes: 1,
          role : resl.rows[0].role
          })
      })
    }

     else 
      {
      res.json({ logRes: -2 }); // If password is incorrect -2 is returned
       }
    }
  }
})
});


export default router;