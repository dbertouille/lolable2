from flask_restful import Resource
from models import Comic
from schemas import ComicSchema

class ComicList(Resource):
    def get(self):
        comics = Comic.query.all()
        return ComicSchema(many=True).dump(comics).data
