import client from '../config/database.js'
import {getSem} from './getTeacherName.js'

export async function calculateGpa(course_id) {
    try {
        const query = {
          name: 'get-student-details',
          text: ' select grade from student_courses_present where course_id = $1',
          values: [course_id]
        }
        const res1 = await client.query(query);
        const grades =  res1.rows;
        const map = { 'A+' : 10 , 'A' : 10, 'A-' : 9, 'B' : 8, 'B-' : 7, 'C' : 6, 'C-' : 5 , 'D' : 4 , 'F' : 0}
        var total = 0;
        for (var i=0;i<grades.length;i++) total += map[res1.rows[i].grade] ;
        total = total / grades.length
      }
      catch(err) {
        console.log(err.stack);
      }
}

export async function calculateRating(course_id) {
  try {
      const sem = await getSem()
      const query = {
        name: 'get-course-rating',
        text: ' select avg(ir1) as r1 , avg(ir2) as r2 , avg(ir3) as r3 from ' + 
        ' feedback where course_id = $1 and semester = $2 and year = $3 ;',
        values: [course_id,sem.sem,sem.year]
      }
      const res1 = await client.query(query);
      return  { r1 : res1.rows[0].r1, r2 : res1.rows[0].r2, r3 : res1.rows[0].r3 }
    }
    catch(err) {
      console.log(err.stack);
    }
}
