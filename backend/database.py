# database management zone
from flask import jsonify
import mysql.connector
import bcrypt

# db connector
def ConnectorMysql():
    try:
        db = mysql.connector.connect(
                host="localhost",
                user="root",
                passwd="",
                database="automoney",
        )
        return db
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method for fetch all data from database
def get_data():
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM user"
        cursor.execute(stmt)
        result = cursor.fetchall()
        if len(result) > 0:
            data = []
            for x in result:
                arr = {
                    "id" : x[0],
                    "username" : x[1],
                    "password" : x[2],
                    "email" : x[3]
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method register with username , password (encrypt with bcrypt function) and email
def register_db(username , password , email):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()) # encrypt password code
        stmt = "INSERT INTO user (username , password , email) VALUES (%s, %s, %s)"
        payload = (username , hashed , email)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"success": "Registered successfull"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method get user from email
def get_from_email(email):
    try:
        db = ConnectorMysql()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email FROM user WHERE email=%s", (email,))
        user = cursor.fetchone()
        cursor.close()
        return user
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method login with email and password
def login_db(email , password):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM user WHERE email=%s"
        cursor.execute(stmt, [email])
        result = cursor.fetchall()
        if len(result) > 0:
            for x in result:
                arr = {
                    "id" : x[0],
                    "username" : x[1],
                    "password" : x[2],
                    "email" : x[3]
                }
            if bcrypt.checkpw(password.encode("utf-8") , arr['password'].encode("utf-8")):
                return arr['email'], 200
            return jsonify({"error": "Wrong password!"}), 401
        return jsonify({"error": "Email doesn't exist!"}), 401
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")
