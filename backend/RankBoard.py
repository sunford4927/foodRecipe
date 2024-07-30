from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

class getrank(Resource):
    def get(self):

        # typeDic = request.args.to_dict()

        # 테스트 용! 프론트 준비되면 삭제
        typeDic = {
            type : "SCORE_AVG"
        }
        # SCORE_AVG, SUG_SNT, SCRAP_CNT

        Ranktype = (typeDic[type]) 

        # print(value)
        # print(num)

        # for key in typeDic :
        #     if Ranktype == typeDic[key] :
        #         data = setQuery(f""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, 
        #                             REVIEW_CNT, SCORE_AVG, SCRAP_CNT, SUG_CNT
        #                             from RECIPE_BOARD R join BOARD_INFO B
        #                             on R.RCP_SNO = B.RCP_SNO
        #                             order by {typeDic[key]} DESC
        #                             limit 20 offset 0; """)

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
              



        # if num == 1 :
        #     data = setQuery(""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG, SCRAP_CNT
        #                         from RECIPE_BOARD R join BOARD_INFO B
        #                         on R.RCP_SNO = B.RCP_SNO
        #                         order by SCRAP_CNT DESC
        #                         limit 100 offset 0; """)
        # elif num == 2 :
        #     data = setQuery (""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG, SUG_CNT
        #                         from RECIPE_BOARD R join BOARD_INFO B
        #                         on R.RCP_SNO = B.RCP_SNO
        #                         order by SUG_CNT DESC
        #                         limit 100 offset 0; """)
        # elif num == 3 :
        #     data = setQuery (""" select distinct R.RCP_SNO, RCP_TTL, USER_NM, VIEW_CNT, REVIEW_CNT, SCORE_AVG
        #                         from RECIPE_BOARD R join BOARD_INFO B
        #                         on R.RCP_SNO = B.RCP_SNO
        #                         order by SCORE_AVG DESC
        #                         limit 100 offset 0; """)
            

        
            

        
            
        return jsonify(data)

    