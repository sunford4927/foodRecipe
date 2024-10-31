from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery, getQuery
  
class upLoadRC(Resource):
    def post(self):
        value = request.get_json()['data']
        print(value)
        
        identify = value['identify']
        sno = value['sno']
        user_nm = value['user_nm']
        user_email = value['user_email']
        
        check_sql = '''SELECT COUNT(*) FROM recipe_review WHERE RCP_SNO = %s AND USER_EMAIL = %s'''
        count_result = getQuery(check_sql, (sno, user_email))
        count = count_result[0]['COUNT(*)'] if count_result else 0 
        # 위 작업 안 하면 [{'COUNT(*)': 1}] 라고 나옴.
        # 댓글/후기 작성 시 화면 렌더링 // 댓글창 비우기

        print("counttttttttttttttttttttttttttt", count)
        
        # if count > 0:
        #     error_message = "이미 리뷰를 작성했습니다."
        #     print(error_message)
        #     return jsonify({"count:", count}), 400
        
        # if count == 0:
        #     return jsonify({"count": count}), 200
        
        if not (identify and sno and user_nm and user_email):
            error_message = "필수 필드가 누락됨"
            print(error_message)
            return jsonify({"error": "필수 필드가 누락됨."}), 400
        
        try:
            if identify == 'COM' :
                comment = value['comment']
                upComment_sql = '''insert into recipe_comments (RCP_SNO, USER_NM, USER_EMAIL, COMMENTS)
                                VALUES (%s,%s,%s,%s); '''
                PostQuery(upComment_sql, (sno, user_nm, user_email,comment ))
                
            elif identify == 'REV' :
                review = value['review']
                score = value['score']
                
                if count == 0:
                    # 기존에 작성한 후기가 없다면 리뷰 등록
                    upReview_sql = '''insert into recipe_review (RCP_SNO, USER_NM, USER_EMAIL, REVIEW, REVIEW_SCORE)
                                    VALUES (%s,%s,%s,%s,%s); '''
                    PostQuery(upReview_sql, (sno, user_nm, user_email,review, score ))
                    
                    # 해당 레시피의 평점 평균 업데이트
                    update_score_sql = '''
                        UPDATE board_info
                        SET SCORE_AVG = (
                            SELECT AVG(REVIEW_SCORE)
                            FROM recipe_review
                            WHERE RCP_SNO = %s
                        )
                        WHERE RCP_SNO = %s; '''
                    PostQuery(update_score_sql, (sno, sno))
                    
                    # 후기 작성 시 후기수 +1
                    update_review_count_sql = '''
                            UPDATE board_info
                            SET REVIEW_CNT = REVIEW_CNT + 1
                            WHERE RCP_SNO = %s; '''
                    PostQuery(update_review_count_sql, (sno,))
                
                else:
                    #만약 해당 유저가 후기를 작성했었다면 업데이트
                    updateReview_sql = '''UPDATE recipe_review
                                          SET REVIEW = %s, REVIEW_SCORE = %s
                                          WHERE RCP_SNO = %s AND USER_EMAIL = %s;'''
                    PostQuery(updateReview_sql, (review, score, sno, user_email))
                    
                    # 평균 점수 업데이트
                    update_score_sql = '''
                        UPDATE board_info
                        SET score_avg = (
                            SELECT AVG(REVIEW_SCORE)
                            FROM recipe_review
                            WHERE RCP_SNO = %s
                        )
                        WHERE RCP_SNO = %s;
                    '''
                    PostQuery(update_score_sql, (sno, sno))
                     
            else:
                return jsonify({"error": "잘못된 identify 값입니다."}), 400
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500   
 
# class upLoadReview(Resource):
#     def post(self):
#         value = request.get_json()['data']
#         print(value)

#         sno = value['sno']
#         user_nm = value['user_nm']
#         user_email = value['user_email']
#         review = value['review']
#         score = value['score']
        
#         upReview_sql = '''insert into recipe_review (RCP_SNO, USER_NM, USER_EMAIL, REVIEW, REVIEW_SCORE)
#                             VALUES (%s,%s,%s,%s,%s); '''


#         PostQuery(upReview_sql, (sno, user_nm, user_email,review, score ))
