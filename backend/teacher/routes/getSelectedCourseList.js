import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.get('/selected-courses',authenticateToken, async (req,res) => {

 
    try {
        const query = {
        name: 'get-current-page-selected-courses',
        text: 'select * from proposed_courses where course_id in ' + 
            ' ( select course_id from selected_teacher where teacher_id = $1 and teacher_selected = 0) ' +
            '  order by course_id;',
        values : [req.user.userName]
        }
        const res1 = await client.query(query);
        return res.json({
          tokenStatus:1,
           status : 1, 
           courses : res1.rows , 
          });
    }
    catch(err) {
        console.log(err.stack);
        return res.json({   // check if there is a error fetching
          tokenStatus:1,
          status:0
        })
    }
  })

  export default router ;