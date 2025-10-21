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

def create_category(category_name, user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "INSERT INTO category (category_name, user_id) VALUES (%s, %s)"
        payload = (category_name, user_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_category(category_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "DELETE FROM category WHERE category_id=%s"
        cursor.execute(stmt,(category_id,))
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def update_category(category_id, category_name):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "UPDATE category SET category_name=%s WHERE category_id=%s"
        payload = (category_name, category_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def get_category(user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM category WHERE user_id=%s"
        cursor.execute(stmt,(user_id,))
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

def create_account(account_name, balance , user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "INSERT INTO account (account_name, balance , user_id) VALUES (%s, %s, %s)"
        payload = (account_name, balance , user_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_account(account_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "DELETE FROM account WHERE account_id=%s"
        cursor.execute(stmt,(account_id,))
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def update_account(account_id, account_name, balance):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "UPDATE account SET account_name=%s, balance=%s WHERE account_id=%s"
        payload = (account_id, account_name, balance)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"Message": "Success"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def get_account(user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM account WHERE user_id=%s"
        cursor.execute(stmt,(user_id,))
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
