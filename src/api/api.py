from flask import Flask, jsonify, request
from flask import current_app, g
import sqlite3
import json

app = Flask(__name__)
    
def connect_to_db():
    conn = sqlite3.connect('canvas.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return 'Index Page'

# /addUser: add a new user to the Canvas system
@app.route('/addUser', methods=['GET', 'POST'])
def addUser():
    data = json.loads(request.data, strict = False)

    query = f'''INSERT INTO users (user_name, email, password, university_id, account_type, active, '''
    query += f'''security_question1, security_answer1, security_question2, security_answer2, security_question3, security_answer3) '''
    query += f'''VALUES ('{data['name']}', '{data['email']}', '{data['password']}', {data['university_id']}, '''   
    query += f''''{data['account_type']}', 1, "{data['q1']}", "{data['sq1']}", "{data['q2']}", "{data['sq2']}", '''      
    query += f'''"{data['q3']}", "{data['sq3']}");'''                  
    
    print(query)
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()
    conn.close()

    return 'success'

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