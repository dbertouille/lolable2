from shared import db

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

if __name__ == '__main__':
    db.create_all()
