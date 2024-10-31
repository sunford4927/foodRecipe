import json
from flask_restx import Resource
from flask import jsonify, request, make_response
from db_utils import testQu
  
class test(Resource):
    def post(self): 
       
        # print(request.get_json())
        # print("getjson1 : ",request.get_json()['data']['name'])
        # print("getjson2 : ",request.get_json()['data']['id'])
        # print("getjson3 : ",request.get_json()['data']['pw'])
        # print("getjson4 : ",request.get_json()['data']['nm'])
        # 키 꺼내는 방법 ['']
        # print("data : ",request.data)    
        sql = "INSERT INTO TEST(NAME, ID, PW, NM) VALUES(%s, %s, %s, %s)"
        value = request.get_json()['data']['name'], request.get_json()['data']['id'], request.get_json()['data']['pw'], request.get_json()['data']['nm']

        testQu(sql, value)
        return "ok"
    

    def delete(self):  
        # print(request.get_json())
        # print("deljson1 : ",request.get_json()['name'])

        sql = "delete from test where name = (%s)"
        value = request.get_json()['name']
        testQu(sql, value)

        return "ok"



class HelloWorld(Resource):
    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        data = testQu("select * from test")
        return jsonify({'result': data})
    
    def post(self):
        input_id = request.form['id']
        input_pw = request.form['pw']
        input_nm = request.form['nm']
        input_img = request.form['img']
        sql = "INSERT INTO TEST(NAME, ID, PW, NM) VALUES(%s, %s, %s, %s)"
        value = (input_id, input_pw, input_nm, input_img )
        # value = parse.unquote(value, 'utf8')
        testQu(sql, value)
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
        testQu(sql,value)
        response = make_response(json.dumps({'hello': value}, ensure_ascii=False))  # JSON 응답 생성 및 한글 깨짐 방지 설정
        response.headers['Content-Type'] = 'application/json; charset=utf-8'  # 응답 헤더 설정
        return response
