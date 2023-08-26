from app import db
from datetime import datetime

#initialize a national county instance that can be accessed for national averages
class CountyData(db.Model):
    name = db.Column(db.String(64),unique=True, primary_key=True)
    amount = db.Column(db.Integer())
    lowIncome = db.Column(db.Integer())
    highMiddleIncome = db.Column(db.Integer())
    black = db.Column(db.Integer())
    indigenous = db.Column(db.Integer())
    asian = db.Column(db.Integer())
    hawaiian = db.Column(db.Integer())
    hispanic = db.Column(db.Integer())
    white = db.Column(db.Integer())
    other = db.Column(db.Integer())
    last_updated = db.Column(db.DateTime(),default=datetime.utcnow)
