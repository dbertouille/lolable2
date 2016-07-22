from shared import db

class ComicModel(db.Model):
    __tablename__ = 'comic'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    posted_date = db.Column(db.DateTime)

if __name__ == '__main__':
    db.create_all()
