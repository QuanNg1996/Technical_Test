from flask import Flask, render_template, request, redirect, jsonify
from flask_mysqldb import MySQL
from datetime import date
from flask_cors import CORS
# import yaml

app = Flask(__name__)
CORS(app)

# Configure db
# db = yaml.load(open('database.yaml'))
app.config['MYSQL_HOST'] = 'localhost'
# db['mysql_host']
app.config['MYSQL_USER'] = 'root'
# db['mysql_user']
app.config['MYSQL_PASSWORD'] = '1234567890'
# db['mysql_password']
app.config['MYSQL_DB'] = 'flaskapp'
# db['mysql_db']
mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
  if request.method == 'POST':
    userDetails = request.json
    name, email, message = userDetails['name'], userDetails['email'], userDetails['message']
    today = date.today()
    time = today.strftime("%d %B %Y")
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users(name, email, message, time) VALUES(%s, %s, %s, %s)", (name, email, message, time))
    mysql.connection.commit()
    cur.close()
    return redirect('/')
  else:
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users ORDER BY id DESC")
    mysql.connection.commit()
    data = []
    for id, name, email, message, time in cur.fetchall():
      info = dict()
      info['id'] = id
      info['name'] = name
      info['email'] = email
      info['message'] = message
      info['time'] = time
      data.append(info)
    return jsonify(data)
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)


