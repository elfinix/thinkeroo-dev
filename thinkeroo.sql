USE thinkeroo

-- User Table
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    institution VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(100) NOT NULL,
    role ENUM('teacher', 'student') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE user
    ADD COLUMN last_login TIMESTAMP NULL DEFAULT NULL;
    
ALTER TABLE user
    ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;
    
ALTER TABLE user
    ADD COLUMN is_staff BOOLEAN NOT NULL DEFAULT FALSE;

-- Class Table
CREATE TABLE class (
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    class_limit INT NOT NULL,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    archived_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Class Join Table
CREATE TABLE user_class (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'removed') NOT NULL DEFAULT 'active',
    
    CONSTRAINT fk_user_class FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_class_user FOREIGN KEY (class_id) REFERENCES class(id),
    UNIQUE(user_id, class_id)
);

-- Class Post Table
CREATE TABLE class_post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_class_post_user FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_class_post_class FOREIGN KEY (class_id) REFERENCES class(id)
);

-- Quiz Table
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duration INT NOT NULL,
    schedule TIMESTAMP NOT NULL,
    status ENUM('active', 'closed', 'deleted') NOT NULL DEFAULT 'active',
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_quiz_class FOREIGN KEY (class_id) REFERENCES class(id)
);

-- Question Table
CREATE TABLE question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    content TEXT NOT NULL,
    answer TEXT NOT NULL,
    type ENUM('MC', 'TF', 'IDN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_question_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

-- Option Table (for multiple choice questions)
CREATE TABLE option (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_option_question FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Quiz Question Table (mapping questions to quizzes)
CREATE TABLE quiz_question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    question_id INT NOT NULL,
    question_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_quiz_question_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id),
    CONSTRAINT fk_quiz_question_question FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Response Table (for student quiz responses)
CREATE TABLE response (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    quiz_question_id INT NOT NULL,
    selected_option TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_response_student FOREIGN KEY (student_id) REFERENCES user(id),
    CONSTRAINT fk_response_quiz_question FOREIGN KEY (quiz_question_id) REFERENCES quiz_question(id)
);

-- Student Score Table (for storing the total score of students for each quiz)
CREATE TABLE student_score (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    quiz_id INT NOT NULL,
    total_score INT NOT NULL,
    date_taken TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_student_score_student FOREIGN KEY (student_id) REFERENCES user(id),
    CONSTRAINT fk_student_score_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);
