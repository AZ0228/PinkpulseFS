from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, InputRequired

class StatisticFinder(FlaskForm):
    county = SelectField('select county', choices=[], validators=[InputRequired()])
    submit = SubmitField('submit')


