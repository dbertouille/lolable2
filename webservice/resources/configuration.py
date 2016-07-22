from flask_restful import Resource
from models import ConfigurationModel
from schemas import ConfigurationSchema

from utils import json_response

class ConfigurationList(Resource):
    @json_response
    def get(self):
        configs = ConfigurationModel.query.all()
        return 200, ConfigurationSchema(many=True).dump(configs).data
