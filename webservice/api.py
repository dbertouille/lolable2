from flask import Flask
from flask_restful import Api

from resources import ComicList
from shared import api, app

api.add_resource(ComicList, '/comics')

if __name__ == '__main__':
    app.run()
