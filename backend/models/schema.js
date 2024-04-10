import client from '../config/database.js';

  var sql1="create table if not exists users ("+
  " id serial primary key, "+
  " username varchar (40),"+
  " password varchar(30),"+
  " display_name varchar(255) "+
  " )";

client.query(sql1, function (err, result) {
if (err) throw err;

});
  var sql="CREATE TABLE if not exists user_info ( "+
  "id integer, "+
  "email varchar(40), "+
  "account_id INTEGER, "+
  "reputation INTEGER NOT NULL, "+
  "views INTEGER DEFAULT 0, "+
  "down_votes INTEGER DEFAULT 0, "+
  "up_votes INTEGER DEFAULT 0, "+
  "display_name VARCHAR(255) NOT NULL, "+
  "location VARCHAR(512), "+
  "profile_image_url VARCHAR(255), "+
  "website_url VARCHAR(255), "+
  "about_me TEXT, "+
  "creation_date TIMESTAMP NOT NULL, "+
  "last_access_date TIMESTAMP NOT NULL, "+
  "primary key (id), "+
  "foreign key (id) references users (id) on delete cascade "+
  ");";

 client.query(sql, function (err, result) {
      if (err) console.error(err);
    });

var sqll2="CREATE table if not exists tags ( "+
	" id SERIAL PRIMARY KEY, "+
	" tag_name VARCHAR(255) NOT NULL "+
  " );"
  client.query(sqll2, function (err, result) {
    if (err) console.error(err);
  });

var sqll3="create table if not exists posts( "+
  "id serial primary key, "+
  "Owner_id integer, "+
  "OwnerName varchar(255), "+
  "Title varchar(255), "+
  "tags varchar(255), "+
  "body text, "+
  "creation_date timestamp, "+
  "last_modified timestamp, "+
  "AnswerCount integer default 0, "+
  "down_votes INTEGER DEFAULT 0, "+
  "up_votes INTEGER DEFAULT 0, "+
  "foreign key (Owner_id) references users(id) "+
  ");"
  client.query(sqll3, function (err, result) {
    if (err) console.error(err);
  });

var sql3="create table if not exists answers( "+
  " id serial primary key, "+
  " post_id integer, "+
  " answeredby_id integer, "+
  "body text, "+
  "creation_date TIMESTAMP, "+
  "last_edited TIMESTAMP, "+
  "down_votes INTEGER DEFAULT 0, "+
  "up_votes INTEGER DEFAULT 0, "+
  "ownername varchar(40), "+
  "foreign key (answeredby_id) references users(id), "+
  "foreign key (post_id) references posts(id) "+
  ");"
  
  client.query(sql3, function (err, result) {
    if (err) console.error(err);
    else{
     console.log("completed sql3")
     }
  });

var sql4="create table if not exists post_upvotes(userid integer not null, postid integer not null, status integer default 0, primary key (userid,postid), foreign key (userid) references users(id), foreign key (postid) references posts(id));"
client.query(sql4, function (err, result) {
  if (err) console.error(err);
  else{
    console.log("completed sql4")
    }
});
var sql5="create table if not exists answer_upvotes(userid integer not null, answerid integer not null, status integer default 0, primary key (userid,answerid), foreign key (userid) references users(id), foreign key (answerid) references answers(id));"
client.query(sql5, function (err, result) {
  if (err) console.error(err);
  else{
    console.log("completed sql5")
   }
});
var index1="create index if not exists username on users(username); create index if not exists postid on posts(id); create index if not exists answers on answers(id)";
client.query(index1, function (err, result) {
  if (err) console.error(err.stack);
  else{
    console.log("completed index1")
   }
});
var index2="create index if not exists userid on users(id); create index if not exists questionid on answers(post_id); create index if not exists answerid on answers(id)";
client.query(index2, function (err, result) {
  if (err) console.error(err.stack);
  else{
    console.log("completed index2  index2 ayyindi")
    client.end();
   }
});