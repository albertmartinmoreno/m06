from db import db

class CategoryModel(db.Model):
    __tablename__ = 'categories'

    id = db.Column(
        db.Integer, 
        primary_key=True
    )
    name = db.Column(
        db.String, 
        nullable=False, 
        unique=True
    )
    products = db.relationship(
        'ProductModel', 
        backref='category', 
        lazy=True
    )
    
    def __repr__(self):
        return f'<Category {self.name}>'