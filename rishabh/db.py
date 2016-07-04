import MySQLdb

db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="root",  # your password
                     db="hackmaster")        # name of the data base
print "lol"

cursor = db.cursor()


cursor.execute("DROP TABLE IF EXISTS votes")
cursor.execute("DROP TABLE IF EXISTS msgs")
cursor.execute("DROP TABLE IF EXISTS users")

sql = """CREATE TABLE users (
         name  VARCHAR(100) NOT NULL,
         email  VARCHAR(100) NOT NULL,
         pwd VARCHAR(50),  
         UNIQUE (email),
         PRIMARY KEY(email))
         """

cursor.execute(sql)

sql1 = """CREATE TABLE msgs (
         id INT NOT NULL AUTO_INCREMENT ,
         category  VARCHAR(100) NOT NULL,
         sub_category  VARCHAR(100),
         email VARCHAR(100) NOT NULL,  
         post_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
         upvotes INT DEFAULT 0,
         downvotes INT DEFAULT 0,
         lat DECIMAL(20,10) NOT NULL,
         longitude DECIMAL(20,10) NOT NULL,
         msg  VARCHAR(500),
         relevant BIT DEFAULT 1,
         PRIMARY KEY(id),
         FOREIGN KEY (email) REFERENCES users(email) ON UPDATE CASCADE)
         """

cursor.execute(sql1)


sql2 = """CREATE TABLE votes (
         id INT NOT NULL AUTO_INCREMENT,
         vote  INT NOT NULL DEFAULT 0,
         email  VARCHAR(100) NOT NULL,
         msg_id INT NOT NULL,
         PRIMARY KEY (id,email,msg_id),
         FOREIGN KEY (email) REFERENCES users(email) ON UPDATE CASCADE,
         FOREIGN KEY (msg_id) REFERENCES msgs(id) ON UPDATE CASCADE)

         """

cursor.execute(sql2)


db.close()