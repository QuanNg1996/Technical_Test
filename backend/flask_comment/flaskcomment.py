from flask import Flask, escape, request

app = Flask(__name__)

@app.route('/')
def hello():
    return "<h1>This is the Home Page</h1>"
