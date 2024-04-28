import client from '../config/database.js'

export async function calculateGpa(course_id) {
    try {
        const query = {
          name: 'get-student-details',
          text: ' select grade from student_courses_present where course_id = $1',
          values: [teacher_id]
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

