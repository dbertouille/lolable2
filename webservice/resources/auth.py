from flask import request
from flask_restful import Resource

from models import UserModel
from schemas import UserSchema
from utils import json_response

class Authenticate(Resource):
    @json_response
    def post(self):
        username = request.form['username']
        password = request.form['password']
        if username is None or password is None:
            return 401, {}
        # XXX - A timing attack could probably be used to enumerate users here
        user = UserModel.query.filter_by(username=username).first()
        if user is None:
            return 401, {}
        if not user.check_password(password):
            return 401, {}
        return 200, 'Success'

