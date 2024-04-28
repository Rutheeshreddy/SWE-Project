import express from 'express';
import client from '../config/database.js'
import authenticateToken from './Authenticate.js';

const router = express.Router();

router.post('/available-courses/:num',authenticateToken, async (req,res) => {

    var num_courses = 0;
    var per_page = 3;
    var instructor_id = req.user.userName;
    var dept = (instructor_id.split('.')[1]).split('@')[0] ;
    const filters = req.body.filters;
    // rajesh.cs@iith.ac.in
    try {
        const query = {
        name: 'get-num-of-courses',
        text: ' select count(*) as cnt from (select * from proposed_courses where ' + 
        ' course_id like $1 ) as A where A.name like $3 and A.course_id like $4 and  ' +
        ' A.course_id not in  (select B.course_id from selected_teacher as B ' + 
        ' where B.teacher_id = $2  and B.teacher_selected = 1 ) ;',
        values: [`%${dept}%`,req.user.userName,
        `%${filters.courseName}%`,`%${filters.courseId}%`]
        }
        const res1 = await client.query(query);
        num_courses = res1.rows[0].cnt;
    }
    catch(err) {
        console.log(err.stack);
        return res.json({   // check if there is a error fetching
          tokenStatus:1,
          status:0
        })
    }
    if(num_courses == 0) 
    {
        return res.json({
          status : 1,
          totPages : 0,
          courses : []
        })
    }
    var num_pages = Math.ceil(num_courses / per_page );
  
    // If page number is greater than max_number of pages
    if(req.params.num > num_pages) {
      return res.json({ 
        tokenStatus:1,
        status : -1 ,
         totPages : num_pages 
        });
    }
  
    var offset = per_page *(req.params.num-1);
    try {
        const query = {
        name: 'get-current-page-courses',
        text:  ' select * from (select * from proposed_courses where ' + 
        ' course_id like $3 ) as A where A.name like $6 and A.course_id like $5 and  ' +
        ' A.course_id not in  (select B.course_id from selected_teacher as B ' + 
        ' where B.teacher_id = $4  and B.teacher_selected = 1 ) limit $2 offset $1 ;',
        values : [offset,per_page,`%${dept}%`,req.user.userName,
      `%${filters.courseId}%`,`%${filters.courseName}%`]
        }
        const res1 = await client.query(query);
        return res.json({
          tokenStatus:1,
           status : 1, 
           courses : res1.rows , 
           totPages : num_pages
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

  export default router 