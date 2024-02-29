from flask_smorest import Blueprint, abort
from flask.views import MethodView
from schemas.user import LoginSchema, RegisterSchema
from models.user import UserModel
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError
from passlib.hash import pbkdf2_sha256
from db import db

user = Blueprint(
    'user', 
    __name__
)

@user.route('/login')

class LoginView(MethodView):
    @user.arguments(LoginSchema)

    @user.response(200)

    def post(self, payload):
        user = UserModel.query.filter_by(name=payload['name']).first_or_404()
        
        if pbkdf2_sha256.verify(
            payload['password'], 
            user.password
        ):
            return {
                'token': create_access_token(identity=user.id)
            }
        else:
            abort(401)

@user.route('/register')

class RegisterView(MethodView):
    @user.arguments(RegisterSchema)

    @user.response(201)
    
    def post(self, payload):
        try:
            user = UserModel(
                name=payload['name'], 
                password=pbkdf2_sha256.hash(payload['password'])
            )

            db.session.add(user)
            
            db.session.commit()
        except IntegrityError:
            abort(409)