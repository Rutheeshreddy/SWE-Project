import express from 'express';
import client from '../config/database.js'

const router = express.Router();

async function getTeacherName(teacher_id) {

    try {
        const query = {
          name: 'get-teacher-name',
          text: ' select * from instructor where id = $1',
          values: [teacher_id]
        }
        const res1 = await client.query(query);
        return res1.rows[0].name;
      }
      catch(err) {
        console.log(err.stack);
      }
}

export default getTeacherName;