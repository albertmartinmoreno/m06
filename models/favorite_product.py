from db import db

favorite_product = db.Table(
    'favorite_products',
    db.Column(
        'user_id', 
        db.Integer, 
        db.ForeignKey('users.id'), 
        primary_key=True
    ),
    db.Column(
        'product_id', 
        db.Integer, 
        db.ForeignKey('products.id'), 
        primary_key=True
    )
)