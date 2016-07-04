import requests
import sys

post_data = {}

name = str(sys.argv[1])
text_file = open("whatshot_formatted/" + name + ".txt", 'r')
line = text_file.readline()
while not line == '':
    line = line.translate(None, '[]\n')
#    print line
    contents = line.split("', ")
    contents[0] = contents[0][2:-1]
    contents[1] = contents[1][2:]
    contents[2] = contents[2][1:-1].split(',')
    post_data["category"] = "Events"
    post_data["email"] = "admin"
    post_data["lat"] = contents[2][0]
    post_data["long"] = contents[2][1]
    print post_data
    post_response = requests.post(url='http://10.86.113.27:8011/bootstrap', data=post_data)
    line = text_file.readline()
