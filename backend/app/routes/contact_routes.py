from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models import db, Message
import datetime

contact_bp = Blueprint('contact', __name__, url_prefix='/api')

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', 'Portfolio Contact').strip()
    message_text = data.get('message', '').strip()

    if not name or not email or not message_text:
        return jsonify({'error': 'Name, email, and message are required fields.'}), 400

    new_msg = Message(
        name=name,
        email=email,
        subject=subject or 'Portfolio Contact Form Submission',
        message=message_text,
        is_read=False
    )
    db.session.add(new_msg)
    db.session.commit()

    # Log simulated email dispatch
    print(f'[EMAIL] [EMAIL DISPATCHED] To Admin: New Message from {name} <{email}>: {subject}')

    return jsonify({
        'message': 'Thank you! Your message has been received and saved.',
        'data': new_msg.to_dict()
    }), 201

@contact_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([m.to_dict() for m in messages]), 200

@contact_bp.route('/messages/<int:id>/read', methods=['PUT'])
@jwt_required()
def mark_message_read(id):
    msg = Message.query.get_or_404(id)
    msg.is_read = True
    db.session.commit()
    return jsonify({'message': 'Message marked as read', 'data': msg.to_dict()}), 200

@contact_bp.route('/messages/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_message(id):
    msg = Message.query.get_or_404(id)
    db.session.delete(msg)
    db.session.commit()
    return jsonify({'message': 'Message deleted successfully'}), 200
