from flask import Flask
from flask_restx import Api
from flask_cors import CORS

# from hello import test
from MainBoard import MainBoard, AllInfo 
from RankBoard import getrank
from CategoryBoard import category, cateCnt

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)  # CORS 설정 추가
app.config['JSON_AS_ASCII'] = False
api = Api(app)


# import한 py파일 중 클래스를 API에 추가.. 경로 지정한 겨
# api.add_resource(test, '/HelloTest')
# api.add_resource(test, '/deltest')
api.add_resource(AllInfo, '/all_info')
api.add_resource(MainBoard, '/MainBoard')
api.add_resource(getrank, '/getrank')
api.add_resource(category, '/category_board')
api.add_resource(cateCnt, '/category_cnt')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
