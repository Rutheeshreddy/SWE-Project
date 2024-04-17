import client from '../config/database.js';

var sql1 = " create table if not exists login (" + 
  " username varchar (30) primary key," +
  " password varchar(30) NOT NULL," +
  " role varchar(15) NOT NULL ) ;  "

client.query(sql1, function (err, result) {
if (err) throw err;

});

var sql2 = " insert into login(username,password,role) values " +
" ('cs21btech234@iith.ac.in','12345','student') , " +
" ('vimal.ch@iith.ac.in','12345','instructor') , " +
" ('admin3@iith.ac.in','admin','admin') ; "

client.query(sql2 , function (err, result) {
if (err) throw err;

});