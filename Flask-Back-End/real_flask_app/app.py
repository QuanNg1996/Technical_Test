from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL
from datetime import date
import yaml

app = Flask(__name__)

# Configure db
db = yaml.load(open('database.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def index():
  if request.method == 'POST':
    # Fetch form data
    userDetails = request.form
    name, email, message = userDetails['name'], userDetails['email'], userDetails['message']
    today = date.today()
    time = today.strftime("%d %B %Y")
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users(name, email, message, time) VALUES(%s, %s, %s, %s)", (name, email, message, time))
    mysql.connection.commit()
    cur.close()
    return redirect('/users')
  return render_template('index.html')

@app.route('/users')
def users():
  cur = mysql.connection.cursor()
  resultValue = cur.execute("SELECT * FROM users")
  if resultValue > 0:
    userDetails = cur.fetchall()
    return render_template('users.html', userDetails=userDetails)

if __name__ == '__main__':
  app.run(debug=True)
