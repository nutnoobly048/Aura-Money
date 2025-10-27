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
            # create account
            stmt_fetch = "SELECT user_id FROM user WHERE email=%s"
            cursor.execute(stmt_fetch,(email,))
            user_id = cursor.fetchone()
            cursor.close()
            create_account("Cash",0,user_id[0])
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
        return jsonify({"message": "create category successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_category(category_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "DELETE FROM category WHERE category_id=%s"
        cursor.execute(stmt,(category_id,))
        db.commit()
        return jsonify({"message": "delete category successfully"}), 200
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
        return jsonify({"message": "update category successfully"}), 200
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
                    "category_id" : x[0],
                    "category_name" : x[1],
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
        return jsonify({"message": "create account successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_account(account_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "DELETE FROM account WHERE account_id=%s"
        cursor.execute(stmt,(account_id,))
        db.commit()
        return jsonify({"message": "delete account successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def update_account(account_id, account_name, balance):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "UPDATE account SET account_name=%s, balance=%s WHERE account_id=%s"
        payload = (account_name, balance, account_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"message": "update account successfully"}), 200
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
                    "account_id" : x[0],
                    "account_name" : x[1],
                    "balance": x[2],
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

# update balance of account method (global method)
def update_account_balance(account_id, types, amount):
    try:
        amount = float(amount)
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "SELECT * FROM account WHERE account_id=%s"
        cursor.execute(stmt,(account_id,))
        result = cursor.fetchall()
        balance = float(result[0][2])
        if types == "expense":
            balance -= amount
        else:
            balance += amount
        stmt = "UPDATE account SET balance=%s WHERE account_id=%s"
        payload = (balance, account_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"message": "update balance successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def create_transfer(from_account_id, to_account_id, amount, user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "INSERT INTO transfer (from_account_id, amount, to_account_id, user_id) VALUES (%s, %s, %s, %s)"
        payload = (from_account_id, to_account_id, amount, user_id)
        cursor.execute(stmt,payload)
        db.commit()
        update_account_balance(from_account_id, "expense", amount)
        update_account_balance(to_account_id, "income", amount)
        return jsonify({"message": "create transfer successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_transfer(transfer_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        cursor.execute("SELECT from_account_id, to_account_id, amount FROM transfer WHERE transfer_id=%s",(transfer_id,))
        result = cursor.fetchall()
        update_account_balance(result[0][0], "income", result[0][2])
        update_account_balance(result[0][2], "expense", result[0][2])
        stmt = "DELETE FROM transfer WHERE transfer_id=%s"
        cursor.execute(stmt,(transfer_id,))
        db.commit()
        return jsonify({"message" : "delete transfer successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def update_transfer(transfer_id, from_account_id, to_account_id, amount):
    try:
        amount = float(amount)
        db = ConnectorMysql()
        cursor = db.cursor()
        cursor.execute("SELECT amount FROM transfer WHERE transfer_id=%s" , (transfer_id,))
        result = cursor.fetchall()
        diff = amount - float(result[0][0])
        update_account_balance(from_account_id, "expense", diff)
        update_account_balance(to_account_id, "income", diff)
        stmt = "UPDATE account SET from_account_id=%s, to_account_id=%s, amount=%s WHERE transfer_id=%s"
        payload = (from_account_id, to_account_id, amount, transfer_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"message": "update transfer successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def get_transfer(user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = """
        SELECT 
        t.transfer_id,
        t.date,
        from_acc.account_name AS from_account_name,
        t.from_account_id,
        to_acc.account_name AS to_account_name,
        t.to_account_id,
        t.amount
        FROM transfer AS t
        JOIN account AS from_acc 
        ON t.from_account_id = from_acc.account_id
        JOIN account AS to_acc 
        ON t.to_account_id = to_acc.account_id
        WHERE t.user_id=%s
        """
        cursor.execute(stmt,(user_id,))
        result = cursor.fetchall()
        if len(result) > 0:
            data = []
            for x in result:
                arr = {
                    "transfer_id" : x[0],
                    "date" : x[1],
                    "from_account_name" : x[2],
                    "from_account_id" : x[3],
                    "to_account_name" : x[4],
                    "to_account_id" : x[5],
                    "amount" : x[6]
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def create_iore(date, types, account_id, category_id, amount, note, user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = "INSERT INTO iore (date, types, account_id, category_id, amount, note, user_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        payload = (date, types, account_id, category_id, amount, note, user_id)
        cursor.execute(stmt,payload)
        db.commit()
        update_account_balance(account_id, types, amount)
        return jsonify({"message": "create income or expense successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def delete_iore(track_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        cursor.execute("SELECT types, account_id, amount FROM iore WHERE track_id=%s",(track_id,))
        result = cursor.fetchall()
        if str(result[0][0]) == "income":
            update_account_balance(result[0][1], "expense", result[0][2])
        else:
            update_account_balance(result[0][1], "income", result[0][2])
        stmt = "DELETE FROM iore WHERE track_id=%s"
        cursor.execute(stmt,(track_id,))
        db.commit()
        return jsonify({"message" : "delete income or expense successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def update_iore(track_id, date, types, account_id, category_id, amount, note):
    try:
        amount = float(amount)
        db = ConnectorMysql()
        cursor = db.cursor()
        cursor.execute("SELECT amount FROM iore WHERE track_id=%s" , (track_id,))
        result = cursor.fetchall()
        diff = amount - float(result[0][0])
        update_account_balance(account_id, types, diff)
        stmt = "UPDATE iore SET date=%s, types=%s, account_id=%s, category_id=%s, amount=%s, note=%s WHERE track_id=%s"
        payload = (date, types, account_id, category_id, amount, note, track_id)
        cursor.execute(stmt,payload)
        db.commit()
        return jsonify({"message": "update income or expense successfully"}), 200
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")

def get_iore(user_id):
    try:
        db = ConnectorMysql()
        cursor = db.cursor()
        stmt = """
            SELECT 
            i.track_id,
            i.date,
            i.types,
            a.account_name AS account_name,
            i.account_id,
            c.category_name AS category_name,
            i.category_id,
            i.amount,
            i.note
            FROM iore AS i
            JOIN account AS a
            ON i.account_id = a.account_id
            JOIN category AS c 
            ON i.category_id = c.category_id
            WHERE i.user_id=%s;
        """
        cursor.execute(stmt,(user_id,))
        result = cursor.fetchall()
        if len(result) > 0:
            data = []
            for x in result:
                arr = {
                    "track_id" : x[0],
                    "date" : x[1],
                    "types" : x[2],
                    "account_name" : x[3],
                    "account_id" : x[4],
                    "category_name" : x[5],
                    "category_id" : x[6],
                    "amount" : x[7],
                    "note": x[8]
                }
                data.append(arr)
        return data
    except Exception as err:
        raise RuntimeError(f"Database error: {err}")
