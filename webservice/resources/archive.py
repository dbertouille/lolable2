from flask import request
from flask_restful import Resource
from models import ArchiveItemModel, ComicModel, MediaModel
from schemas import ArchiveItemSchema
from sqlalchemy import text
from sqlalchemy.sql import func

from extensions import db
from utils import json_response

class ArchiveList(Resource):
    @json_response
    def get(self):
        limit = request.args.get('limit')
        if limit is None:
            limit = 10

        offset = request.args.get('offset')
        if offset is None:
            offset = 0

        search = request.args.get('search')
        if search is None:
            search = ''

        sql = text("""
            SELECT 'comic' AS item_type, id, posted_date FROM comic WHERE title LIKE :search
                UNION 
            SELECT 'media' AS item_type, id, posted_date FROM media WHERE title LIKE :search
            ORDER BY posted_date DESC
            LIMIT :limit 
            OFFSET :offset
        """)

        result = db.engine.execute(
            sql,
            {
                'search': '%' + search + '%',
                'limit': int(limit),
                'offset': int(offset)
            }
        )
        items = []
        for row in result:
            data = None
            if row[0] == 'comic':
                data = ComicModel.query.get(row[1])
            elif row[0] == 'media':
                data = MediaModel.query.get(row[1])
            items.append(ArchiveItemModel(row[0], data))

        return 200, ArchiveItemSchema(many=True).dump(items).data
