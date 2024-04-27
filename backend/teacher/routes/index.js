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
        // console.log("token confirmed")
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
  let res1, res2;
  // getting teacher details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'get-teacher-name',
      text: ' select * from instructor where id = $1  ',
      values: [req.user.userName]
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
   
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
  // getting the courses he teaches for in this semester
  try {
    const query2 = {
      name: 'get-teaching-courses',
      text: ' select * from present_courses  '+
            "WHERE instructor_id = $1",
      values: [req.user.userName]
    }

    res2 = await client.query(query2);
    // console.log(res3)

    return res.json({

      tokenStatus:1,
      status:1,
      details : res1.rows[0],
      courses : res2.rows

    })
   
  }
  catch(err) {
    console.log(err.stack);
    return res.json({
      tokenStatus:1,
      status:0
    })
  }
})

router.get('/get-timelines',authenticateToken,async (req,res) => 
{
  let res1;
  // getting timeline details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'get-timeline-details',
      text: ' select * from timeline  '
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
    return res.json({

      tokenStatus:1,
      status:1,
      grade : res1.rows[0].course_grading,
      selection : res1.rows[0].course_selection,
      prev_period : res1.rows[0].prev_period

    })
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
   
})

router.post('/give-grade',authenticateToken,async (req,res) => 
{
  let res1;
  // getting timeline details
  try {
    // console.log(req.user)
    const query1 = {
      name: 'give-grade',
      text: ' update student_courses_present set grade = $1 where course_id = $2 and student_id = $3',
      values: [req.body.grade, req.body.course_id, req.body.student_id]
    }
    res1 = await client.query(query1);
    // console.log(res1.rows)
    return res.json({

      tokenStatus:1,
      status:1
    })
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }
   
})

router.get('/taught-courses/:instructor_id',authenticateToken,async (req,res) => 
{

  let res1;
  // getting sem details
  try {
    const query1 = {
      name: 'get-sem-details',
      text: ' select * from past_courses where instructor_id = $1 order by (semester,year)  ',
      values: [req.params.instructor_id]
    }
    res1 = await client.query(query1);
  }
  catch(err) {
    console.log(err.stack);
    return res.json({   // check if there is a error fetching
      tokenStatus:1,
      status:0
    })
  }

    if(res1.rowCount == 0) {
      return res.json({

        tokenStatus:1,
        status:1,
        courses : res1.rows,

      })
  }
    var cur_sem =res1.rows[0].semester;
    var cur_year = res1.rows[0].year;
     var output = [];
     var courses = [];
     for (var i=0;i<res1.rowCount;i++) {
      if(res1.rows[i].semester == cur_sem  &&
        res1.rows[i].year == cur_year ) {
          courses.push(res1.rows[i]);
        }
        else {
          output.push({sem : cur_sem , year : cur_year, courses : courses });
          courses = [];
          courses.push(res1.rows[i]);
          cur_sem = res1.rows[i].semester;
          cur_year = res1.rows[i].year;
        }
     }
    //  courses.push(res1.rows[res1.rowCount-1]);
     output.push({sem : cur_sem , year : cur_year, courses : courses });

     return res.json({
      tokenStatus:1,
      status:1,
      courses : output
     })

   
})

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

router.get('/present-course-details/:course_id/:num',authenticateToken, async (req,res) => {

  var num_students = 0;
  var per_page = 3;
  try {
      const query = {
      name: 'get-num-of-students',
      text: 'select count(*) as cnt from student_courses_present where course_id = $1 ;',
      values: [req.params.course_id]
      }
      const res1 = await client.query(query);
      num_students = res1.rows[0].cnt;
  }
  catch(err) {
      console.log(err.stack);
      return res.json({   // check if there is a error fetching
        tokenStatus:1,
        status:0
      })
  }

  if(num_students == 0)
  {
    return res.json({
      status : -2
    });
  }

  var num_pages = Math.ceil(num_students / per_page );

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
      name: 'get-current-page-students',
      text: 'select B.name,B.id,A.grade from ' +
      ' student_courses_present as A , student as B where ' + 
      ' A.student_id = B.id and course_id = $3 order by student_id limit $2 offset $1 ;',
      values : [offset,per_page,req.params.course_id]
      }
      const res1 = await client.query(query);
      
      return res.json({
        tokenStatus:1,
         status : 1, 
         students : res1.rows , 
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

router.post('/register-courses',authenticateToken,async (req,res) => 
{
  
    // removing all courses the student already registered for
    
    try {
        const query = {
        name: 'delete-teacher-courses',
        text: 'delete from selected_teacher WHERE teacher_id = $1',
        values: [req.user.userName]
        }
        const res1 = await client.query(query);
  
    }
    catch(err) {
        console.log(err.stack);
        res.json({
          status:0,
        })
    }
    let sem,year  
    // getting the present year and semester
            try {
                const query1 = {
                name: 'get-present-year',
                text: ' select * from current_sem  ',
                values: []
                }
              const res2 = await client.query(query1); 
              sem = res2.rows[0].semester
              year = res2.rows[0].year  
            }
            catch(err) {
                console.log(err.stack);
                res.json({
                tokenStatus:1,
                status:0
                })
            }
    // adding the new list of courses
    let carr = req.body.regCourses
    // console.log(carr);
    for(let i = 0;i<carr.length;i++)
    {   
        try {
                const query = {
                name: 'send-request-to-teach',
                text: 'insert into selected_teacher(course_id,teacher_id,teacher_selected) VALUES ($1,$2,0) ;',
                values: [carr[i].course_id,req.user.userName]
                }
                const res1 = await client.query(query);
        
            }
            catch(err) {
                console.log(err.stack);
                return res.json({
                status:0,
                })
            }
  }

  return res.json({
    status:1
  })
   
})


export default router;