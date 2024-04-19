drop table if exists login
create table  login ( 
	username varchar (30) primary key,
	password varchar(30) NOT NULL,
	role varchar(15) NOT NULL ) ; 

drop table if exists student
create table  student (
	id varchar(20) primary key,
	name varchar(20) NOT NULL,
	department varchar(10) NOT NULL 
);

drop table if exists instructor
create table  instructor (
	id varchar(20) primary key,
	name varchar(20) NOT NULL,
	department varchar(10) NOT NULL
);
	
drop table if exists past_courses
create table  past_courses (
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(20) ,
	prerequisites varchar(50),
	max_capacity integer,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor on delete cascade
);

drop table if exists present_courses
create table  present_courses (
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(20) ,
	prerequisites varchar(50),
	slot char,
	max_capacity integer,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor on delete cascade
);

drop table if exists student_courses
create table  student_courses(
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	student_id varchar(20),
	grade varchar(5) ,
	feedback varchar(200) ,
	primary key (course_id,semester,year,student_id),
	foreign key (student_id) references student on delete cascade,
	foreign key (course_id,semester,year) references past_courses on delete cascade,
	foreign key (course_id,semester,year) references present_courses on delete cascade
);

drop table if exists proposed_courses
create table  proposed_courses(
	course_id varchar(10),
	name varchar(30) NOT NULL,
	credits integer NOT NULL,
	prerequisites varchar(50),
	primary key (course_id)
);

drop table if exists selected_courses
create table  selected_courses (
	course_id varchar(10),
	teacher_id varchar(20)
);

drop table if exists timeline
create table  timeline (
	course_selection integer default 0,
	course_reg integer default 0,
	course_feedback integer default 0,
	course_gradeing integer default 0
);