from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
  return flask.render_template("index.html", token="Using React + Flask + SQLalchemy")

if __name__ == "__main__":
  app.run(debug=True)
