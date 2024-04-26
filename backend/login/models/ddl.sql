DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

create table  login ( 
	username varchar (30) primary key,
	password varchar(30) NOT NULL,
	role varchar(15) NOT NULL ) ; 

create table  student (
	id varchar(30) primary key,
	name varchar(30) NOT NULL,
	department varchar(10) NOT NULL,
	joining_year integer NOT NULL 
);

create table  instructor (
	id varchar(30) primary key,
	name varchar(30) NOT NULL,
	department varchar(10) NOT NULL
);
	
create table  past_courses (
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(30) ,
	prerequisites varchar(50),
	max_capacity integer,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor on delete cascade
);

create table  present_courses (
	course_id varchar(10),
	course_name varchar(30)
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(30),
	instructor_name varchar(50),
	prerequisites varchar(50),
	slot char,
	max_capacity integer,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor on delete cascade
);

create table  student_courses_past(
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	elective varchar(20),
	student_id varchar(30),
	grade varchar(5) ,
	feedback varchar(200) ,
	primary key (course_id,semester,year,student_id),
	foreign key (student_id) references student on delete cascade,
	foreign key (course_id,semester,year) references past_courses on delete cascade
);

create table  student_courses_present(
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	elective varchar(20),
	student_id varchar(30),
	grade varchar(5) ,
	feedback varchar(200) ,
	primary key (course_id,semester,year,student_id),
	foreign key (student_id) references student on delete cascade,
	foreign key (course_id,semester,year) references present_courses on delete cascade
);

create table  proposed_courses(
	course_id varchar(10),
	name varchar(30) NOT NULL,
	credits integer NOT NULL,
	prerequisites varchar(50),
	primary key (course_id)
);

create table  selected_courses (
	course_id varchar(10),
	teacher_id varchar(30),
	slot char,
	teacher_selected integer DEFAULT 0,
	slot_selected integer DEFAULT 0,
	primary key (course_id,teacher_id),
	foreign key (course_id) references proposed_courses on delete cascade
);

create table  timeline (
	course_selection integer default 0,
	course_reg integer default 0,
	course_feedback integer default 0,
	course_grading integer default 0
);

create table current_sem (
	semester varchar(10),
	year integer 
);