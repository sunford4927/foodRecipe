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
    
    # cursor.execute("select * from board")

    # cursor.execute("select * from recipe_board limit 20")
    # 결과 받고 컨트롤하기

     # cursor.description 사용
    # for desc in cursor.description:
    #     print(desc)

    # 컬럼 이름 받아오기
    columns = [col[0] for col in cursor.description]
    
    # 결과를 딕셔너리로 변환
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    # print(data[0])

    # data = cursor.fetchall()
    # print("col : ",cursor.description)	
    # print("val : ",data)	
    
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
        data = setQuery("select * from recipe_board limit 20")
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
        

# 메인보드(기본화면)에 필요한 데이터 전송하는 쿼리문 클래스
@api.route('/MainBoard') 
class MainBoard(Resource):

    def get(self): 
        # 게시글 번호, 유저아이디, 커멘트, 평점 
        value = request.args.to_dict()
        num = (int(value['page']) - 1) * 100
        # offset 부분 (페이지 번호 - 1) * 100 

        # print(value["page"])
        data = setQuery("""select CK_ACT_NM, CK_STA_NM, CK_INPUT_NM, CK_KIND_NM, recipe_board.RCP_SNO, 
                        RCP_TTL, USER_NM, VIEW_CNT, REVEIW_CNT 
                        from recipe_board 
                        join board_info 
                        on recipe_board.RCP_SNO = board_info.RCP_SNO limit 100 offset %s """, num) 
        # data = [obj.__dict__ for obj in data]
        # get 방식 데이터 받아오는 방법 : print(request.args.to_dict())
        print(len(data))

        return jsonify(data)
    

# 전체 정보 조회 클래스
@api.route('/all_info', methods=['GET']) 
class all_info(Resource):

    def get(self): 
        data = setQuery("select COUNT(*) AS totalCnt from recipe_board")
        # 전달하는 데이터의 키 값은 totalCnt
        print(data)
        print(request.data)
        return jsonify(data)
    
    # def post(self):
    #     # 게시글 번호, 유저아이디, 커멘트, 평점 
    #     # 1번 게시글 후기 수 2개
    #     data = setQuery("인설트 프롬 테이블 recipe_review") 
    #     # 1번 게시글 후기 수 3개
    #     setQuery("insert  카운터 (셀렉트 where rCp_sno = 1번게시글 프롬 recipe_review) 프롬 테이블 board_info") 

#================================================
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)