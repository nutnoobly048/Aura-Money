from flask import Flask, request, jsonify, make_response, url_for, redirect, session
from datetime import timedelta
from flask_cors import CORS
from dotenv import load_dotenv
import os
import database

import traceback

from authlib.integrations.flask_client import OAuth
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity, set_access_cookies, unset_jwt_cookies
)

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
    supports_credentials=True,
)  # this cors code by chatgpt

app.secret_key = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "Lax"  # code by chatgpt
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

jwt = JWTManager(app)
oauth = OAuth(app)

# For test api is working?
@app.route('/')
def hello_world():
    """
    Test API is working
    """
    return 'API is working'

# Example of get_data method
@app.route('/data', methods=['GET'])
def data():
    """
    Get data from database
    """
    try:
        jsonData = database.get_data()
        return jsonify(jsonData)
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

# Register API use function register_db from ./database.py (finished)
@app.route('/register', methods=["POST"])
def register():
    """
    Register API use function register_db from ./database.py
    """
    try:
        data = request.get_json()  # get data from header (json file)
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        result = database.register_db(username, password, email)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

# Login method use function login_db from ./database.py (not finished)
@app.route('/login', methods=["POST"])
def login():
    """
    Login method use function login_db from ./database.py
    """
    try:
        data = request.get_json()  # get data from header (json file)
        email = data.get("email").strip()
        password = data.get("password")
        result = database.login_db(email, password)
        if result[1] == 200:
            user_email = result[0]
            access_token = create_access_token(identity=user_email)
            resp = jsonify({"success": "login successful", "expires_in_sec": 3600})
            set_access_cookies(resp, access_token)
            return resp, 200
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

# This function code by chatgpt
@app.route("/auth", methods=["GET"])
@jwt_required()
def auth():
    """
    Auth method use function get_from_email from ./database.py
    """
    try:
        email = get_jwt_identity()
        user = database.get_from_email(email)
        if not user:
            return jsonify({"authenticated": False}), 200
        return jsonify({"authenticated": True, "user": user}), 200
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

# Logout method
@app.route("/logout", methods=["GET"])
def logout():
    """
    Logout method
    """
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/google")
def google():
    google_client_id = os.getenv("GOOGLE_CLIENT_ID")
    google_client_secreat = os.getenv("GOOGLE_CLIENT_SECRET")

    CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
    oauth.register(
        name='google',
        client_id=google_client_id,
        client_secret=google_client_secreat,
        server_metadata_url=CONF_URL,
        client_kwargs={
            'scope': 'openid email profile'
        }
    )
    # Redirect to google_auth function
    redirect_uri = url_for('google_auth', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/google/auth')
def google_auth():
    try:
        token = oauth.google.authorize_access_token()
        nonce = session.pop('google_nonce', None)   # get stored nonce
        user = oauth.google.parse_id_token(token, nonce=nonce)
        if not database.check_user(user["email"]):
            result = database.register_db(user["name"], user["sub"], user["email"])
        result = database.login_db(user["email"], user["sub"])
        if result[1] == 200:
                user_email = result[0]
                access_token = create_access_token(identity=user_email)
                # resp = jsonify({"success": "login successful", "expires_in_sec": 3600})
                resp = make_response(redirect("http://localhost:5173/"))
                set_access_cookies(resp, access_token)
                return resp
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/create_category', methods=["POST"])
@jwt_required()
def create_category():
    try:
        data = request.get_json()  # get data from header (json file)
        category_name = data.get("category_name")
        email = get_jwt_identity()
        user = database.get_from_email(email)
        result = database.create_category(category_name, user)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500
    
@app.route('/delete_category', methods=["POST"])
def delete_category():
    try:
        data = request.get_json()  # get data from header (json file)
        category_id = data.get("category_id")
        result = database.delete_category(category_id)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/update_category', methods=["POST"])
def update_category():
    try:
        data = request.get_json()  # get data from header (json file)
        category_id = data.get("category_id")
        category_name = data.get("category_name")
        result = database.update_category(category_id, category_name)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/get_category', methods=["GET"])
@jwt_required()
def get_category():
    try:
        email = get_jwt_identity()
        user = database.get_from_email(email)
        result = database.get_category(user)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/create_account', methods=["POST"])
@jwt_required()
def create_account():
    try:
        data = request.get_json()  # get data from header (json file)
        account_name = data.get("account_name")
        balance = data.get("balance")
        email = get_jwt_identity()
        user = database.get_from_email(email)
        result = database.create_account(account_name, balance, user)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500
    
@app.route('/delete_account', methods=["POST"])
def delete_account():
    try:
        data = request.get_json()  # get data from header (json file)
        account_id = data.get("account_id")
        result = database.delete_account(account_id)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/update_account', methods=["POST"])
def update_account():
    try:
        data = request.get_json()  # get data from header (json file)
        account_id = data.get("account_id")
        account_name = data.get("account_name")
        balance = data.get("balance")
        result = database.update_account(account_id, account_name, balance)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500

@app.route('/get_account', methods=["GET"])
@jwt_required()
def get_account():
    try:
        email = get_jwt_identity()
        user = database.get_from_email(email)
        result = database.get_account(user)
        return result
    except Exception as err:
        traceback.print_exc()
        return jsonify({"error": str(err)}), 500
# Running file
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
