from flask import Flask
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_restful.utils import cors
from flask_sqlalchemy import SQLAlchemy

app = Flask('lolws')
app.config.from_pyfile('lolws.cfg')
api = Api(app, decorators=[cors.crossdomain(origin='*')])
db = SQLAlchemy(app)
ma = Marshmallow(app)
