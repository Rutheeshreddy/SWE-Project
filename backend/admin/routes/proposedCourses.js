import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'

const router = express.Router();

router.post('/add-course', authenticateToken, async (req,res) => {

    try {
        const query = {
          name: 'admin-adds-course',
          text: 'insert into proposed_courses(course_id,name,credits,prerequisites) '+
          ' values ($1,$2,$3,$4) ;',
          values : [req.body.course_id,req.body.name,req.body.credits,req.body.prereq]
        }
        const res1 = await client.query(query);
        res.json({message : 1});
      }
      catch(err) {
        console.log(err.stack);
        res.json({message : -1});
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
        res.json({message : res1.rowCount});
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
    if(req.params.num > num_pages) res.json({ message : -1 , totPages : num_pages });
    var offset = per_page *(req.params.num-1);
    try {
        const query = {
        name: 'get-current-page-courses',
        text: 'select * from proposed_courses order by course_id limit $2 offset $1 ;',
        values : [offset,per_page]
        }
        const res1 = await client.query(query);
        res.json({ message : 1, courses : res1.rows , totPages : num_pages});
    }
    catch(err) {
        console.log(err.stack);
    }
})

export default router;