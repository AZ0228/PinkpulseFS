from mihikaforms import County, county_fips

county_name = 'Alameda County, California'
county = County(county_name)
amount_per_year = county.amount_per_year()
print(amount_per_year)
