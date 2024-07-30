from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery 
from funcAll import frontToDB

class category(Resource):
    def get(self):
        cateDic = request.args.to_dict()
        num = (int(cateDic['page']) - 1) * 100

        isInput = False
        query = """SELECT DISTINCT CK_KIND_NM, CK_STA_NM, CK_INPUT_NM, CK_ACT_NM, R.RCP_SNO, 
                    RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT , SCORE_AVG 
                    from RECIPE_BOARD R join BOARD_INFO B
                    on R.RCP_SNO = B.RCP_SNO WHERE """
  
        # CK_ACT_NM, CK_STA_NM, CK_INPUT_NM, , 
        for ckNM in cateDic :
            if (ckNM == 'page') :
                continue
            if (cateDic[ckNM] != "전체") :
                if (isInput) :
                    query += f'AND {ckNM} LIKE "{frontToDB(cateDic[ckNM])}"'
                else:
                    query += f'{ckNM} LIKE "{frontToDB(cateDic[ckNM])}"'
                    isInput = True

        data = setQuery(query+"limit 100 offset %s ", num)
        return jsonify(data)

        
class cateCnt(Resource):
    def get(self):
        cateDic = request.args.to_dict()

        isInput = False
        query = """select COUNT(R.RCP_SNO) AS CATE_CNT
                    from RECIPE_BOARD R join BOARD_INFO B
                    on R.RCP_SNO = B.RCP_SNO WHERE """
  
        # CK_ACT_NM, CK_STA_NM, CK_INPUT_NM, , 
        for ckNM in cateDic :
            if (ckNM == 'page') :
                continue
            if (cateDic[ckNM] != "전체") :
                if (isInput) :
                    query += f'AND R.{ckNM} LIKE "{frontToDB(cateDic[ckNM])}"'
                else:
                    query += f'R.{ckNM} LIKE "{frontToDB(cateDic[ckNM])}"'
                    isInput = True

        data = setQuery(query)
        print(query)
        return jsonify(data)