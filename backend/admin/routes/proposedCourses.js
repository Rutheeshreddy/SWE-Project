import authenticateToken from "./Authenticate.js";
import express from 'express';
import client from '../config/database.js'
import {getTeacherName,getSem} from "./getTeacherName.js";

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

        const query2 = {
          name: 'add-empty-slot',
          text: 'insert into selected_slot(course_id,slot,slot_selected) '+
          ' values ($1,$2,$3) ;',
          values : [req.body.course_id,'',0]
        }
        const res2 = await client.query(query2);

        return res.json({message : 1});
      }
      catch(err) {
        console.log(err.stack);
        return res.json({message : -1});
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

        const query2 = {
          name: 'admin-removes-course-from',
          text: 'delete from present_courses where course_id = $1 ;',
          values : [req.body.course_id]
        }
        const res2 = await client.query(query2);

        return res.json({message : res1.rowCount});
      }
      catch(err) {
        console.log(err.stack);
      }
  
})

router.get('/added-course-details/:id',authenticateToken, async(req,res) => {
  var course_selection = 0;
  try {
    const query = {
      name: 'get-selection-period',
      text: 'select * from timeline'
    }
    const res1 = await client.query(query);
    course_selection = res1.course_selection;
  }
  catch(err) {
    console.log(err.stack);
  }
  if(course_selection == 0) return res.json({period : 0});
  else 
  {
    try {
      const query = {
        name: 'get-teachers',
        text: 'select * from selected_teacher where course_id = $1 ;',
        values: [req.params.id]        
      }
      const res1 = await client.query(query);
      var selected_teacher = {id : "", name : ""};
      var teachers = []
      for (var i=0;i<res1.rowCount;i++)
      {
          if(res1.rows[i].teacher_selected == 1) 
          {
              selected_teacher.id = res1.rows[i].teacher_id;
              selected_teacher.name = await getTeacherName(res1.rows[i].teacher_id);
          }

          teachers.push({
            id : res1.rows[i].teacher_id,
            name : await getTeacherName(res1.rows[i].teacher_id)
          });

      }
      const query2 = {
        name: 'get-slot',
        text: 'select * from selected_slot where course_id = $1 ;',
        values: [req.params.id]        
      }
      const res2 = await client.query(query2);
      var slot = '';
      if(res2.rowCount > 0 && res2.rows[0].slot_selected == 1) slot = res2.rows[0].slot ;

      return res.json({ 
        period : 1, 
        selected_teacher : selected_teacher, 
        teachers: teachers , 
        slot : slot
      });
    }
    catch(err) {
      console.log(err.stack);
    }
  }

} )

router.post('/update-course', authenticateToken, async (req,res) => {

  try {
    
      const query = {
        name: 'admin-updates-course',
        text: 'update proposed_courses set course_id = $2, name = $3, credits = $4,' +
              ' prerequisites = $5 where course_id = $1 ; ',
        values : [req.body.course_id_prev,req.body.course_id,req.body.name,
                  req.body.credits,req.body.prereq ]
      }
      const res1 = await client.query(query);


      const query2 = {
        name: 'set-teacher_selected=0',
        text: 'update selected_teacher set teacher_selected = 0 where course_id = $1 ; ',
        values : [ req.body.course_id  ]
      }
      const res2 = await client.query(query2);

      const query3 = {
        name: 'admin-updates-selected-teacher',
        text: 'update selected_teacher set teacher_selected = 1 where course_id = $1 and  '+ 
            ' teacher_id = $2 ',
        values : [ req.body.course_id, req.body.teacher_id  ]
      }
      const res3 = await client.query(query3);

      var slot_selected = 0;
      if(req.body.slot == '') slot_selected = 0;
      else slot_selected = 1;

      const query4 = {
        name: 'admin-updates-course-slot',
        text: 'update selected_slot set slot = $2 , slot_selected = $3 where course_id = $1 ',
        values : [ req.body.course_id, req.body.slot,slot_selected  ]
      }
      const res4 = await client.query(query4);

      if(req.body.teacher_id != null) {
        const query6 = {
          name: 'get',
          text: 'select count(*) as cnt from present_courses where course_id = $1 ',
          values : [ req.body.course_id]
        }
        const res6 = await client.query(query6);
        if(res6.rows[0].cnt == 0) {
        var {sem,year} = await getSem()
        const query5 = {
          name: 'admin-inserts-course-into-present-courses',
          text: 'insert into present_courses values ($1,$2,$3,$4,$5,$6,$7,$8,$9,100,0) ',
          values : [ req.body.course_id,sem,year,req.body.name,req.body.credits,
            req.body.teacher_id,req.body.teacher_name,req.body.prereq,req.body.slot]
        }
        const res5 = await client.query(query5);
    }
    else {
      const query7 = {
        name: 'admin-updates-course-into-present-courses',
        text: 'update present_courses set course_id = $1, sem = $2, year = $3, name = $4, credits =$5,' +
        'prereq = $6, instructor_id = $7, instructor_name = $8, slot = $9 where course_id = $10 ',
        values : [ req.body.course_id,sem,year,req.body.name,req.body.credits,
          req.body.teacher_id,req.body.teacher_name,req.body.prereq,req.body.slot, 
        req.body.course_id_prev]
      }
      const res5 = await client.query(query6);
    }
    }
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
    if(req.params.num > num_pages) return res.json({ message : -1 , totPages : num_pages });
    var offset = per_page *(req.params.num-1);
    try {
        const query = {
        name: 'get-current-page-courses',
        text: 'select * from proposed_courses order by course_id limit $2 offset $1 ;',
        values : [offset,per_page]
        }
        const res1 = await client.query(query);
        return res.json({ message : 1, courses : res1.rows , totPages : num_pages});
    }
    catch(err) {
        console.log(err.stack);
    }
})

export default router;