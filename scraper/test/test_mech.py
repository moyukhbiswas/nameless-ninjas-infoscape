import mechanize

browser = mechanize.Browser()
response = mechanize.urlopen("http://www.whatshot.in/hyderabad/events/today/")
print response.read()
