from db_connection import db_connection

def getQuery(sql=None, data = None):
    # MySQL 데이터베이스 연결
    db = db_connection()

    # 데이터에 접근
    cursor = db.cursor()
    cursor.execute(sql,data)
    
    # 컬럼 이름 받아오기
    columns = [col[0] for col in cursor.description]
    
    # 결과를 딕셔너리로 변환
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    # DB 연결 종료
    db.commit()
    db.close()
    return data

def PostQuery(sql = None, data = None):
    try:
        # MySQL 데이터베이스 연결
        db = db_connection()

        # 데이터에 접근
        cursor = db.cursor()

        cursor.execute(sql,data)
        
        db.commit()
        db.close()

        return 201
    except Exception as e:
        return 500

# def testQu(sql = None, data = None):
#     # MySQL 데이터베이스 연결
#     db = pymysql.connect(
#         host='192.168.1.69',
#         user='food_recipe',
#         password='12345',
#         db='foodrecipe', 
#         charset='utf8mb4'
#     )
    
#     # 데이터에 접근
#     cursor = db.cursor()

#     cursor.execute(sql,data)
    
#     # 컬럼 이름 받아오기
#     #columns = [col[0] for col in cursor.description]
    
#     # 결과를 딕셔너리로 변환
#     #data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    
# #       File "C:\Users\smhrd\Desktop\Study\Project\sideProject\foodRecipe\backend\hello.py", line 53, in post
# #     testQu(sql, value)
# #   File "C:\Users\smhrd\Desktop\Study\Project\sideProject\foodRecipe\backend\db_utils.py", line 47, in testQu
# #     columns = [col[0] for col in cursor.description]
# #               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# # TypeError: 'NoneType' object is not iterable
# # 이 오류가 발생해서 위 두 줄 잠깐 주석처리 함... 흠... 괜찮은 건가,,,

#     # DB 연결 종료
#     db.commit()
#     db.close()
#     return data
