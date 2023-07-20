from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
csrf = CSRFProtect(app)

from app import routes