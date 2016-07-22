from flask import Flask
from flask_restful import Api

from resources import Comic, ComicList
from shared import api, app

api.add_resource(ComicList, '/comics')
api.add_resource(Comic, '/comics/<string:id>', '/comics/<int:id>')

if __name__ == '__main__':
    app.run()
