import numpy as np
from datascience import *
import matplotlib
import matplotlib.pyplot as plt
plt.style.use ('fivethirtyeight')
import warnings
warnings.simplefilter ('ignore', FutureWarning)
import pandas as pd
from census import Census
from us import states
#from ignore1.Object import Key

our_census_1 = Census("79afea12a3a55715e84ca7862689e5d86709f14e")

#COUNTY CODES AND NAMES
county_fips = {}
county_codes_names = our_census_1.acs1dp.get(('NAME'), geo={'for': 'county:*',
                       'in': 'state:{}'.format(states.CA.fips)})
for i in county_codes_names:
    my_dict = i
    county_fips[my_dict['NAME']] = my_dict['county']

class Tree:
    def __init__(self, label, branches =[]):
        self.label = label
        for branch in branches: 
            assert isinstance (branch, Tree)
        self.branches = list(branches)
        self = [self.label] + self.branches
    def __repr__ (self):
        if self.branches:
            branches_str = ', ' + repr(self.branches)
        else: 
            branches_str = ''
        return "Tree ({}, {})".format(str(self.label), branches_str)
    def is_leaf(self):
        return not self.branches
    #####
    def is_tree(tree):
        if type(tree) != list or len(tree) <1:
            return False
        for branch in tree.branches: 
            if not tree.is_tree: 
               return False 
        return True
    def tree1 (label, branches =[]):
        for branch in branches:
            assert branch.is_tree
        return [label] + list(branches)
    def label (tree):
        return tree[0]
    def branches(tree):
        return tree[1:] 
    


#NEED TO ADD A IS_TREE METHOD
        
#class county_tree(Tree):

def national_finder_acs1dp (variable):
        x = []
        variable_dict = our_census_1.acs1dp.get((variable), geo={'for': 'county: *',
                       'in': 'state: *'})
        for i in variable_dict:
            if i[variable]:
                x = np.append(x, i[variable])
            else: 
                x = np.append(x, 0)
        national_average = np.average(x)
        return float(national_average)

def national_finder_acs1 (variable):
        x = []
        variable_dict = our_census_1.acs1.get((variable), geo={'for': 'county: *',
                       'in': 'state: *'})
        for i in variable_dict:
            if i[variable]:
                x = np.append(x, i[variable])
            else: 
                x = np.append(x, 0)
        national_average = np.average(x)
        return float(national_average)
    
def state_finder_acs1dp (variable):
        x = []
        variable_dict = our_census_1.acs1dp.get((variable), geo={'for': 'county: *',
                       'in': 'state: {}'.format(states.CA.fips)})
        for i in variable_dict:
            if i[variable]:
                x = np.append(x, i[variable])
            else: 
                x = np.append(x, 0)
        national_average = np.average(x)
        return float(national_average)

def state_finder_acs1 (variable):
        x = []
        variable_dict = our_census_1.acs1.get((variable), geo={'for': 'county: *',
                       'in': 'state: {}'.format(states.CA.fips)})
        for i in variable_dict:
            if i[variable]:
                x = np.append(x, i[variable])
            else: 
                x = np.append(x, 0)
        national_average = np.average(x)
        return float(national_average)
        
    

class County:
    national_dictionary = {}

    def __init__ (self, name):
        self.name = name #Name of form Alameda county
        self.code = county_fips [self.name]
        #county_codes #Keeps track of all county objects been created
        self.feature_dictionary = {}
    
    def find_statistic_acs1dp (self, attribute):
        our_census_1 = Census ("79afea12a3a55715e84ca7862689e5d86709f14e")
        x = our_census_1.acs1dp.get((attribute), geo={'for': 'county: {}'.format(self.code),
                       'in': 'state:{}'.format(states.CA.fips)})
        self.feature_dictionary[attribute] = x[0][attribute] #ADDS TO SELF DICT
        if not x[0][attribute]: 
            return 0
        else: 
            return float(x[0][attribute])
    
    def find_statistic_acs1 (self, attribute):
        our_census_1 = Census ("79afea12a3a55715e84ca7862689e5d86709f14e")
        x = our_census_1.acs1.get((attribute), geo={'for': 'county: {}'.format(self.code),
                       'in': 'state:{}'.format(states.CA.fips)})
        self.feature_dictionary[attribute] = x[0][attribute] #ADDS TO SELF DICT
        #TRACKS TOTAL CALLS
        if not x[0][attribute]: 
            return 0
        else: 
            return float(x[0][attribute])
    
    def return_dictionary (self):
        return self.feature_dictionary
    
    
    def amount_per_year (self): 
        menstruators_under_18 = 0.5 * ((self.find_statistic_acs1dp("DP05_0003E")) - (self.find_statistic_acs1dp("DP05_0027E")))
        menstruators_over_18 = self.find_statistic_acs1dp("DP05_0027E") - self.find_statistic_acs1dp("DP05_0031E")
        total_women_in_area = menstruators_under_18 + menstruators_over_18
        amount_spent = total_women_in_area * 12 * 20
        self.feature_dictionary['County Amount Spent'] = amount_spent
        national_average = (0.5 * (national_finder_acs1dp ("DP05_0003E")-national_finder_acs1dp ("DP05_0027E")) + 
                            national_finder_acs1dp ("DP05_0027E") - national_finder_acs1dp ("DP05_0031E")) * 12 * 20
        state_average = (0.5 * (state_finder_acs1dp("DP05_0003E")-state_finder_acs1dp("DP05_0027E")) + 
                            state_finder_acs1dp("DP05_0027E") - state_finder_acs1dp("DP05_0031E")) * 12 * 20   
        table = {
            'County Average': amount_spent,
            'State Average': state_average,
            'National Average': national_average
        }
        return table #{"County Average": amount_spent, "State Average" : state_average, "National Average":national_average}
    
    def income_distribution_women (self):
        low_income = self.find_statistic_acs1("B17001_017E")
        total_women = self.find_statistic_acs1dp ("DP05_0003E")
        table1 = Table().with_column("Income Level", ["Low Income", "Middle to High Income"]).with_column("Statistic", [low_income,  total_women-low_income])
        if 'County Amount Spent' in self.feature_dictionary.keys():
            amount = float(self.feature_dictionary['County Amount Spent'])
            proportion = float(low_income/(total_women))
            m = 'This County spends ${} per year on menstrual products, and approximately ${} comes from low income individuals.'.format(amount, (amount*proportion))
            k = 'Approximately {} percent of this county is low income.'.format(proportion*100)
        else:
            m, k = [], []
        print (m)
        print (k)
        return table1
    


    def racial_statistics_women_county(self):
        #RAW COUNTY STATISTICS
        def racial_statistics_women_national():
            black_women1 = national_finder_acs1("B17001B_017E")
            indigenous_women1 = national_finder_acs1("B17001C_017E")
            asian_women1 = national_finder_acs1("B17001D_017E")
            hawaiian_women1 = national_finder_acs1 ("B17001E_017E")
            other_women1 = national_finder_acs1 ("B17001F_017E")
            hispanic_women1 = national_finder_acs1 ("B17001I_017E")
            white_women1 = national_finder_acs1 ("B17001A_017E")
            minority_women = [black_women1, indigenous_women1, asian_women1, hawaiian_women1, other_women1, hispanic_women1]
            all_women = [black_women1, indigenous_women1, asian_women1, hawaiian_women1, other_women1, hispanic_women1, white_women1]
            return float(sum(minority_women))/float(sum(all_women))
        black_women = self.find_statistic_acs1("B17001B_017E")
        indigenous_women = self.find_statistic_acs1("B17001C_017E")
        asian_women = self.find_statistic_acs1("B17001D_017E")
        hawaiian_women = self.find_statistic_acs1("B17001E_017E")
        other_women = self.find_statistic_acs1("B17001F_017E")
        hispanic_women = self.find_statistic_acs1("B17001I_017E")
        white_women = self.find_statistic_acs1("B17001A_017E")
        minority_women = [black_women, indigenous_women, asian_women, hawaiian_women, other_women, hispanic_women]
        all_women = [black_women, indigenous_women, asian_women, hawaiian_women, other_women, hispanic_women, white_women]
        county_proportion = float(sum(minority_women))/float(sum(all_women))
        national_proportion = racial_statistics_women_national()
        print('Racial minorities make up {} % of low-income menstruators in this county'.format(100*county_proportion))
        print ('That is {} times the national average'.format(float(county_proportion/national_proportion)))
        if float(county_proportion/national_proportion) > 1 :
            print ('This is also {}'.format(((float(county_proportion/national_proportion))-1)*100), 'percent higher than the national average.')
        table1 = Table().with_column("Race", ['Black', 'Indigenous', 'Asian', 'Hawaiian', 'Other', 'Hispanic', 'White']).with_column(
            "Statistic", all_women)
        return table1



        

        
        