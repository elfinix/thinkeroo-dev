USE thinkeroo

-- search for the class of a teacher (join: user, class, user_class)
SELECT 
    u.id AS user_id,
	CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.username AS user_name,
    c.id AS class_id,
    c.name AS class_name
FROM 
    user u
JOIN 
    user_class uc ON u.id = uc.user_id
JOIN 
    class c ON uc.class_id = c.id
WHERE 
    u.id = 1
    
-- display all the questions made by user 1
SELECT 
    q.id AS question_id,
    q.content AS question_content,
    q.created_at AS question_created_at,
    u.id AS user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.username AS user_name
FROM 
    question q
JOIN 
    user u ON q.id = u.id
WHERE 
    u.id = 1;
    
DROP TABLE authtoken_token;
    
-- select the total number of questions in a quiz
SELECT 
    COUNT(q.id) AS total_questions
FROM
    question q
JOIN
    quiz z ON q.quiz_id = z.id
WHERE
    z.id = 1;
    
-- select the total number of students in a class
SELECT 
    COUNT(u.id) AS total_students
FROM
    user u
JOIN
    user_class uc ON u.id = uc.user_id
    
-- ver. 2
SELECT COUNT(uc.user_id) AS total_students
FROM user_class uc
JOIN quiz z ON uc.class_id = z.class_id
WHERE uc.id = 1

-- dont
-- SET FOREIGN_KEY_CHECKS = 0
DROP TABLE quiz
SET FOREIGN_KEY_CHECKS = 1

-- INSERTIONS
INSERT INTO thinkeroo.quiz (teacher_id, class_id,title,description,duration,schedule,status,deleted_at,created_at,updated_at) VALUES
	 (3, 1,'Math Quiz 1','This is a math quiz for the students.',30,'2024-12-15 10:00:00','active',NULL,'2024-12-12 05:33:20','2024-12-12 05:33:20'),
	 (3, 3,'Thinking 2','meh',30,'2024-12-13 05:27:52','active',NULL,'2024-12-13 05:11:09','2024-12-13 05:27:52'),
	 (3, 1,'Sci Quiz 1','Science quiz',25,'2024-12-13 17:07:43','active',NULL,'2024-12-13 16:47:43','2024-12-13 16:57:13');

INSERT INTO thinkeroo.question (quiz_id,content,answer,`type`,created_at,updated_at) VALUES
	 (1,'What is 2 + 2?','4','MC','2024-12-12 05:42:29','2024-12-12 05:42:29'),
	 (1,'What is 3 + 5?','8','IDN','2024-12-13 16:32:12','2024-12-13 16:32:12'),
	 (1,'What is 10 * 10?','100','IDN','2024-12-13 17:18:13','2024-12-13 17:18:13'),
	 (3,'First letter','A','IDN','2024-12-13 17:19:24','2024-12-13 17:19:24'),
	 (3,'Last letter','Z','IDN','2024-12-13 17:19:24','2024-12-13 17:19:24');

INSERT INTO thinkeroo.student_score (student_id,quiz_id,total_score,time_started,created_at,updated_at,time_finished) VALUES
	 (1,1,2,'2024-12-13 07:04:49','2024-12-12 06:15:56','2024-12-14 07:05:22','2024-12-13 08:08:41'),
	 (3,1,1,'2024-12-14 07:06:38','2024-12-13 17:04:13','2024-12-14 07:06:38','2024-12-14 17:12:13'),
	 (3,3,1,'2024-12-13 07:05:51','2024-12-13 17:19:41','2024-12-14 07:05:56','2024-12-13 17:21:41');
