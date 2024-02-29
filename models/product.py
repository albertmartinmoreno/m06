from db import db

class ProductModel(db.Model):
    __tablename__ = 'products'

    id = db.Column(
        db.Integer, 
        primary_key=True
    )
    name = db.Column(
        db.String, 
        nullable=False, 
        unique=True
    )
    price = db.Column(
        db.Float, 
        nullable=False
    )
    category_id = db.Column(
        db.Integer, 
        db.ForeignKey('categories.id'), 
        nullable=False
    )
    
    def __repr__(self):
        return f'<Product {self.name}>'
    