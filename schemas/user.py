from marshmallow import Schema, validate
from marshmallow.fields import String

class RegisterSchema(Schema):
    name = String(
        required=True, 
        validate=validate.Regexp(r'^[a-zA-Z]{6,}$')
    )
    password = String(
        required=True, 
        validate=validate.Regexp(r'^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$')
    )

class LoginSchema(Schema):
    name = String(required=True)
    password = String(required=True)