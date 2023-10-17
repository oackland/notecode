import jwt
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, abort
from sqlalchemy import or_
from passlib.handlers.pbkdf2 import pbkdf2_sha256

from models import UserModel, db

auth = Blueprint("auth", __name__)

SECRET_KEY = "Apathetic;dfhrf0kpdj034"


@auth.route("/api/register", methods=["POST"])
def register():
    user_data = request.get_json()

    if UserModel.query.filter(
        or_(
            UserModel.username == user_data["username"],
            UserModel.email == user_data["email"],
        )
    ).first():
        abort(409, description="A user with that username or email already exists.")

    user = UserModel(
        username=user_data["username"],
        email=user_data["email"],
        password=pbkdf2_sha256.hash(user_data["password"]),
    )
    db.session.add(user)
    db.session.commit()

    return {"message": "User created successfully."}, 201


@auth.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = UserModel.query.filter_by(username=data["username"]).first()

    if not user or not pbkdf2_sha256.verify(data["password"], user.password):
        return {"message": "Bad username or password"}, 401

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm="HS256",
    )

    return {"access_token": token}
