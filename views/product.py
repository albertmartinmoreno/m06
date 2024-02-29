from flask_smorest import Blueprint
from flask.views import MethodView
from models.product import ProductModel
from flask_jwt_extended import jwt_required, current_user
from models.user import UserModel
from db import db

product = Blueprint(
    'product', 
    __name__
)

@product.route('/products')

class ProductView(MethodView):
    @product.response(200)

    def get(self):
        products = [
            {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'category_id': product.category_id
            }
            for product in ProductModel.query.all()
        ]

        return {
            'products': products
        }
    
@product.route('/favorite_products/<int:product_id>')

class FavoriteProductView(MethodView):
    @jwt_required()

    @product.response(201)

    def put(self, product_id):
        user = UserModel.query.get(current_user.id)

        product = ProductModel.query.get(product_id)

        user.favorite_products.append(product)

        db.session.commit()

    @jwt_required()

    @product.response(204)

    def delete(self, product_id):
        user = UserModel.query.get(current_user.id)

        product = ProductModel.query.get(product_id)

        user.favorite_products.remove(product)
        
        db.session.commit()

        



