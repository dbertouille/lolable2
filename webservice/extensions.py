from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = None
ma = None

def init_extensions(app):
    global db
    global ma

    db = SQLAlchemy(app)
    ma = Marshmallow(app)