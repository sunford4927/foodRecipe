

# pip install pymysql
# pip install cryptography 설치해야됨
# MySQL 데이터베이스 연결
# db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='maven', charset='utf8')

# # 데이터에 접근
# cursor = db.cursor()

# # SQL query 작성
# sql = "select * from board"

# # SQL query 실행
# cursor.execute(sql)

# # db 데이터 가져오기
# data = cursor.fetchall() #모든 행 가져오기
# # cursor.fetchone() # 하나의 행만 가져오기
# # cursor.fetchmany(n) # n개의 데이터 가져오기 


# # 수정 사항 db에 저장
# db.commit()
 
# # Database 닫기
#db.close()


def setQuery(sql=None, data = None):
    # MySQL 데이터베이스 연결
    db = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='1234',
        db='maven', 
        charset='utf8'
    )
    
    # 데이터에 접근
    cursor = db.cursor()

    cursor.execute(sql,data)
    
    cursor.execute("select * from board")
    # 결과 받고 컨트롤하기
    data = cursor.fetchall()
    	
    
    # DB 연결 종료
    db.commit()
    db.close()
    return data


import pymysql
# pip install flask_restx
from flask import Flask, jsonify, request, redirect, url_for
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
# app = Flask(__name__)
app = Flask(__name__, static_folder='../build', static_url_path='/') # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록
#===========================================

# Get 은 정보 조회
@api.route('/hello')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        data = setQuery("select * from board")
        return jsonify({'result': data})
    
    def post(self):  # POST 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        input_name = request.form['id_jw']
        print(input_name)
        #input_phone = request.form['input_phone']
        #print(input_name, input_phone)
        # MySQL 데이터베이스 연결
        db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='maven', charset='utf8')

        # 데이터에 접근
        cursor = db.cursor()
        
        # SQL query 작성
        sql = "INSERT INTO board(title, content, writer, img) values(%s,%s,%s,%s)"
        value = ("플라스크제목", input_name, "플라스크작성자", "플라스크이미지.jpg")
        
        # 쿼리 실행
        #cursor = db.cursor()  # default 튜플 타입으로 받기
        # cursor = db.cursor(pymysql.cursors.DictCursor)  # Dictionary 타입으로 받기
        cursor.execute(sql,value)
        
        # 결과 받고 컨트롤하기
        # cursor.execute("select * from board")
        data = cursor.fetchall()
        
        db.commit() # DB 변경사항 저장
        db.close()
        #return jsonify({'result': data})
        return app.send_static_file('index.html') # react 페이지 반환 하는 방법 // 주소로 반환은 안됌
        
        
    
    def delete(self):  # DELETE 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환

        
        #input_name = request.form['input_name']
        #input_phone = request.form['input_phone']
        #print(input_name, input_phone)
        # MySQL 데이터베이스 연결
        db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='maven', charset='utf8')

        # 데이터에 접근
        cursor = db.cursor()
        
        # SQL query 작성
        sql = "DELETE FROM board WHERE title=%s"
        #("delete from LIKELIST where lk_senid = #{lk_senid} and lk_recid = #{lk_recid}")    
        value = ("플라스크제목")
        
        # 쿼리 실행
        cursor.execute(sql,value)

        
        db.commit()
        # cursor.execute("select * from board")
        # data = cursor.fetchall()
        db.close()

        return {"hello": ""}

#================================================
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)