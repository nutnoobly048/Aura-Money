# database management zone
from flask import jsonify
import mysql.connector
from dotenv import load_dotenv
import bcrypt
import os

# db connector
def ConnectorMysql():
    try:
        db = mysql.connector.connect(
                host=os.getenv("SQL_HOST"),
                user=os.getenv("SQL_USER"),
                passwd=os.getenv("SQL_PASSWORD"),
                database=os.getenv("DATABASE_NAME"),
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
                    "user_id" : x[0],
                    "username" : x[1],
                    "password" : x[2],
                    "email" : x[3]
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# check user is exist?
def check_user(email):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        user = cursor.fetchone()
        cursor.close()
        return user
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method register with username , password (encrypt with bcrypt function) and email
def register_db(username , password , email):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        if not check_user(email):
            hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()) # encrypt password code
            stmt = "INSERT INTO user (username , password , email) VALUES (%s, %s, %s)"
            payload = (username , hashed , email)
            cursor.execute(stmt,payload)
            db.commit()
            return jsonify({"success": "Registered successfull"}), 200
        return jsonify({"errror": "Already has user"}), 401
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# method get user from email
def get_from_email(email):
    try:
        db = ConnectorMysql()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT user_id, username, email FROM user WHERE email=%s", (email,))
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
                    "user_id" : x[0],
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

def get_track(user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM track WHERE user_id=%s"
        cursor.execute(stmt,(user_id,))
        result = cursor.fetchall()
        data = []
        if len(result) > 0:
            for x in result:
                arr = {
                    "track_id": x[0],
                    "date": x[1],
                    "amount": x[2],
                    "catagory": x[3],
                    "account": x[4],
                    "note": x[5],
                    "total": x[6],
                    "user_id": x[7]
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")


def post_data(date, amount, catagory, account, note, user_id):
    try:
        amount = float(amount)
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "INSERT INTO track (date, amount, catagory, account, note, total, user_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        if catagory.lower() == "income":
            if not get_track(user_id):
                calculate = amount
            else:
                calculate = get_track(user_id)[-1]["total"] + amount
        else:
            if not get_track(user_id):
                calculate = amount*(-1)
            else:
                calculate = get_track(user_id)[-1]["total"] - amount
        payload = (date, amount, catagory, account, note, calculate, user_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({'message' : "success"}) , 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

