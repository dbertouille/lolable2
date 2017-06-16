from flask import request
from flask_restful import Resource
from models import BlogModel
from schemas import BlogSchema

from utils import json_response

class BlogList(Resource):
    @json_response
    def get(self):
        limit = request.args.get('limit')
        if limit is None:
            limit = 10

        offset = request.args.get('offset')
        if offset is None:
            offset = 0

        blogs = BlogModel.query.filter(BlogModel.comic_id == None)  \
            .order_by(BlogModel.id.desc())                          \
            .limit(limit)                                           \
            .offset(offset)                                         \
            .all()

        return 200, BlogSchema(many=True).dump(blogs).data

class Blog(Resource):
    @json_response
    def get(self, blog_id=None, comic_id=None):
        blog = None
        if blog_id is not None:
            blog = BlogModel.query.get(blog_id)
        elif comic_id is not None:
            blog = BlogModel.query.filter_by(comic_id=comic_id).first()
        if blog is None:
            return 404, {}
        return 200, BlogSchema().dump(blog).data
