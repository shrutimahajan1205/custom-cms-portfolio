from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='admin')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class About(db.Model):
    __tablename__ = 'about'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.Text, nullable=False)
    avatar_url = db.Column(db.String(500), default='')
    resume_url = db.Column(db.String(500), default='')
    location = db.Column(db.String(120), default='')
    email = db.Column(db.String(120), default='')
    phone = db.Column(db.String(50), default='')
    github = db.Column(db.String(255), default='')
    linkedin = db.Column(db.String(255), default='')
    twitter = db.Column(db.String(255), default='')
    website = db.Column(db.String(255), default='')
    years_experience = db.Column(db.Integer, default=3)
    projects_completed = db.Column(db.Integer, default=25)
    satisfied_clients = db.Column(db.Integer, default=15)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'title': self.title,
            'bio': self.bio,
            'avatar_url': self.avatar_url,
            'resume_url': self.resume_url,
            'location': self.location,
            'email': self.email,
            'phone': self.phone,
            'github': self.github,
            'linkedin': self.linkedin,
            'twitter': self.twitter,
            'website': self.website,
            'years_experience': self.years_experience,
            'projects_completed': self.projects_completed,
            'satisfied_clients': self.satisfied_clients,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(50), nullable=False, default='Frontend')  # Frontend, Backend, Database, DevOps, Tools
    proficiency = db.Column(db.Integer, default=80)  # 0 - 100
    icon = db.Column(db.String(50), default='Code')
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'proficiency': self.proficiency,
            'icon': self.icon,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(180), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, default='')
    tags = db.Column(db.Text, default='[]')  # JSON list
    image_url = db.Column(db.String(500), default='')
    demo_url = db.Column(db.String(500), default='')
    github_url = db.Column(db.String(500), default='')
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            parsed_tags = json.loads(self.tags) if self.tags else []
        except Exception:
            parsed_tags = [t.strip() for t in self.tags.split(',') if t.strip()]
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'content': self.content,
            'tags': parsed_tags,
            'image_url': self.image_url,
            'demo_url': self.demo_url,
            'github_url': self.github_url,
            'featured': self.featured,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Blog(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(250), unique=True, nullable=False)
    excerpt = db.Column(db.Text, default='')
    content = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String(500), default='')
    tags = db.Column(db.Text, default='[]')
    read_time = db.Column(db.String(30), default='5 min read')
    published = db.Column(db.Boolean, default=True)
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            parsed_tags = json.loads(self.tags) if self.tags else []
        except Exception:
            parsed_tags = [t.strip() for t in self.tags.split(',') if t.strip()]
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'excerpt': self.excerpt,
            'content': self.content,
            'cover_image': self.cover_image,
            'tags': parsed_tags,
            'read_time': self.read_time,
            'published': self.published,
            'views': self.views,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Experience(db.Model):
    __tablename__ = 'experience'
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(120), default='Remote')
    period = db.Column(db.String(80), nullable=False)  # e.g. 2023 - Present
    description = db.Column(db.Text, nullable=False)
    technologies = db.Column(db.Text, default='[]')
    is_current = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            parsed_tech = json.loads(self.technologies) if self.technologies else []
        except Exception:
            parsed_tech = [t.strip() for t in self.technologies.split(',') if t.strip()]
        return {
            'id': self.id,
            'role': self.role,
            'company': self.company,
            'location': self.location,
            'period': self.period,
            'description': self.description,
            'technologies': parsed_tech,
            'is_current': self.is_current,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Testimonial(db.Model):
    __tablename__ = 'testimonials'
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(150), default='')
    position = db.Column(db.String(120), default='')
    quote = db.Column(db.Text, nullable=False)
    avatar_url = db.Column(db.String(500), default='')
    rating = db.Column(db.Integer, default=5)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'client_name': self.client_name,
            'company': self.company,
            'position': self.position,
            'quote': self.quote,
            'avatar_url': self.avatar_url,
            'rating': self.rating,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Service(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(60), default='Layout')
    deliverables = db.Column(db.Text, default='[]')
    pricing = db.Column(db.String(80), default='')
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            parsed_del = json.loads(self.deliverables) if self.deliverables else []
        except Exception:
            parsed_del = [d.strip() for d in self.deliverables.split(',') if d.strip()]
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'icon': self.icon,
            'deliverables': parsed_del,
            'pricing': self.pricing,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), default='New Inquiry')
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(500), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    mimetype = db.Column(db.String(100), default='')
    size = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'filepath': self.filepath,
            'url': self.url,
            'mimetype': self.mimetype,
            'size': self.size,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
