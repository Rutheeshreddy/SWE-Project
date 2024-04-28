insert into login values

	('cs21btech123','12345','student'),
    ('cs21btech124','12345','student'),
	('cs21btech125','12345','student'),
	('cs21btech126','12345','student'),
	('cs21btech127','12345','student'),

	('ee21btech123','12345','student'),
	('ee21btech124','12345','student'),
	('ee21btech125','12345','student'),

    ('rajesh123.cs','12345','teacher'),
    ('suresh123.cs','12345','teacher'),
	('praveen123.cs','12345','teacher'),
	('koushik123.ee','12345','teacher'),
	('amit123.ee','12345','teacher'),

    ('admin2','admin','admin') ;

insert into current_sem values 
    ('Odd',2024) ;

insert into timeline values 
    (0,0,0,0,0) ;

insert into student values 
	('cs21btech123','Raja','cs',2021) ,
	('cs21btech124','Ravi','cs',2021) ,
	('cs21btech125','Srinivas','cs',2021) ,
	('cs21btech126','Pavan','cs',2021) ,
	('cs21btech127','Mahesh','cs',2021) ,

	('ee21btech123','Ajay','ee',2021) ,
	('ee21btech124','Aravind','ee',2021) ,
	('ee21btech125','Hari','ee',2021) ;


insert into instructor	VALUES 

	('rajesh123.cs','rajesh','cs'),
	('suresh123.cs','suresh','cs'),
	('praveen123.cs','praveen','cs'),
	('koushik123.ee','koushik','ee'),
	('amit123.ee','amit','ee')
	;

insert into past_courses	values

	('cs100', 'Odd',2023,'DBMS',3,'suresh123.cs','NA',8.5,3.9,4.5,2.2,100),
	('cs102', 'Odd',2023,'OS',3,'suresh123.cs','NA',7.5,3.4,4.1,2.8,150),
	('cs105', 'Even',2023,'DBMS-II',3,'suresh123.cs','NA',9.2,3.9,4.5,2.2,100),
	('cs108', 'Even',2023,'Tensors',3,'suresh123.cs','NA',8.5,3.9,4.5,2.2,100),
	('cs134', 'Odd',2023,'DBMS',3,'rajesh123.cs','NA',8.5,3.9,4.5,2.2,100),
	('cs157', 'Odd',2023,'DBMS',3,'rajesh123.cs','NA',8.5,3.9,4.5,2.2,100),
	('cs309', 'Even',2023,'DBMS',3,'rajesh123.cs','NA',8.5,3.9,4.5,2.2,100)	;

insert into student_courses_past values

	('cs100', 'Odd',2023,'DBMS',3,'Department','cs21btech123','A-'),
	('cs100', 'Odd',2023,'DBMS',3,'Department','cs21btech124','A'),
	('cs100', 'Odd',2023,'DBMS',3,'Department','cs21btech125','B-'),
	('cs100', 'Odd',2023,'DBMS',3,'Department','cs21btech126','A-'),
	('cs100', 'Odd',2023,'DBMS',3,'Department','cs21btech127','B'),

	('cs102', 'Odd',2023,'OS',3,'Department','cs21btech123','A-'),
	('cs102', 'Odd',2023,'OS',3,'Department','cs21btech124','A'),
	('cs102', 'Odd',2023,'OS',3,'Department','cs21btech125','B'),
	('cs102', 'Odd',2023,'OS',3,'Department','cs21btech126','C-'),
	('cs102', 'Odd',2023,'OS',3,'Department','cs21btech127','B'),

	('cs105', 'Even',2023,'DBMS',3,'Department','cs21btech123','A+'),
	('cs105', 'Even',2023,'DBMS',3,'Department','cs21btech124','A'),
	('cs105', 'Even',2023,'DBMS',3,'Department','cs21btech125','B'),
	('cs105', 'Even',2023,'DBMS',3,'Department','cs21btech126','B-'),
	('cs105', 'Even',2023,'DBMS',3,'Department','cs21btech127','A') ;


-- INSERT INTO proposed_courses(
-- 	course_id, name, credits, prerequisites)
-- 	VALUES 
-- 	('cs100', 'swe', 3, 'na'),
-- 	('cs105', 'os', 3, 'na'),
-- 	('cs106', 'dbms', 1, 'na') ;

	-- ('cs134', 'algo', 4, 'na'),
	-- ('ee143', 'gates', 2, 'na'),
	-- ('ce333', 'chemicals', 3, 'na') ;