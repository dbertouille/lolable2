from flask import Flask
from flask_restful import Api

from resources import Comic, ComicList, ConfigurationList
from shared import api, app

api.add_resource(ComicList, '/comics')
api.add_resource(Comic, '/comics/<string:id>', '/comics/<int:id>')

api.add_resource(ConfigurationList, '/configuration')

if __name__ == '__main__':
    app.run(threaded=True)
