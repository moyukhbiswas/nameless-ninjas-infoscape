import MySQLdb
import threading
import time
db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="root",  # your password
                     db="database")        # name of the data base
cur=db.cursor()


'''
safety
hazard
events
road
offers
publicServices
crowd



'''

def printit():
	while(True):
	cur = db.cursor()

	# Use all the SQL you like
	cur.execute("SELECT * FROM msgs where relevant = 1 and (upvotes - downvotes < -4)")
	irrelevant = []
	irr = 0
	# print all the first cell of all the rows
	for row in cur.fetchall():
	    timestamp = int(row[4])
	    currentTime = int(time.time())
	    if currentTime - timestamp > 60000:
	    	irrelevant.append(row[0])

	# sql = ("""update msgs set relevant=%s where id IN %s""",(irr)) 
	sql = "update msgs set relevant=0 where id IN " + str(irrelevant)
	cursor.execute(sql)
	db.close()

printit()