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


@app.route("/tasks", methods=['GET'])
def get_all_tasks():
  cur = mysql.connection.cursor()
  cur.execute("SELECT * FROM db_tasks.tasks")
  rv = cur.fetchall()
  return jsonify(rv)

  # return flask.render_template("index.html", token="")

if __name__ == "__main__":
  app.run(debug=True)
