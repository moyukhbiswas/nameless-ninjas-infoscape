import MySQLdb
from flask import Flask, redirect, url_for, request
app = Flask(__name__)

db = MySQLdb.connect(host="10.86.114.39",    # your host, usually localhost
                     user="root",         # your username
                     passwd="root",  # your password
                     db="database")        # name of the data base
print "lol"

cur = db.cursor()

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
	pwd = request.form['pwd']
	try:
		sql = ("""INSERT INTO users (name,email,pwd) VALUES (%s,%s,%s)""",(name,email,pwd))
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

@app.route('/get_info',methods=["GET"])
def get_info():
	sql = ("""select * from msgs where relevant=1""")
	cursor.execute(sql)
	messages = cursor.fetchall()
	response = {}
	for message in messages:
		if message[1] not in response:
			response[message[1]] = []
		temp = {}
		temp["lat"] = message[7]
		temp["long"] = message[8]
		temp["msg"] = message[9]
		temp["up"] = message[5]
		temp["down"] = message[6]
		temp["email"] = message[3]
		temp["subcat"] = message[2]
		response.append(temp)

	return str(response)

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
	sql = ("""INSERT into votes (vote,email,msg_id) VALUES (%s,%s,%s)""",(vote,email,iD,))
	cursor.execute(*sql)
	sql = ("""select upvotes,downvotes from msgs where id=%s""",(msg_id,))
	cursor.execute(*sql)
	msg = cursor.fetchall()
	if vote == -1:
		new_downvotes = 1 + msg[0][1]
		sql = ("""update msgs set downvotes=%s where id=%s """,(msg_id, new_downvotes))
	elif vote == 1:
		new_upvotes = 1 + msg[0][0]
		sql = ("""update msgs set upvotes=%s where id=%s """,(msg_id, new_upvotes))
	cursor.execute(*sql)
	db.commit()

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8010)