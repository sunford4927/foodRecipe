from flask import Flask
from flask_restx import Api
from flask_cors import CORS
import ssl  # SSLContext를 사용하기 위한 ssl 모듈

from MainBoard import MainBoard, AllInfo 
from RankBoard import getrank
from DetailInfo import detailInfo, getComment, getReview
from categoryBoard import category, cateCnt
from UploadBoard import upLoadRC
from User import insertUser

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)  # CORS 설정 추가
# CORS(app, origins="http://localhost:3000")
app.config['JSON_AS_ASCII'] = False
api = Api(app)

# SSL 인증서와 키 파일 설정 (ssl.SSLContext 사용)
context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
context.load_cert_chain(certfile='C:\\Users\\lee\\Desktop\\workspace\\recipy\\foodRecipe\\backend\\server-cert.pem',
                        keyfile='C:\\Users\\lee\\Desktop\\workspace\\recipy\\foodRecipe\\backend\\private-key.pem')

# API 리소스 설정
api.add_resource(AllInfo, '/all_info')
api.add_resource(MainBoard, '/MainBoard')
api.add_resource(getrank, '/getrank')
api.add_resource(category, '/category_board')
api.add_resource(cateCnt, '/category_cnt')
api.add_resource(detailInfo, '/detail_board')
api.add_resource(getReview, '/getReview')
api.add_resource(getComment, '/getComment')
api.add_resource(upLoadRC, '/upLoadRC')
api.add_resource(insertUser, '/userInfo')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True, ssl_context=context)
