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
	name varchar(30) NOT NULL ,
	credits integer default 0 ,
	instructor_id varchar(30) ,
	prerequisites varchar(50),
	avg_gpa FLOAT,
	rating_1 FLOAT,
	rating_2 FLOAT,
	rating_3 FLOAT,
	max_capacity integer,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor(id) on delete cascade 
			on update cascade
);

create table  present_courses (
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(30),
	instructor_name varchar(50),
	prerequisites varchar(50),
	slot char,
	max_capacity integer default 100,
	count integer default 0,
	primary key (course_id,semester,year),
	foreign key (instructor_id) references instructor(id) on delete cascade 
					on update cascade
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
	foreign key (student_id) references student(id) on delete cascade,
	foreign key (course_id,semester,year) references past_courses(course_id,semester,year)
		 on delete cascade on update cascade
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
	feedback boolean default false ,
	primary key (course_id,semester,year,student_id),
	foreign key (student_id) references student on delete cascade,
	foreign key (course_id,semester,year) references present_courses(course_id,semester,year)
		 on delete cascade on update cascade
);

create table  proposed_courses(
	course_id varchar(10),
	name varchar(30) NOT NULL,
	credits integer NOT NULL,
	prerequisites varchar(50),
	primary key (course_id)
);

create table  selected_teacher (
	course_id varchar(10),
	teacher_id varchar(30),
	teacher_selected integer DEFAULT 0,
	primary key (course_id,teacher_id),
	foreign key (course_id) references proposed_courses(course_id)
		 on delete cascade on update cascade
);

create table  selected_slot (
	course_id varchar(10),
	slot char,
	slot_selected integer DEFAULT 0,
	primary key (course_id),
	foreign key (course_id) references proposed_courses(course_id)
		 on delete cascade on update cascade
);

create table  timeline (
	course_selection integer default 0,
	course_reg integer default 0,
	course_feedback integer default 0,
	course_grading integer default 0,
	prev_period integer default 0,
	primary key (course_selection)
);

create table current_sem (
	semester varchar(10),
	year integer 
);

create table feedback (
	id SERIAL primary key,
	course_id VARCHAR(10),
	semester varchar(10),
	year integer, 
	iq1 integer, iq2 integer, iq3 integer, iq4 integer,
	cq1 integer, cq2 integer, cq3 integer, cq4 integer,
	cr1 integer, cr2 integer, cr3 integer,
	ir1 integer,ir2 integer,ir3 integer,
	cf varchar(200), 
	if varchar(200) 
);