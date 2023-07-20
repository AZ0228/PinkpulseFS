'''
mihika's code goes here
'''

class ScatterPlot:
    def __init__(self, x_values, y_values):
        self.x_values = x_values
        self.y_values = y_values

def getchoices():
    return [('county1','alameda county'),('county2','fremont county')]

def getscatter():
    return {'x_values':[1,5,6,4,3,5],'y_values':[5,6,4,7,8,5]}