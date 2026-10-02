import os
import time
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from flask_jwt_extended import jwt_required
from ..models import db, Media

upload_bp = Blueprint('upload', __name__, url_prefix='/api')

def allowed_file(filename):
    allowed = current_app.config.get('ALLOWED_EXTENSIONS', {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'pdf'})
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed

@upload_bp.route('/upload/image', methods=['POST'])
@jwt_required()
def upload_image():
    if 'image' not in request.files and 'file' not in request.files:
        return jsonify({'error': 'No file part in the request (expected key: image or file)'}), 400

    file = request.files.get('image') or request.files.get('file')
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'File format not allowed'}), 400

    original_filename = secure_filename(file.filename)
    timestamp = int(time.time())
    unique_filename = f'{timestamp}_{original_filename}'
    
    upload_dir = current_app.config['UPLOAD_FOLDER']
    os.makedirs(upload_dir, exist_ok=True)
    
    filepath = os.path.join(upload_dir, unique_filename)
    file.save(filepath)

    file_size = os.path.getsize(filepath)
    file_url = f'/uploads/{unique_filename}'

    # Record in Media table
    media_entry = Media(
        filename=unique_filename,
        filepath=filepath,
        url=file_url,
        mimetype=file.content_type or 'application/octet-stream',
        size=file_size
    )
    db.session.add(media_entry)
    db.session.commit()

    return jsonify({
        'message': 'File uploaded successfully',
        'url': file_url,
        'filename': unique_filename,
        'media': media_entry.to_dict()
    }), 201

@upload_bp.route('/media', methods=['GET'])
@jwt_required()
def get_all_media():
    media_list = Media.query.order_by(Media.created_at.desc()).all()
    return jsonify([m.to_dict() for m in media_list]), 200

@upload_bp.route('/media/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_media(id):
    media = Media.query.get_or_404(id)
    if os.path.exists(media.filepath):
        try:
            os.remove(media.filepath)
        except Exception as e:
            print('Could not delete physical file:', e)
    db.session.delete(media)
    db.session.commit()
    return jsonify({'message': 'Media deleted successfully'}), 200
