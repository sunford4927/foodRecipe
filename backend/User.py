from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery, getQuery 
 
class insertUser(Resource):
    def post(self):
        value = request.get_json()['data']
        print(value)

        email = value['email']
        nm = value['nick']
        
        insU_sql = '''insert into recipe_user (user_nm, user_email)
                            VALUES (%s,%s); '''
        print("insertttttttttttttttttt:" , insU_sql)


        PostQuery(insU_sql, (nm, email))
