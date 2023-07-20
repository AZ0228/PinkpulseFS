from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import StatisticFinder
from datetime import datetime
from app.mihika import getchoices, getscatter

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
'''
var trace1 = {
  x: [1, 2, 3, 4, 5],
  y: [1, 6, 3, 6, 1],
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  marker: { size: 12 }
};

'''
@app.route('/second')
def second():
    choices = getchoices()
    statistic = StatisticFinder()
    statistic.county.choices=choices
    if statistic.validate_on_submit():
        data = getscatter()
    return render_template('second.html', statisticfinder = statistic)

@app.route('/statisticfinder')
def statisticfinder():
    choices = getchoices()
    statistic = StatisticFinder()
    statistic.county.choices=choices
    data = getscatter()
    x_values = data['x_values']
    y_values = data['y_values']

    return render_template('statistic.html',statisticfinder = statistic, data = data)