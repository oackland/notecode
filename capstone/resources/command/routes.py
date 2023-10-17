# moved to app.py

# import contextlib
# import io
#
# from flask import Blueprint, jsonify, request
# from flask_cors import CORS
#
# command = Blueprint("command", __name__)
# CORS(command)
#
#
# @command.route("/executeaaa", methods=["POST"])
# def execute():
#     # Check if the request has JSON content
#     if not request.is_json:
#         print("Request was not JSON.")
#         return jsonify({"result": "Request format not supported"}), 400
#
#     data = request.json
#     code = data.get("code", None)
#
#     if code is None or not code.strip():
#         print("No code provided.")
#         return jsonify({"result": "No code provided"}), 400
#
#     print(f"Received code: {code}")
#
#     safe_builtins = {
#         "range": range,
#         "__import__": __import__,
#     }
#
#     code_out = io.StringIO()
#
#     try:
#         with contextlib.redirect_stdout(code_out):
#             exec(code, {"__builtins__": safe_builtins})
#
#         result = code_out.getvalue()
#
#         return jsonify({"result": result}), 200
#
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return jsonify({"result": "Error: " + str(e)}), 400
