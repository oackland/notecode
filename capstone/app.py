import contextlib
import io
import os
import sys
import traceback

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, bcrypt
from resources import auth, api, apiInfo, prices, command

load_dotenv()

app = Flask(__name__)
CORS(app)


database_uri = os.environ.get("DATABASE_URL")

if database_uri:
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
else:
    raise ValueError("No DATABASE_URL set for Flask application")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.register_blueprint(api)
app.register_blueprint(auth)
app.register_blueprint(apiInfo)
app.register_blueprint(prices)
app.register_blueprint(command)

db.init_app(app)
bcrypt.init_app(app)

with app.app_context():
    db.create_all()


def get_choice(choices):
    simulated_choice = "left"
    print("Available moves: " + "/".join(choices))
    print("> " + simulated_choice)

    return simulated_choice


@app.route("/execute", methods=["POST"])
def execute():
    data = request.json
    code = data.get("code", None)

    if not code:
        print("No code provided.")
        return jsonify({"result": "Error: No code provided"}), 400

    code_out = io.StringIO()
    result = {}
    try:
        with io.StringIO() as code_out, contextlib.redirect_stdout(code_out):
            exec_env = {}
            exec(code, exec_env)

            result["output"] = code_out.getvalue()

    except Exception as e:
        return (
            jsonify(
                {
                    "result": "Execution failed",
                    "error": traceback.format_exc(),
                }
            ),
            500,
        )

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True)
