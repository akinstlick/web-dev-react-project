-- Table: users
CREATE TABLE users (
    user_id integer NOT NULL,
    user_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    university_id integer NOT NULL,
    account_type character varying(20) NOT NULL,
    active integer,
    security_question1 character varying(250) NOT NULL,
    security_answer1 character varying(100) NOT NULL,
    security_question2 character varying(250) NOT NULL,
    security_answer2 character varying(100) NOT NULL,
    security_question3 character varying(250) NOT NULL,
    security_answer3 character varying(100) NOT NULL,
    PRIMARY KEY (user_id)
);

-- Table: courses
CREATE TABLE courses (
    course_id integer NOT NULL,
    course_name character varying(100) NOT NULL,
    course_desc character varying(250) NOT NULL,
    capacity integer NOT NULL,
    PRIMARY KEY (course_id)
);

-- Table: announcements
CREATE TABLE announcements (
    announcement_id integer NOT NULL,
    course_id integer NOT NULL,
    announcement_desc character varying(1000) NOT NULL,
    PRIMARY KEY (announcement_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Table: assignments
CREATE TABLE assignments (
    assignment_id integer NOT NULL,
    course_id integer NOT NULL,
    assignment_name character varying(500) NOT NULL,
    points integer NOT NULL,
    assignment_desc character varying(1000) NOT NULL,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Relation Table: teaches
CREATE TABLE teaches (
    university_id integer NOT NULL, 
    course_id integer NOT NULL,
    FOREIGN KEY (university_id) REFERENCES users(university_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Relation Table: takes
CREATE TABLE takes (
    university_id integer NOT NULL, 
    course_id integer NOT NULL,
    FOREIGN KEY (university_id) REFERENCES users(university_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Relation Table: submissions
CREATE TABLE submissions (
    university_id integer NOT NULL,
    assignment_id integer NOT NULL,
    submission_text character varying(1000) NOT NULL,
    grade integer
);