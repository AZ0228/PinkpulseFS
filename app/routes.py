from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app
from app.forms import StatisticFinder
from datetime import datetime
from app.mihika import getscatter
from periodfinder.forms import County, county_fips
import pandas as pd

def getchoices():
    ret = [i for i in county_fips] # list of county names
    ret.sort()
    ret.insert(0,(''))
    return ret

def formatamount(amount):
    for entry in amount:
        amount[entry] /= 1000000
    return amount

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
    print('stats')
    choices = getchoices()
    statistic = StatisticFinder() # form
    statistic.county.choices=choices
    data = getscatter()
    x_values = data['x_values']
    y_values = data['y_values']

    return render_template('statistic.html',statisticfinder = statistic, data = data)

@app.route('/getdata', methods=['POST','GET'])
def getdata():
    print('Getting data ...')
    try:
        # get the data from the JSON request body
        county_name = request.get_json()
        county_name = county_name['input']
        county = County(county_name)
        amount_per_year = county.amount_per_year()
        amount_per_year = formatamount(amount_per_year)
        income_dist = county.income_distribution_women()
        racial_dist = county.racial_statistics_women_county()
        
        return jsonify(amount_per_year)

    except Exception as e:
        print(2)
        # Handle any errors that might occur during processing
        return jsonify({'error': str(e)}), 500