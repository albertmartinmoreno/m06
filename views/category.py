from flask_smorest import Blueprint
from flask.views import MethodView
from models.category import CategoryModel

category = Blueprint(
    'category', 
    __name__
)

@category.route('/categories')

class CategoryView(MethodView):
    @category.response(200)
    
    def get(self):
        categories = [
            {
                'id': category.id,
                'name': category.name,
                'products': [
                    {
                        'id': product.id,
                        'name': product.name,
                        'price': product.price,
                        'category_id': product.category_id
                    }
                    for product in category.products
                ]
            }
            for category in CategoryModel.query.all()
        ]
        
        return {
            'categories': categories
        }