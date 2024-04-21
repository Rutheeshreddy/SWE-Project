import client from '../config/database.js';
import fs from "fs";

const ddlQuery = fs.readFileSync('ddl.sql', 'utf8');

client.query(ddlQuery, function (err, result) {
if (err) throw err;

});

const ddlQuery2 = fs.readFileSync('data.sql', 'utf8');

client.query(ddlQuery2, function (err, result) {
if (err) throw err;

});