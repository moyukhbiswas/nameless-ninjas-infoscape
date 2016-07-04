import MySQLdb
from flask import Flask, redirect, url_for, request,jsonify
import json,flask
from flask_socketio import SocketIO, emit,send
app = Flask(__name__)
socketio = SocketIO(app)

db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="root",  # your password
                     db="hack")        # name of the data base

cursor = db.cursor()

"""
Sample Input JSON
{
	"name":
	"email":
	"pwd":
}
"""
@app.route('/register',methods=["POST"])
def register():
	name = request.form['name']
	email = request.form['email']
	try:
		sql = ("""INSERT INTO users (name,email) VALUES (%s,%s)""",(name,email))
	except MySQLdb.IntegrityError:
		return "duplicate"

	cursor.execute(*sql)
	db.commit()
	return "success"

"""
Sample Input JSON
{
	"email":
	"pwd":
}
"""
@app.route('/login',methods=["POST"])
def login():
	email = request.form['email']
	pwd = request.form['pwd']
	sql = ("""select * from users where email=%s""",(email,))
	cursor.execute(*sql)
	user_details = cursor.fetchall()
	if len(user_details)!=0:
		if pwd == user_details[0][2]:
			return user_details[0][0]
		else:
			return "invalid"
	else:
		return "invalid"

"""
Sample Input JSON
{
	"category":
	"sub_cat": OPTIONAL
	"email": 
	"msg": OPTIONAL
	"lat"
	"long"
}
"""
@app.route('/add_msg',methods=["POST"])
def add_info():
	email = request.form['email']
	cat = request.form['category']
	lat = request.form['lat']
	longitude = request.form['longitude']
	sub_cat = None
	if "sub_cat" in request.form:
		sub_cat = request.form['sub_cat']
	msg = None
	if "msg" in request.form:
		msg = request.form["msg"]

	sql = ("""INSERT INTO msgs (category,sub_category,email,msg,lat,longitude) VALUES (%s,%s,%s,%s,%s,%s)""",(cat,sub_cat,email,msg,lat,longitude))
	cursor.execute(*sql)
	db.commit()
	return "success"

@app.route('/bootstrap',methods=["POST"])
def bootstrap():
	email = request.form['email']
	cat = request.form['category']
	lat = request.form['lat']
	longitude = request.form['long']
	sub_cat = None
	if "sub_cat" in request.form:
		sub_cat = request.form['sub_cat']
	msg = None
	if "msg" in request.form:
		msg = request.form["msg"]

	sql = ("""INSERT INTO msgs (category,sub_category,email,msg,lat,longitude) VALUES (%s,%s,%s,%s,%s,%s)""",(cat,sub_cat,email,msg,lat,longitude))
	cursor.execute(*sql)
	db.commit()
	return "success"


@app.route('/get_info',methods=["GET"])
def get_info():
	email = request.args.get('email')
	sql = ("""select * from msgs where relevant=1 order by (upvotes-downvotes) desc""")
	cursor.execute(sql)
	messages = cursor.fetchall()
	response = {}
	merge_check = {}
	for message in messages:
		if message[1] not in response:
			response[message[1]] = {}
		if message[2] not in response[message[1]]:
			response[message[1]][message[2]] = {}
		temp2 = str(float(message[7])) + "$" +  str(float(message[8]))
		if temp2 not in response[message[1]][message[2]]:
			response[message[1]][message[2]][temp2] = []
		
		temp = [message[9],message[5],message[6],message[3],message[0]]
		response[message[1]][message[2]][temp2].append(temp)
	return json.dumps(response)

"""
Sample Input JSON
{
	"id":
	"email": 
	"vote": 
}
"""
@app.route('/add_vote',methods=["POST"])
def add_vote():
	vote = request.form["vote"]
	iD = request.form["iD"]
	email = request.form["email"]
	
	sql = ("""select * from votes where email=%s and msg_id=%s""",(email,iD))
	cursor.execute(*sql)
	temp = cursor.fetchall()
	if len(temp)!=0:
		sql=("""DELETE FROM votes where email=%s and msg_id=%s""",(email,iD))
		cursor.execute(*sql)
		sql = ("""select upvotes,downvotes from msgs where id=%s""",(iD,))
		cursor.execute(*sql)
		msg = cursor.fetchall()
		vote = int(vote)
		if vote == -1:
			new_downvotes = msg[0][1] - 1
			sql = ("""update msgs set downvotes=%s where id=%s """,(new_downvotes,iD))
		elif vote == 1:
			print "adasd"
			new_upvotes = msg[0][0] - 1
			sql = ("""update msgs set upvotes=%s where id=%s """,(new_upvotes,iD))
		cursor.execute(*sql)
		db.commit()

	sql = ("""INSERT into votes (vote,email,msg_id) VALUES (%s,%s,%s)""",(vote,email,iD))
	cursor.execute(*sql)
	sql = ("""select upvotes,downvotes from msgs where id=%s""",(iD,))
	cursor.execute(*sql)
	msg = cursor.fetchall()
	vote = int(vote)
	if vote == -1:
		new_downvotes = 1 + msg[0][1]
		sql = ("""update msgs set downvotes=%s where id=%s """,(new_downvotes,iD))
	elif vote == 1:
		new_upvotes = 1 + msg[0][0]
		sql = ("""update msgs set upvotes=%s where id=%s """,(new_upvotes,iD))
	cursor.execute(*sql)
	db.commit()
	return "success"

@app.route('/realtime_hack',methods=["POST"])
def realtime_hack():
	sent_so_far = request.form["id"]
	sql = ("""select * from msgs where relevant=1 and id>%s""",(sent_so_far,))
	cursor.execute(*sql)
	messages = cursor.fetchall()
	response = {}
	merge_check = {}
	for message in messages:
		if message[1] not in response:
			response[message[1]] = []
			merge_check[message[1]] = []
		if (message[7],message[8],message[1]) not in merge_check[message[1]]:
			temp = {}
			temp["lat"] = float(message[7])
			temp["longitude"] = float(message[8])
			temp["msg"] = message[9]
			temp["up"] = message[5]
			temp["down"] = message[6]
			temp["email"] = message[3]
			temp["subcat"] = message[2]
			response[message[1]].append(temp)
			merge_check[message[1]].append((message[7],message[8],message[1]))
	return json.dumps(response)


if __name__ == "__main__":
	app.debug = True
	app.run(host="0.0.0.0",port=8010)