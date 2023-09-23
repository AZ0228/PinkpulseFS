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
import traceback


'''
heroku logs --tail --app pinkpulse
'''


def getchoices():
    ret = [i for i in county_fips] # list of county names
    ret.sort()
    ret.insert(0,(''))
    return ret

def formatamount(amount):
    for entry in amount:
        amount[entry] /= 1000000
    return amount

def formatincome(incomeDistribution):
    total = sum(incomeDistribution)
    new_distribution = [round((i / total) * 100) for i in incomeDistribution]
    return new_distribution


def formatracial(racialDistribution):
    options = ['black','indigenous','asian','hawaiian','hispanic','other']
    white = racialDistribution[5]
    racialDistribution.pop(5)
    pop = []
    offset = 0
    total = sum(racialDistribution)
    for i in range(len(racialDistribution)):
        if racialDistribution[i] == 0:
            pop.append(i)
        else:
            racialDistribution[i] /= total
            racialDistribution[i] *= 100
            racialDistribution[i] = round(racialDistribution[i])
    for i in pop:
        racialDistribution.pop(i-offset)
        options.pop(i-offset)
        offset += 1
    combined = dict(zip(racialDistribution,options))
    sorted_combined = dict(sorted(combined.items(),reverse=True))
    racialdist = list(sorted_combined.keys())
    racialoptions = list(sorted_combined.values())
    racialdist.append(round(100*(white/total)))
    racialoptions.append('white')
    return racialdist, racialoptions


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

@app.route('/getsummary',methods=['GET'])
def getsummary():
    print('Getting summary ...')
    try:
        names = {}
        namesList = []
        coords = []
        with open('app/static/name_poverty.txt','r') as f:
            for line in f:
                # stores name and index as key value pair in dict names
                split = line.split('"')
                print(split)
                names[split[1]] = int(split[0][:-1])
                namesList.append(split[1])
                values = split[2][1:].split(',')
                values =  [float(i) for i in values]
                values[1] /= 1000000
                coord = {"x": values[0], "y": values[1]}
                coords.append(coord)
        ret = {
            'names': names,
            'coords': coords, 
            'namesList': namesList
        }
        return jsonify(ret)

        return 1
    except Exception as e:
        print(e)
        # Handle any errors that might occur during processing
        # Capture the traceback and format it
        error_line = traceback.format_exc().splitlines()[-1]
        error_traceback = traceback.format_exc()

        # Prepare an error message with traceback details and the line number
        error_details = {
            'error': str(e),
            'line_number': error_line,
            'traceback': error_traceback
        }

        return jsonify(error_details), 500


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
        income_dist = formatincome(income_dist)
        racial_dist = county.racial_statistics_women_county() #8-10 seconds
        racial_dist, options = formatracial(racial_dist) 
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
        # Capture the traceback and format it
        error_line = traceback.format_exc().splitlines()[-1]
        error_traceback = traceback.format_exc()

        # Prepare an error message with traceback details and the line number
        error_details = {
            'error': str(e),
            'line_number': error_line,
            'traceback': error_traceback
        }

        return jsonify(error_details), 500
# @Celery.task
# def update_api(name):
#     county = CountyData.query.filter_by(name=name).first()

# least popular counties

'''
imperial county
'''