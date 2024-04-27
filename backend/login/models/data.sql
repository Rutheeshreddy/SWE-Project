insert into login (username,password,role) values
    ('raja','123','admin'),
	('raja1','123','student'),
	('raja2','123','teacher'),
	('cs21btech234@iith.ac.in','12345','student') ,
    ('ee21btech123@iith.ac.in','12345','student'),
    ('raja123','123','student'),
    ('rajesh.cs@iith.ac.in','12345','teacher'),
    ('suresh.cs@iith.ac.in','12345','teacher'),
	('ram.cs@iith.ac.in','12345','teacher'),
	('ravi.ee@iith.ac.in','12345','teacher'),
	('pavan.ai@iith.ac.in','12345','teacher'),
    ('admin2@iith.ac.in','admin','admin') ,
    ('admin3@iith.ac.in','admin','admin') ;

insert into current_sem(semester,year) values 
    ('Odd',2024) ;

insert into timeline(course_selection,course_reg,course_feedback,course_grading,prev_period) values 
    (0,0,0,0,0) ;

INSERT INTO instructor(
	id, name, department)
	VALUES 
	('raja1','raja1','cs'),
	('rajesh.cs@iith.ac.in','rajesh','cs'),
	('suresh.cs@iith.ac.in','suresh','cs'),
	('ram.cs@iith.ac.in','ram','cs'),
	('ravi.ee@iith.ac.in','ravi','ee'),
	('pavan.ai@iith.ac.in','pavan','ai')
	;

INSERT INTO present_courses(
	course_id, semester, year, name, credits, instructor_id, prerequisites, slot, max_capacity)
	VALUES 
	('cs231','Odd',2021,'Rajesh ni ela padeyali',3,'raja1','','A',500),
	('cs123', 'Odd',2024 , 'Computer Architecture', 2, 'rajesh.cs@iith.ac.in', '', 'A', 100),
	('cs456', 'Odd',2024 , 'Operating Systems', 3, 'rajesh.cs@iith.ac.in', '', 'B', 150),
	('ee123', 'Odd',2024 , 'Digital Design', 2, 'ravi.ee@iith.ac.in', '', 'Q', 80),
	('ai100', 'Odd',2024 , 'Deep Learning', 3, 'pavan.ai@iith.ac.in', '', 'A', 60)
	;

INSERT INTO student(
	id, name, department, joining_year)
	VALUES ('cs21btech123@iith.ac.in', 'Raja', 'cs', 2021),
	       ('raja2','Raja','cs',2021);

INSERT INTO student_courses_present(
	course_id, semester, year, name, credits, elective, student_id, grade, feedback)
	VALUES 
	('cs123', 'Odd',2024 , 'Computer Architecture', 2, 'Department', 'cs21btech123@iith.ac.in','' , false ),
	('cs456', 'Odd',2024 , 'Operating Systems', 3, 'Department', 'cs21btech123@iith.ac.in', '', false),
	('ee123', 'Odd',2024 , 'Digital Design', 2, 'Free', 'cs21btech123@iith.ac.in', '' , false )
	;

INSERT INTO past_courses(
	course_id, semester, year, name, credits, instructor_id, prerequisites, max_capacity)
	VALUES 
	('cs123', 'Odd' , 2022 , 'DBMS-I', 1, 'rajesh.cs@iith.ac.in', '' , 100) ,
	('cs345', 'Odd' , 2022 , 'Computer Architecture', 3, 'rajesh.cs@iith.ac.in', '' , 60) ,
	('cs507', 'Even' , 2022 , 'SWE', 3, 'rajesh.cs@iith.ac.in', '' , 70) ,
	('cs678', 'Even' , 2022 , 'DBMS-II', 2, 'rajesh.cs@iith.ac.in', 'DBMS-I' , 150)
	;

INSERT INTO proposed_courses(
	course_id, name, credits, prerequisites)
	VALUES 
	('cs100', 'swe', 3, 'na'),
	('cs105', 'os', 3, 'na'),
	('cs106', 'dbms', 1, 'na'),
	('cs134', 'algo', 4, 'na'),
	('ee143', 'gates', 2, 'na'),
	('ce333', 'chemicals', 3, 'na') ;