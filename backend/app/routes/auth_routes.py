from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

from ..models import db, User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


# =========================
# LOGIN
# =========================
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}

    identity = (data.get('username') or data.get('email') or '').strip()
    password = data.get('password') or ''

    if not identity or not password:
        return jsonify({
            'error': 'Username/email and password are required'
        }), 400

    user = User.query.filter(
        (User.username == identity) | (User.email == identity)
    ).first()

    if not user or not user.check_password(password):
        return jsonify({
            'error': 'Invalid username/email or password'
        }), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        'message': 'Login successful',
        'token': access_token,
        'user': user.to_dict()
    }), 200


# =========================
# REGISTER / CREATE ACCOUNT
# =========================
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}

    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    # Required fields
    if not username or not email or not password:
        return jsonify({
            'error': 'Username, email and password are required'
        }), 400

    # Basic validation
    if len(username) < 3:
        return jsonify({
            'error': 'Username must be at least 3 characters'
        }), 400

    if len(password) < 6:
        return jsonify({
            'error': 'Password must be at least 6 characters'
        }), 400

    if '@' not in email:
        return jsonify({
            'error': 'Please enter a valid email address'
        }), 400

    # Check existing username
    existing_username = User.query.filter_by(
        username=username
    ).first()

    if existing_username:
        return jsonify({
            'error': 'Username already exists'
        }), 409

    # Check existing email
    existing_email = User.query.filter_by(
        email=email
    ).first()

    if existing_email:
        return jsonify({
            'error': 'Email already exists'
        }), 409

    # Create new user
    user = User(
        username=username,
        email=email,
        role='admin'
    )

    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()

        return jsonify({
            'message': 'Account created successfully',
            'user': user.to_dict()
        }), 201

    except IntegrityError:
        db.session.rollback()

        return jsonify({
            'error': 'Username or email already exists'
        }), 409


# =========================
# CURRENT USER
# =========================
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            'error': 'User not found'
        }), 404

    return jsonify({
        'user': user.to_dict()
    }), 200


# =========================
# REFRESH TOKEN
# =========================
@auth_bp.route('/refresh', methods=['POST'])
@jwt_required()
def refresh_token():
    user_id = get_jwt_identity()

    new_token = create_access_token(
        identity=user_id
    )

    return jsonify({
        'token': new_token
    }), 200