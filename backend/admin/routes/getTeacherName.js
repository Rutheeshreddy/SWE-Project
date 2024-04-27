import express from 'express';
import client from '../config/database.js'

const router = express.Router();

export async function getTeacherName(teacher_id) {

    try {
        const query = {
          name: 'get-teacher-name',
          text: ' select * from instructor where id = $1',
          values: [teacher_id]
        }
        const res1 = await client.query(query);
        const name =  res1.rows[0].name;
        return name;
      }
      catch(err) {
        console.log(err.stack);
      }
}

export async function getSem() {

  try {
      const query = {
        name: 'get-sem-details',
        text: ' select * from current_sem'
      }
      const res1 = await client.query(query);
      return {
        sem : res1.rows[0].semester,
        year : res1.rows[0].year
      }
    }
    catch(err) {
      console.log(err.stack);
    }
}

// export default getTeacherName,getSem;