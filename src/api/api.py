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

# /addUser: add a new user to the Canvas system
@app.route('/addUser', methods=['POST'])
def addUser():
    data = json.loads(request.data, strict = False)

    query = f'''INSERT INTO users (user_name, email, password, university_id, account_type, active, '''
    query += f'''security_question1, security_answer1, security_question2, security_answer2, security_question3, security_answer3) '''
    query += f'''VALUES ('{data['name']}', '{data['email']}', '{data['password']}', {data['university_id']}, '''   
    query += f''''{data['account_type']}', 1, "{data['q1']}", "{data['sq1']}", "{data['q2']}", "{data['sq2']}", '''      
    query += f'''"{data['q3']}", "{data['sq3']}");'''                  
    
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

@app.route('/changePassword', methods=['POST'])
def changePassword():
    print("checking security questions")
    data = json.loads(request.data, strict = False)
    email = data['email']
    password = data['new_password']

    response = 'success'
    conn = connect_to_db()
    questions = ['sq1', 'sq2', 'sq3']
    db_questions = ['security_answer1', 'security_answer2', 'security_answer3']

    for i, question in enumerate(questions):
        ans = data[question]
        query = f'''SELECT {db_questions[i]} FROM users WHERE email = '{email}';'''
        print(query)
        
        db_ans = conn.execute(query).fetchall()
        db_ans = db_ans[0][0]
        if (ans != db_ans):
            response = 'failure'
            break
    
    if response == 'success':
        print("changing password")
        
        query = f'''UPDATE users SET password = '{password}' WHERE email = '{email}';'''
        print(query)

        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
    
    conn.close()
    response = jsonify({"result": response})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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