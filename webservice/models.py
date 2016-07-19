from shared import db

class Comic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    posted_date = db.Column(db.DateTime)

if __name__ == '__main__':
    db.create_all()
