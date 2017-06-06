from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from extensions import *

app = Flask('lolws')
app.config.from_pyfile('lolws.cfg')
api = Api(app, decorators=[cors.crossdomain(origin='*')])
init_extensions(app)

from resources import *

api.add_resource(Authenticate, '/authenticate')

api.add_resource(ArchiveList, '/archive')

api.add_resource(BlogList, '/blogs')
api.add_resource(Blog, '/blogs/<int:blog_id>', '/comics/<int:comic_id>/blog')

api.add_resource(ComicList, '/comics')
api.add_resource(Comic, '/comics/<string:id>', '/comics/<int:id>')

api.add_resource(ConfigurationList, '/configuration')

if __name__ == '__main__':
    app.run(threaded=True)
