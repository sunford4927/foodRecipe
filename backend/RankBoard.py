from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

class getrank(Resource):
    def get(self):

        typeDic = request.args.to_dict()

        print("typename : ", typeDic['type'])

        Ranktype = (typeDic['type']) 
    

        for key in typeDic :
            if Ranktype == typeDic[key] :
                data = setQuery(f""" SELECT DISTINCT R.RCP_SNO, R.RCP_TTL, R.USER_NM, B.REVIEW_CNT,
                                    B.VIEW_CNT, B.SCRAP_CNT, B.SUG_CNT, B.SCORE_AVG
                                    FROM RECIPE_BOARD R
                                    JOIN (
                                        SELECT RCP_SNO, REVIEW_CNT, VIEW_CNT, SCRAP_CNT, SUG_CNT, SCORE_AVG
                                        FROM BOARD_INFO
                                        ORDER BY {typeDic[key]} DESC
                                        LIMIT 100 OFFSET 0
                                    ) B
                                    ON R.RCP_SNO = B.RCP_SNO; """)
   
        return jsonify(data)
    

    