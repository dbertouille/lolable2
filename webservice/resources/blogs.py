from flask_restful import Resource
from models import BlogModel
from schemas import BlogSchema

from utils import json_response

class BlogList(Resource):
    @json_response
    def get(self):
        blogs = BlogModel.query.filter(BlogModel.comic_id == None).all()
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
