from db import db
from .favorite_product import favorite_product

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(
        db.Integer, 
        primary_key=True
    )
    name = db.Column(
        db.String, 
        nullable=False, 
        unique=True
    )
    password = db.Column(
        db.String, 
        nullable=False
    )
    favorite_products = db.relationship(
        'ProductModel', 
        secondary=favorite_product, 
        backref='users'
    )
    
    def __repr__(self):
        return f'<User {self.name}>'