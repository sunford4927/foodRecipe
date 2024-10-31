from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

class detailInfo(Resource):
    def get(self):
        value = request.args.to_dict()
        sno = (value['sno']) 
        
        data = setQuery(""" select * from recipe_board 
                        where RCP_SNO = %s""", sno)
        return jsonify(data)


class getReview(Resource):
    def get(self):
        value = request.args.to_dict()
        sno = (value['rcp_sno']) 
        
        data = setQuery(""" select * from recipe_review where RCP_SNO =  %s""", sno)
       
        return jsonify(data)
    
    
class getComment(Resource):
    def get(self):
        value = request.args.to_dict()
        sno = (value['rcp_sno']) 

        data = setQuery(""" select * from recipe_comments where RCP_SNO =  %s""", sno)

        return jsonify(data)

    