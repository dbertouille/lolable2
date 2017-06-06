import flask_scrypt

from shared import db

class ArchiveItemModel():
    def __init__(self, item_type, data):
        self.item_type = item_type
        self.comic = data if item_type == 'comic' else None
        self.media = data if item_type == 'media' else None

class BlogModel(db.Model):
    __tablename__ = 'blog'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    blog = db.Column(db.String)
    posted_date = db.Column(db.DateTime)
    comic_id = db.Column(db.Integer, db.ForeignKey('comic.id'), unique=True)

class ComicModel(db.Model):
    __tablename__ = 'comic'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    posted_date = db.Column(db.DateTime)

class ConfigurationModel(db.Model):
    __tablename__ = 'configuration'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String)
    value = db.Column(db.String)

class MediaModel(db.Model):
    __tablename__ = 'media'

    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.String)
    title = db.Column(db.String)
    url = db.Column(db.String)
    thumb_url = db.Column(db.String)
    posted_date = db.Column(db.DateTime)

class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    passhash = db.Column(db.String)
    passsalt = db.Column(db.String)
    admin = db.Column(db.Boolean)

    def set_password(self, ptext):
        self.passsalt = flask_scrypt.generate_random_salt()
        self.passhash = flask_scrypt.generate_password_hash(
          ptext,
          self.passsalt)

    def check_password(self, ptext):
        # XXX - There could be issues casting unicode to string here
        return flask_scrypt.check_password_hash(
          str(ptext),
          str(self.passhash),
          str(self.passsalt))

if __name__ == '__main__':
    db.create_all()
