from flask_restful import Resource
from models import ComicModel
from schemas import ComicSchema
from sqlalchemy.sql import func

from utils import json_response

class ComicList(Resource):
    @json_response
    def get(self):
        comics = ComicModel.query.all()
        return 200, ComicSchema(many=True).dump(comics).data

class Comic(Resource):
    @json_response
    def get(self, id):
        comic = None
        if isinstance(id, int):
            comic = ComicModel.query.get(id)
        elif isinstance(id, basestring):
            if id == 'newest':
                comic = ComicModel.query.order_by(
                  ComicModel.id.desc()).limit(1).first()
            elif id == 'oldest':
                comic = ComicModel.query.order_by(
                  ComicModel.id).limit(1).first()
            elif id == 'random':
                # XXX - This call may change depending on the database
                # being used.
                comic = ComicModel.query.order_by(
                  func.random()).limit(1).first()
        if comic is None:
            return 404, {}
        return 200, ComicSchema().dump(comic).data
