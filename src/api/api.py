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

@app.route('/addUser', methods=['GET', 'POST'])
def addUser():
    data = json.loads(request.data, strict = False)
    print(data)
    name = data['name']
    email = data['email']
    print(f'My name is {name} and my email is {email}')
    return 'Index'

@app.route('/data', methods=['GET', 'POST'])
def get_test_data():
    response = jsonify({
        'Name': 'Allison',
        'Age': '22',
        'Course': 'Web Development'
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


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