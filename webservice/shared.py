from flask import Flask
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask('lolws')
app.config.from_pyfile('lolws.cfg')
api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
