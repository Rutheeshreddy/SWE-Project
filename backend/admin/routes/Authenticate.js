import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'../.env' });

function authenticateToken(req, res, next) {
    const bearer = req.headers['authorization'];
    const token = bearer && bearer.split(' ')[1];
    if (token == null) {
      console.log("token not confirmed ",token)
      return res.json({ tokenStatus: 0 });
      
    }
    else {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          console.log("token is invalid")
          return res.json({ tokenStatus: 0 });
        }
        else {
          req.user=user
          next();
        }
      })
    }
  
  };

export default authenticateToken;