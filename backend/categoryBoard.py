from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery 

class category(Resource):
    def get(self):
        # cateDic = request.args.to_dict()

        # 테스트 용! 프론트 준비되면 삭제하세유
        cateDic = {

            "CK_KIND_NM" : "밑반찬",
            "CK_STA_NM" : "일상",
            "CK_INPUT_NM" : "소고기",
            "CK_ACT_NM" : "볶음"
        }

        isInput = False
        query = """SELECT DISTINCT CK_KIND_NM, CK_STA_NM, CK_INPUT_NM, CK_ACT_NM, R.RCP_SNO, 
                    RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT , SCORE_AVG 
                    from RECIPE_BOARD R join BOARD_INFO B
                    on R.RCP_SNO = B.RCP_SNO WHERE """
        
        for ckNM in cateDic :
            if (cateDic[ckNM] != "") :
                if (isInput) :
                    query += f"AND {ckNM} LIKE '{cateDic[ckNM]}'"
                else:
                    query += f"{ckNM} LIKE '{cateDic[ckNM]}'"
                    isInput = True
        
        data = setQuery(query)
        
        return jsonify(data)

        
