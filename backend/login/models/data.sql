insert into login (username,password,role) values
    ('cs21btech234@iith.ac.in','12345','student') ,
    ('ee21btech123@iith.ac.in','12345','student'),
    ('raja123','123','student'),
    ('ram.cs@iith.ac.in','12345','instructor'),
    ('vimal.ee@iith.ac.in','12345','instructor'),
    ('admin2@iith.ac.in','admin','admin'),
    ('admin3@iith.ac.in','admin','admin') ;

insert into student (id, name, department) values
    ('cs21btech234@iith.ac.in','Jagan','CS') ,
    ('ee21btech123@iith.ac.in','Pawan','EE');

insert into instructor (id, name, department) values
    ('ram.cs@iith.ac.in','Ram','CS') ,
    ('vimal.ee@iith.ac.in','Vimal','EE');

insert into past_courses (course_id, semester, year, name, credits, instructor_id, prerequisistes, max_capacity) values
    ('CS234', 'Fall', 2023, 'Bogus', 3, 'ram.cs@iith.ac.in', 'CS123', 200)
    ('CS123', 'Fall', 2022, 'Networks', 3, 'ram.cs@iith.ac.in', '', 200)
    ('EE356', 'Fall', 2022, 'Circuits', 3, 'vimal.ee@iith.ac.in', '', 200)
    ('EE123', 'Fall', 2023, 'Semi-conductors', 2, 'vimal.ee@iith.ac.in', 'EE356', 200)


insert into student_courses (course_id, semester, year, name, credits, student_id, grade, feedback) values
    ('CS234', 'Fall', '2023', 'Bogus', 3, 'cs21btech234@iith.ac.in', 'B', 'Feedback by p1 on s1')
    ('CS123', 'Fall', '2022', 'Networks', 3, 'cs21btech234@iith.ac.in', 'A', 'Feedback by p1 on s2')
    ('EE356', 'Fall', '2022', 'Circuits', 3, 'ee21btech123@iith.ac.in', 'B-', 'Feedback by p2 on s3')


insert into proposed_courses(course_id,name,credits,prerequisistes) values 
    ('CS110','Tensors',1,'')
    ('CS548','Deep Learning',3,'CS123')
    ('CS308','Data Structures',3,'')
    ('EE679','VLSA',1,'')
    ('CS110','Transformers',3,'')

insert into selected_courses(course_id, teacher_id) values
    ('EE356', 'vimal.ee@iith.ac.in')
    ('EE356', 'ram.cs@iith.ac.in')
    ('CS234', 'ram.cs@iith.ac.in')
    