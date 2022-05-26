import sqlite3
import json
from flask import Flask, jsonify, request

app = Flask(__name__)
    
def connect_to_db():
    conn = sqlite3.connect('canvas.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return 'Index Page'

#####################################################################################
#####################################################################################
## Login / Signup / Account Functions
#####################################################################################
#####################################################################################
# /addUser: add a new user to the Canvas system
@app.route('/addUser', methods=['POST'])
def addUser():
    data = json.loads(request.data, strict = False)


    query = f'''INSERT INTO users (user_name, email, password, university_id, account_type, active, '''
    query += f'''security_question1, security_answer1, security_question2, security_answer2, security_question3, security_answer3) '''
    query += f'''VALUES ('{data['name']}', '{data['email']}', '{data['password']}', {data['university_id']}, '''   
    query += f''''{data['account_type']}', 0, "{data['q1']}", "{data['sq1']}", "{data['q2']}", "{data['sq2']}", '''      
    query += f'''"{data['q3']}", "{data['sq3']}");''' # a new user is by default "inactive" until admin approval
    
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()
    conn.close()

    return 'success'

# /checkUser: check if the email/password combo exists in users
@app.route('/checkUser', methods=['POST'])
def checkUser():
    data = json.loads(request.data, strict = False)
    email = data['email']
    password = data['password']

    query = f'''SELECT user_id FROM users WHERE email = '{email}' AND password = '{password}';'''
    conn = connect_to_db()
    users = conn.execute(query).fetchall()
    conn.close()

    matches = len(users)

    if matches == 0:
        print("no matching user")
        response = jsonify({'user_id': 0000})
    else:
        print(f"user id: {users[0][0]}")
        response = jsonify({'user_id': users[0][0]}) # user_id
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /changePassword: change the password for a user (identified by email) 
# checks that the user correctly answers the security questions first
@app.route('/changePassword', methods=['POST'])
def changePassword():
    print("checking security questions")
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    password = data['new_password']

    response = 'success'
    conn = connect_to_db()
    questions = ['sq1', 'sq2', 'sq3']
    db_questions = ['security_answer1', 'security_answer2', 'security_answer3']

    for i, question in enumerate(questions):
        ans = data[question]
        query = f'''SELECT {db_questions[i]} FROM users WHERE user_id = {user_id};'''
        print(query)
        
        db_ans = conn.execute(query).fetchall()
        db_ans = db_ans[0][0]
        if (ans != db_ans):
            response = 'failure'
            break
    
    if response == 'success':
        print("changing password")
        
        query = f'''UPDATE users SET password = '{password}' WHERE user_id = {user_id};'''
        print(query)

        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
    
    conn.close()
    response = jsonify({"result": response})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /changeSecurityQs: change the security questions for a user (identified by user_id) 
# checks that the user correctly inputs the password first
@app.route('/changeSecurityQs', methods=['POST'])
def changeSecurityQs():
    print("changeSecurityQs: checking password is correct")
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    password = data['password']
    
    response = 'success'
    conn = connect_to_db()

    query = f'''SELECT password FROM users WHERE user_id = {user_id};'''
    print(query)
    db_password = conn.execute(query).fetchall()[0][0]
    if(password != db_password):
        response = 'failure'
    else: 
        cur = conn.cursor()
        new_answers = ['new_sq1', 'new_sq2', 'new_sq3']
        db_questions = ['security_answer1', 'security_answer2', 'security_answer3']

        for i, answer in enumerate(new_answers):
            new_ans = data[answer]
            if(new_ans != ''):
                query = f'''UPDATE users SET {db_questions[i]} = '{new_ans}' WHERE user_id = {user_id};'''
                print(query)
                cur.execute(query)
                conn.commit()
    conn.close()
    response = jsonify({"result": response})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /getUserInfo: returns a JSON with the personal information for the given user id
@app.route('/getUserInfo', methods=['GET', 'POST'])
def getUserInfo():
    print("getting user information")
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']

    query = f'''SELECT user_name, email, university_id FROM users WHERE user_id = {user_id};'''
    conn = connect_to_db()
    users = conn.execute(query).fetchall()
    conn.close()

    matches = len(users)

    if matches == 0:
        print("no matching user")
        response = jsonify({'user_id': 0000})
    else:
        user = users[0]
        userinfo = {
            'name': user[0],
            'email': user[1],
            'university_id': user[2]
        }
        response = jsonify(userinfo)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# helper function for changing the fields of a USER in users
def changeUserInfo(user_id, field, new_info):
    print("changeUserInfo")
    response = 'success'
    conn = connect_to_db()
    cur = conn.cursor()
    
    try:
        query = f'''UPDATE users SET {field} = '{new_info}' WHERE user_id = {user_id};'''
        print(query)
        cur.execute(query)
        conn.commit()
    except Exception as e:
        print(f"failed changeUserInfo: {e}")
        response = 'failure'
    
    conn.close()
    response = jsonify({"result": response})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /changeUserName: change a user's name (identified by id) 
@app.route('/changeUserName', methods=['POST'])
def changeUserName():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    new_name = data['new_name']
    return changeUserInfo(user_id, 'user_name', new_name)

# /changeUserEmail: change a user's email (user identified by id) 
@app.route('/changeUserEmail', methods=['POST'])
def changeUserEmail():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    new_email = data['new_email']

    return changeUserInfo(user_id, 'email', new_email)

# /changeUserUniversityID: change a user's university ID (identified by id)
@app.route('/changeUserUniversityID', methods=['POST'])
def changeUserUniversityID():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    new_id = data['new_id']

    return changeUserInfo(user_id, 'university_id', new_id)

#####################################################################################
#####################################################################################
## Admin Functions
#####################################################################################
#####################################################################################

# /userType: return the user type associated with the given user_id
@app.route('/userType', methods=['POST'])
def userType():
    print('getting user type')
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']

    conn = connect_to_db()

    query = f'''SELECT account_type FROM users WHERE user_id = {user_id};'''
    accounttype = conn.execute(query).fetchall()[0][0]

    print(f'{accounttype}')

    response = jsonify({
        "account_type" : accounttype
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    conn.close()
    return response


# /approveUser: set a user (identified by user_id) status to active (admin only)
@app.route('/approveUser', methods=['POST'])
def approveUser():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    return changeUserInfo(user_id, 'active', 1)

# /deactivateUser: set a user (identified by user_id) status to inactive (admin only)
@app.route('/deactivateUser', methods=['POST'])
def deactivateUser():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    return changeUserInfo(user_id, 'active', 0)

# /getAllUsers: returns a list of all users and their info in JSON form (admin only)
@app.route('/getAllUsers', methods=['POST'])
def getAllUsers():
    user_list = []
    query = f'''SELECT user_id,user_name, email, university_id, active FROM users;'''
    
    conn = connect_to_db()
    users = conn.execute(query).fetchall()
    conn.close()

    for user in users:
        userdict = {
            'user_id': user[0],
            'user_name': user[1],
            'email': user[2],
            'university_id': user[3],
            'active': user[4]
        }
        user_list.append(userdict)

    response = json.dumps(user_list)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /addUserToClass: adds a user (identified by user_id) to class as either teacher or student (admin only)
@app.route('/addUserToClass', methods=['POST'])
def addUserToClass():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    course = data['course_name']
    conn = connect_to_db()

    # determine the account type and user_id of the user
    query = f'''SELECT user_id, account_type FROM users WHERE user_id = {user_id};'''
    user = conn.execute(query).fetchall()[0]
    user_id = user[0]
    account_type = user[1]

    # determine the course id of the course
    query = f'''SELECT course_id FROM courses WHERE course_name = '{course}';'''
    course_id = conn.execute(query).fetchall()[0][0]

    # insert into the appropriate table depending on account type
    cur = conn.cursor()
    if account_type == 'student':
        query = f'''INSERT INTO takes (user_id, course_id) VALUES ({user_id}, {course_id});'''
    elif account_type == 'teacher':
        query = f'''INSERT INTO teaches (user_id, course_id) VALUES ({user_id}, {course_id});'''
    else:
        return 'failure'

    cur.execute(query)
    conn.commit()
    conn.close()
    return 'success'

# /getAllCourses: returns a list of all courses and info in JSON form (admin only)
@app.route('/getAllCourses', methods=['POST'])
def getAllCourses():
    # TODO: get all courses
    query = f'''SELECT course_name FROM courses;'''
    pass

# /addCourse: add a new course to the database (admin only)
@app.route('/addCourse', methods=['POST'])
def addCourse():
    # TODO: add course
    data = json.loads(request.data, strict = False)
    course_name = data['course_name']
    course_desc = data['description']
    capacity = data['capacity']
    conn = connect_to_db()
    pass

# /getAdminSummary: 
# - # active students
# - # active teachers
# - # courses
@app.route('/getAdminSummary', methods=['POST'])
def getAdminSummary():
    print('getting admin summary')

    conn = connect_to_db()

    studentquery = f'''SELECT count(*) FROM users WHERE account_type = 'student';'''
    numstudents = conn.execute(studentquery).fetchall()[0][0]
    coursequery = f'''SELECT count(*) FROM courses;'''
    numcourses = conn.execute(coursequery).fetchall()[0][0]
    teacherquery = f'''SELECT count(*) FROM users WHERE account_type = 'teacher';'''
    numteachers = conn.execute(teacherquery).fetchall()[0][0]

    response = jsonify({
        "num_students" : numstudents,
        "num_courses" : numcourses,
        "num_teachers" : numteachers
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    conn.close()
    return response

#####################################################################################
#####################################################################################
## Dashboard Functions
#####################################################################################
#####################################################################################

# helper function to get student courses by user_id from the relation "takes"
# returns a list of course_ids
def getStudentCoursesByUser(user_id):
    conn = connect_to_db()
    # determine the student's courses
    query = f'''SELECT course_id FROM takes WHERE user_id = {user_id};'''
    course_ids = []
    for course in conn.execute(query).fetchall():
        course_ids.append(course[0])
    conn.close()
    return course_ids

# helper function to get teacher courses by user_id from the relation "teaches"
# returns a list of course_ids
def getTeacherCoursesByUser(user_id):
    conn = connect_to_db()
    # determine the teacher's courses
    query = f'''SELECT course_id FROM teaches WHERE user_id = {user_id};'''
    course_ids = []
    for course in conn.execute(query).fetchall():
        course_ids.append(course[0])
    conn.close()
    return course_ids

# /getStudentCourses:
@app.route('/getStudentCourses', methods=['POST'])
def getStudentCourses():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    
    course_ids = getStudentCoursesByUser(user_id)
    courses = []

    conn = connect_to_db()
    for course_id in course_ids:
        query = f'''SELECT course_name FROM courses WHERE course_id = {course_id};'''
        courses.append(conn.execute(query).fetchall()[0][0])

    conn.close()
    response = json.dumps(courses)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /getTeacherCourses:
@app.route('/getTeacherCourses', methods=['POST'])
def getTeacherCourses():
    #TODO
    pass

# /getAllStudentAssignments: returns a list of all assignments and info in JSON form
# for a given student, identified by email
@app.route('/getAllStudentAssignments', methods = ['POST'])
def getAllStudentAssignments():
    data = json.loads(request.data, strict = False)
    user_id = data['user_id']
    assignment_list = []

    course_ids = getStudentCoursesByUser(user_id)

    conn = connect_to_db()
    # gather the list of all assignments for all courses the student takes
    for course_id in course_ids:
        query = f'''SELECT course_name FROM courses WHERE course_id = {course_id};'''
        course_name = conn.execute(query).fetchall()[0][0]
        query = f'''SELECT assignment_name, points, due_date FROM assignments WHERE course_id = {course_id};'''
        assignments = conn.execute(query).fetchall()
        for assignment in assignments:
            assignmentdict = {
                'assignment_name': assignments[0],
                'course_name': course_name,
                'points': assignments[1],
                'due_date': assignments[2]
            }
            assignment_list.append(assignmentdict)

    conn.close()
    response = json.dumps(assignment_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# /getAllTeacherAssignments: returns a list of all assignments and info in JSON form
# for a given teacher, identified by email
@app.route('/getAllTeacherAssignments', methods = ['POST'])
def getAllTeacherAssignments():
    #TODO
    pass

#####################################################################################
#####################################################################################
## Courses Functions
#####################################################################################
#####################################################################################

@app.route('/getAnnouncementsByCourse', methods=['POST'])
def getStudentAnnouncements():
    #TODO
    pass

# /addAnnouncement: add a new announcement for the given course (teacher only)
@app.route('/addAnnouncement', methods=['POST'])
def addAnnouncement():
    #TODO
    pass

# /getStudentGrades: get the grades for all assignments for a given course and student
@app.route('/getStudentGrades', methods=['POST'])
def getStudentGrades():
    #TODO
    pass

# /getAllStudentGrades: get the grades for all students in a course (teacher only)
@app.route('/getAllStudentGrades', methods=['POST'])
def getAllStudentGrades():
    #TODO
    pass

# /addAssignment: add a new assignment for the given course (teacher only)
@app.route('/addAssignment', methods=['POST'])
def addAssignment():
    #TODO
    pass

# /submitAssignment: create a submission for an existing assignment (student only)
@app.route('/submitAssignment', methods=['POST'])
def submitAssignment():
    #TODO
    pass

# /addGradeForSubmission: add a grade for a student submission (teacher only)
# the submission should already be in the table "submissions"
@app.route('/addGradeForSubmission', methods=['POST'])
def addGradeForSubmission():
    #TODO
    pass


#####################################################################################

# THIS IS A TEST FUNCTION TODO: delete at the end
@app.route('/data', methods=['GET', 'POST'])
def get_test_data():
    response = jsonify({
        'Name': 'Allison',
        'Age': '22',
        'Course': 'Web Development'
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# THIS IS A TEST FUNCTION TODO: delete at the end
@app.route('/courses')
def hello_world():
    query = f"select * from courses"
    conn = connect_to_db()
    courses = conn.execute(query).fetchall()
    conn.close()
    course_name = ""
    for row in courses:
        print(row[0])
        print(row[1])
        print(row[2])
        course_name = row[1]
    return f"<p>Course: {course_name}</p>"