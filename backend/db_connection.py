import pymysql

def db_connection():
    db = pymysql.connect(
        host='192.168.1.48',
        user='recipeuser',
        password='12345',
        db='foodrecipe', 
        charset='utf8mb4'
    )
   
# 상현 ip용 커넥션 
# def db_connection():
#     db = pymysql.connect(
#         host='127.0.0.1',
#         user='recipeuser',
#         password='12345',
#         db='foodrecipe', 
#         charset='utf8mb4'
#     )
    
    return db