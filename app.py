from flask import Flask
from flask_smorest import Api
from flask_cors import CORS
from dotenv import load_dotenv
import os
from db import db
from flask_migrate import Migrate
import models
from flask_jwt_extended import JWTManager
import os
import base64
from views.user import user
from views.product import product
from datetime import timedelta
from views.category import category

load_dotenv()

app = Flask(__name__)

app.config['API_TITLE'] = os.getenv('API_TITLE')
app.config['API_VERSION'] = os.getenv('API_VERSION')
app.config['OPENAPI_VERSION'] = os.getenv('OPENAPI_VERSION')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
Migrate(app, db)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = eval(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))

JWTManager(app)

api = Api(app)

api.register_blueprint(user)
api.register_blueprint(product)
api.register_blueprint(category)

CORS(
    app, 
    resources={
        r'*': {
            'origins': 'http://localhost:4200'
        }
    }
)

if __name__ == '__main__':
    app.run(debug=True)

