import mechanize
import json

response = mechanize.urlopen("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=8d7d6f68ddb8370dd6ae5712e11ca530")
print response
# result = json.loads(response)

