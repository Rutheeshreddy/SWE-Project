import pg from "pg"
import dotenv from 'dotenv'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'../.env' });
const { Client } = pg
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPWD,
  port: process.env.PGPORT,
})
client.connect((err)=>
{
  if(err) throw err
  else console.log('connected to database')
})

export default client;