import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config
from .models import db
from .seed import seed_database
from .routes.auth_routes import auth_bp
from .routes.content_routes import content_bp
from .routes.contact_routes import contact_bp
from .routes.upload_routes import upload_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend and CMS
    CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)

    # Ensure uploads directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(content_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(upload_bp)

    # Static file serving for uploads
    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'Custom CMS Backend API',
            'version': '1.0.0'
        }), 200

    # Auto create tables and seed
    with app.app_context():
        db.create_all()
        seed_database()

    return app
