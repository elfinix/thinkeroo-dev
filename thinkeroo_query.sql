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
    