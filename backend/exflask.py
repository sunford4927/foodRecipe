# from urllib import parse

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
        db='recipe', 
        charset='utf8mb4'
    )
    
    # 데이터에 접근
    cursor = db.cursor()

    cursor.execute(sql,data)
    
    cursor.execute("select * from recipe_board limit 2")
    # 결과 받고 컨트롤하기
    data = cursor.fetchall()
    	
    
    # DB 연결 종료
    db.commit()
    db.close()
    return data


import pymysql
import json
# pip install flask_restx
from flask import Flask, jsonify, request, redirect, url_for, make_response
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
# app = Flask(__name__)
app = Flask(__name__, static_folder='../build', static_url_path='/') # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
# 인코딩위해 잠깐 테스트
app.config['JSON_AS_ASCII'] = False
api = Api(app)  # Flask 객체에 Api 객체 등록
#===========================================

# Get 은 정보 조회
@api.route('/hello')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    

    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        data = setQuery("select * from board")
        
        return jsonify({'result': data})
    
    def post(self):
        input_id = request.form['id']
        input_pw = request.form['pw']
        input_nm = request.form['nm']
        input_img = request.form['img']
        sql = "INSERT INTO board(title, content, writer, img) VALUES(%s, %s, %s, %s)"
        value = (input_id, input_pw, input_nm, input_img )
        # value = parse.unquote(value, 'utf8')
        setQuery(sql, value)
        # 한글 인코딩 수정
        response = make_response(json.dumps({'result': value}, ensure_ascii=False))  # JSON 응답 생성 및 한글 깨짐 방지 설정
        response.headers['Content-Type'] = 'application/json; charset=utf-8'  # 응답 헤더 설정
        return response
        
        
    
    def delete(self):  # DELETE 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        #input_DT = request.form['delTest']
        print("getjson : ",request.get_json()['title'])
        # 키 꺼내는 방법 ['']
        print("data : ",request.data)
        
        sql = "DELETE FROM board WHERE title=%s"
        #("delete from LIKELIST where lk_senid = #{lk_senid} and lk_recid = #{lk_recid}")    
        value = request.get_json()['title']
        setQuery(sql,value)
        response = make_response(json.dumps({'hello': value}, ensure_ascii=False))  # JSON 응답 생성 및 한글 깨짐 방지 설정
        response.headers['Content-Type'] = 'application/json; charset=utf-8'  # 응답 헤더 설정
        return response
        

# 레시피보드 테이블 데이터 전체 select하는 쿼리문,, 클래스,,?
@api.route('/MainBoard')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class MainBoard(Resource):
    

    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        data = setQuery("select * from recipe_board limit 2")
        
        return jsonify({'result': data})
#================================================
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)