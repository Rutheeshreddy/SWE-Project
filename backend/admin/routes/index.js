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
  
router.get('/verify',authenticateToken, async (req,res) => 
{

    var current_sem = "";
    var current_year = 0;
    var current_period = "";
  
    try {
      const query = {
        name: 'get-sem-details',
        text: 'SELECT * FROM current_sem ;'
      }
      const res1 = await client.query(query);
      current_sem = res1.rows[0].semester;
      current_year = res1.rows[0].year;
    }
    catch(err) {
      console.log(err.stack);
    }
  
    try {
      const query = {
        name: 'get-period-details',
        text: 'SELECT * FROM timeline ;'
      }
      const res1 = await client.query(query);
      if(res1.rows[0].course_selection == 1) current_period = 'course_selection';
      if(res1.rows[0].course_reg == 1) current_period = 'course_reg';
      if(res1.rows[0].course_feedback == 1) current_period = 'course_feedback';
      if(res1.rows[0].course_grading == 1) current_period = 'course_grading';
  
    }
    catch(err) {
      console.log(err.stack);
    }
    
    res.json({
      tokenStatus : 1,
      sem : current_sem,
      year : current_year,
      name : req.user.userName.split('@')[0],
      period : current_period
    })
  
  
})
  
router.post('/add-course', authenticateToken, async (req,res) => {

    try {
        const query = {
          name: 'admin-adds-course',
          text: 'insert into proposed_courses(course_id,name,credits,prerequisites) '+
          ' values ($1,$2,$3,$4) ;',
          values : [req.body.course_id,req.body.name,req.body.credits,req.body.prereq]
        }
        const res1 = await client.query(query);
      }
      catch(err) {
        console.log(err.stack);
      }
  
})

router.post('/remove-course', authenticateToken, async (req,res) => {

    try {
        const query = {
          name: 'admin-removes-course',
          text: 'delete from proposed_courses where course_id = $1 ;',
          values : [req.body.course_id]
        }
        const res1 = await client.query(query);
      }
      catch(err) {
        console.log(err.stack);
      }
  
})

router.post('/update-course', authenticateToken, async (req,res) => {

    try {
        const query = {
          name: 'admin-updates-course',
          text: 'update proposed_courses set course_id = $2, name = $2, credits = $3,' +
                ' prerequisites = $5 where course_id = $1 ;',
          values : [req.body.course_id_prev,req.body.course_id,req.body.name,
                    req.body.credits,req.body.prereq ]
        }
        const res1 = await client.query(query);
      }
      catch(err) {
        console.log(err.stack);
      }
  
})

router.get('/proposed-courses/:num',authenticateToken, async (req,res) => {

    var num_courses = 0;
    var per_page = 3;
    try {
        const query = {
        name: 'get-num-of-courses',
        text: 'select count(*) as cnt from proposed_courses ;'
        }
        const res1 = await client.query(query);
        num_courses = res1.rows[0].cnt;
    }
    catch(err) {
        console.log(err.stack);
    }

    var num_pages = Math.ceil(num_courses / per_page );
    if(req.params.num > num_pages) res.json({ message : -1 });
    var offset = per_page *(req.params.num-1)
    try {
        const query = {
        name: 'get-current-page-courses',
        text: 'select * from proposed_courses order by course_id limit 10 offset $1 ;',
        values : [offset]
        }
        const res1 = await client.query(query);
        res.json({ courses : res1.rows})
    }
    catch(err) {
        console.log(err.stack);
    }
})

router.post('/course-selection/start',authenticateToken, async (req,res) => {

    var course_selection = 0;
    var course_reg = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
        course_reg = res1.roes[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_reg == 0) {
        // start the course-selection period
        if(course_selection == 0) {
            try {
                const query = {
                name: 'start course selection',
                text: 'update timeline set course_selection = 1 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            res.json({message : 1});
        }
        // course-selection period is already active
        else if (course_selection == 1)
        {
            res.json({message : -1}); 
        }
    }
    // course-registrtaion is active, so new courses can not be added
    else res.json({message : -2}); 
})

router.post('/course-selection/stop',authenticateToken, async (req,res) => {
  
    var course_selection = 0;
    var course_reg = 0;
    try {
        const query = {
        name: 'check if we can start course selection',
        text: 'select * from timeline ;'
        }
        const res1 = await client.query(query);
        course_selection = res1.rows[0].course_selection ;
        course_reg = res1.roes[0].course_reg ;
    }
    catch(err) {
        console.log(err.stack);
    }
    if(course_selection == 1) {
        var num_prop_courses = 0;
        var num_selected_courses = 0;
        try {
        const query = {
            name: 'get-number-of-proposed-courses',
            text: 'select count(*) as cnt from  proposed_courses;'
        }
        const res1 = await client.query(query);
        num_prop_courses = res1.rows[0].cnt;
        }
        catch(err) {
        console.log(err.stack);
        }
    
        try {
        const query = {
            name: 'get-number-of-selected-courses',
            text: 'select count(*) as cnt from selected_courses ' +
            'where teacher_selected = 1 and slot_selected = 1;'
        }
        const res1 = await client.query(query);
        num_selected_courses = res1.rows[0].cnt;
    
        if(num_prop_courses == num_selected_courses) {
            try {
                const query = {
                name: 'stop-course-selection',
                text: 'update timeline set course_selection = 0 ;'
                }
                const res1 = await client.query(query);
            }
            catch(err) {
                console.log(err.stack);
            }
            res.json({
            message : 1
            });
        }
        else {
            try {
            const query = {
                name: 'get-pending-courses',
                text: 'select course_id  from proposed_courses as A where ' +
                '(select count(*) from selected_courses as B where' + 
                'A.course_id = B.course_id and B.teacher_selected = 1 and slot_selected = 1 ) == 0 ;'
            }
            const res1 = await client.query(query);
    
            res.json({
                message : -1,
                courses : res1.rows
            })
            }
            catch(err) {
            console.log(err.stack);
            }
        }
        }
        catch(err) {
        console.log(err.stack);
        }
    }
  
  })
  
  export default router;