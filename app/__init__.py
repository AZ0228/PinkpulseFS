from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_wtf.csrf import CSRFProtect
from .config import Config
# from celery import Celery

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
csrf = CSRFProtect(app)
# celery = Celery(__name__, broker=Config.CELERY_BROKER_URL)

from app import routes, models