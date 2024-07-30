from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery #setQuery 가져오기

class getrank(Resource):
    def get(self):

        # front에서 보낸 값 받아오기
        value = request.args.to_dict()
        # 형 변환 및 변수에 담아주기, type은 프론트에서 url로 보낼 변수명
        num = int(value['type']) 

        print(value)
        print(num)

        if num == 1 :
            data = setQuery(""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG, SCRAP_CNT
                                from RECIPE_BOARD R join BOARD_INFO B
                                on R.RCP_SNO = B.RCP_SNO
                                order by SCRAP_CNT DESC
                                limit 100 offset 0; """)
        elif num == 2 :
            data = setQuery (""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG, SUG_CNT
                                from RECIPE_BOARD R join BOARD_INFO B
                                on R.RCP_SNO = B.RCP_SNO
                                order by SUG_CNT DESC
                                limit 100 offset 0; """)
        elif num == 3 :
            data = setQuery (""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG
                                from RECIPE_BOARD R join BOARD_INFO B
                                on R.RCP_SNO = B.RCP_SNO
                                order by SCORE_AVG DESC
                                limit 100 offset 0; """)
            
        return jsonify(data)

    