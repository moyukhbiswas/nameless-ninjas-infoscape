import mechanize
import googlemaps
from datetime import datetime
from bs4 import BeautifulSoup
import sys
import urllib, urllib2
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.keys import Keys

#binary = FirefoxBinary('/c/Program Files (x86)/Mozilla Firefox')
#driver = webdriver.Firefox(firefox_binary=binary)

#driver.get("http://www.whatshot.in/hyderabad/events/this-week/")
#driver.execute_script("document.getElementsByClassName('btn btn-primary')[0].click()")

gmaps = googlemaps.Client(key='AIzaSyDL6xi38IAq4CDd6lh_JvAkgDgHUQV-zM4')

tag = str(sys.argv[1])
response = mechanize.urlopen("http://www.whatshot.in/hyderabad/tag/" + tag)
# response.read().

soup = BeautifulSoup(response.read(), 'html.parser')
events = soup.body.find_all(attrs={ "class":"the-box no-margin no-border" })
events_list = []

for event in events:
    ev = []
    t = event.find(attrs={"class":"feed-title"})
    ev.append(t.text)
    t = event.find(attrs={"class":"time"})
    if t == None:
        continue
    date = t.text.split(' -', 1)[0]
    ev.append(date)
    t = event.find(attrs={"class":"landmark"})
    addr = t.text
    geocode_result = gmaps.geocode(addr)
    approx_loc = geocode_result[0]['geometry']['location']
    result = [approx_loc['lat'], approx_loc['lng']]
    ev.append(str(result))
    events_list.append(ev)
#    print result
#    print ev

for event in events_list:
    print str(event)
