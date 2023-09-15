from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app
from app.forms import StatisticFinder
from datetime import datetime
from app.mihika import getscatter
from app.mihikaforms import County, county_fips
import pandas as pd
# from celery import Celery
from app.models import CountyData
from app.test import Test

def getchoices():
    ret = [i for i in county_fips] # list of county names
    ret.sort()
    ret.insert(0,(''))
    return ret

def formatamount(amount):
    for entry in amount:
        amount[entry] /= 1000000
    return amount

def formatracial(racialDistribution):
    options = ['black','indigenous','asian','hawaiian','hispanic','white','other']
    for i in range(len(racialDistribution)-1):
        if racialDistribution[i] == 0:
            racialDistribution.pop(i)
            options.pop(i)
        elif i != len(racialDistribution)-1:
            if racialDistribution[i] < racialDistribution[i+1]:
                storage = racialDistribution[i] , options[i]
                racialDistribution[i] = racialDistribution[i+1]
                options[i] = options[i+1]
                racialDistribution[i+1] = storage[0]
                options[i+1] = storage[1]
    return racialDistribution, options  


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/second')
def second():
    choices = getchoices()
    choices.insert(0,'test')
    statistic = StatisticFinder()
    statistic.county.choices=choices
    return render_template('statistic.html', statisticfinder = statistic)

@app.route('/statisticfinder')
def statisticfinder():
    print('stats')
    choices = getchoices()
    choices.insert(0,'test')
    statistic = StatisticFinder() # form
    statistic.county.choices=choices
    # task = update_api.apply_async()
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
        if county_name == 'test':
            county = Test()
        else: 
            county = County(county_name)
        amount_per_year = county.amount_per_year()
        amount_per_year = formatamount(amount_per_year) #8 seconds
        income_dist = county.income_distribution_women() # 5 seconds -> 0 seconds
        racial_dist = county.racial_statistics_women_county() #8-10 seconds
        racial_dist, options = formatracial(racial_dist) # 0 seconds
        racial = [racial_dist, options]
        ret = {
            'amount_per_year': amount_per_year,
            'income_dist': income_dist,
            'racial_dist': racial
        }
        return jsonify(ret)
    except Exception as e:
        print(e)
        # Handle any errors that might occur during processing
        return jsonify({'error': str(e)}), 500

# @Celery.task
# def update_api(name):
#     county = CountyData.query.filter_by(name=name).first()

# least popular counties

'''
imperial county
'''