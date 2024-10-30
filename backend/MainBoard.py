from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery #setQuery 가져오기

class MainBoard(Resource):
    def get(self): 
        # 게시글 번호, 유저아이디, 커멘트, 평점 
        value = request.args.to_dict()
        num = (int(value['page']) - 1) * 100
        # offset 부분 (페이지 번호 - 1) * 100 

        # print(value["page"])
        data = setQuery("""select distinct CK_ACT_NM, CK_STA_NM, CK_INPUT_NM, CK_KIND_NM, RECIPE_BOARD.RCP_SNO, 
                            RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT , SCORE_AVG
                            from recipe_board join board_info
                            on recipe_board.RCP_SNO = board_info.RCP_SNO limit 100 offset %s """, num) 
        # data = [obj.__dict__ for obj in data]
        # get 방식 데이터 받아오는 방법 : print(request.args.to_dict())
        # print(data)

        return jsonify(data)
    

    
class AllInfo(Resource):
    def get(self): 
        data = setQuery("select COUNT(*) AS totalCnt from recipe_board")
        # 전달하는 데이터의 키 값은 totalCnt
        # print(data)
        # print(request.data)
        return jsonify(data)