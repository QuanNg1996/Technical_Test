from flask import Flask, render_template, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root1'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_tasks'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route("/", methods=['GET', 'POST'])
def index():
  # if request.method == 'POST':
  #   userDetails = request.form
  #   name = userDetails['name']
  #   email = userDetails['email']
  #   comment = userDetails['comment']
  return render_template("index.html", token="hello world!")

if __name__ == "__main__":
  app.run(debug=True)
