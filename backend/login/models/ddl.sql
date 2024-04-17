create table if not exists student (
	id varchar(20) primary key,
	name varchar(20) NOT NULL,
	department varchar(10) NOT NULL 
);
	
create table if not exists instructor (
	id varchar(20) primary key,
	name varchar(20) NOT NULL,
	department varchar(10) NOT NULL
);
	
create table if not exists past_courses (
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	instructor_id varchar(20) ,
	prerequisites varchar(50),
	max_capacity integer,
	primary key (course_id,semester,year),
	foriegn key (instructor_id) references instructor on delete cascade
);

create table if not exists present_courses (
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
	foriegn key (instructor_id) references instructor on delete cascade
);

create table if not exists student_courses(
	course_id varchar(10),
	semester varchar(10),
	year integer,
	name varchar(30) NOT NULL,
	credits integer default 0,
	student_id varchar(20),
	grade char ,
	feedback varchar(200) ,
	primary key (course_id,semester,year,student_id),
	foreign key (student_id) references student on delete cascade,
	foreign key (course_id,semester,year) references past_courses on delete cascade,
	foreign key (course_id,semester,year) references present_courses on delete cascade,
);

create table if not exists proposed_courses(
	course_id varchar(10),
	name varchar(30) NOT NULL,
	credits integer NOT NULL,
	prerequisites varchar(50),
	primary key (course_id)
);

create table if not exists selected_courses (
	course_id varchar(10),
	teacher_id varchar(20)
);

create table if not exists timeline (
	course_selection integer default 0,
	course_reg integer default 0,
	course_feedback integer default 0,
	course_gradeing integer default 0,
);