import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models import db, About, Skill, Project, Blog, Experience, Testimonial, Service, Message

content_bp = Blueprint('content', __name__, url_prefix='/api')

# --- 1. ABOUT ---
@content_bp.route('/about', methods=['GET'])
def get_about():
    about = About.query.first()
    if not about:
        return jsonify({'message': 'No about profile found', 'data': None}), 200
    return jsonify(about.to_dict()), 200

@content_bp.route('/about', methods=['PUT', 'POST'])
@jwt_required()
def update_about():
    data = request.get_json() or {}
    about = About.query.first()
    if not about:
        about = About(name=data.get('name', 'Developer'), title=data.get('title', 'Engineer'), bio=data.get('bio', ''))
        db.session.add(about)

    about.name = data.get('name', about.name)
    about.title = data.get('title', about.title)
    about.bio = data.get('bio', about.bio)
    about.avatar_url = data.get('avatar_url', about.avatar_url)
    about.resume_url = data.get('resume_url', about.resume_url)
    about.location = data.get('location', about.location)
    about.email = data.get('email', about.email)
    about.phone = data.get('phone', about.phone)
    about.github = data.get('github', about.github)
    about.linkedin = data.get('linkedin', about.linkedin)
    about.twitter = data.get('twitter', about.twitter)
    about.website = data.get('website', about.website)
    about.years_experience = int(data.get('years_experience', about.years_experience or 0))
    about.projects_completed = int(data.get('projects_completed', about.projects_completed or 0))
    about.satisfied_clients = int(data.get('satisfied_clients', about.satisfied_clients or 0))

    db.session.commit()
    return jsonify({'message': 'About updated successfully', 'data': about.to_dict()}), 200

# --- 2. SKILLS ---
@content_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.order_by(Skill.order.asc(), Skill.id.asc()).all()
    return jsonify([s.to_dict() for s in skills]), 200

@content_bp.route('/skills', methods=['POST'])
@jwt_required()
def create_skill():
    data = request.get_json() or {}
    if not data.get('name'):
        return jsonify({'error': 'Skill name is required'}), 400

    skill = Skill(
        name=data.get('name'),
        category=data.get('category', 'Frontend'),
        proficiency=int(data.get('proficiency', 80)),
        icon=data.get('icon', 'Code'),
        order=int(data.get('order', 0))
    )
    db.session.add(skill)
    db.session.commit()
    return jsonify({'message': 'Skill created', 'data': skill.to_dict()}), 201

@content_bp.route('/skills/<int:id>', methods=['PUT'])
@jwt_required()
def update_skill(id):
    skill = Skill.query.get_or_404(id)
    data = request.get_json() or {}
    skill.name = data.get('name', skill.name)
    skill.category = data.get('category', skill.category)
    skill.proficiency = int(data.get('proficiency', skill.proficiency))
    skill.icon = data.get('icon', skill.icon)
    skill.order = int(data.get('order', skill.order))
    db.session.commit()
    return jsonify({'message': 'Skill updated', 'data': skill.to_dict()}), 200

@content_bp.route('/skills/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_skill(id):
    skill = Skill.query.get_or_404(id)
    db.session.delete(skill)
    db.session.commit()
    return jsonify({'message': 'Skill deleted'}), 200

# --- 3. PROJECTS ---
@content_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.order.asc(), Project.id.desc()).all()
    return jsonify([p.to_dict() for p in projects]), 200

@content_bp.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict()), 200

@content_bp.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json() or {}
    if not data.get('title'):
        return jsonify({'error': 'Project title is required'}), 400

    tags_val = data.get('tags', [])
    tags_str = json.dumps(tags_val) if isinstance(tags_val, list) else str(tags_val)

    project = Project(
        title=data.get('title'),
        description=data.get('description', ''),
        content=data.get('content', ''),
        tags=tags_str,
        image_url=data.get('image_url', ''),
        demo_url=data.get('demo_url', ''),
        github_url=data.get('github_url', ''),
        featured=bool(data.get('featured', False)),
        order=int(data.get('order', 0))
    )
    db.session.add(project)
    db.session.commit()
    return jsonify({'message': 'Project created', 'data': project.to_dict()}), 201

@content_bp.route('/projects/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json() or {}

    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.content = data.get('content', project.content)
    if 'tags' in data:
        t = data['tags']
        project.tags = json.dumps(t) if isinstance(t, list) else str(t)
    project.image_url = data.get('image_url', project.image_url)
    project.demo_url = data.get('demo_url', project.demo_url)
    project.github_url = data.get('github_url', project.github_url)
    project.featured = bool(data.get('featured', project.featured))
    project.order = int(data.get('order', project.order))

    db.session.commit()
    return jsonify({'message': 'Project updated', 'data': project.to_dict()}), 200

@content_bp.route('/projects/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted'}), 200

# --- 4. BLOGS ---
@content_bp.route('/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return jsonify([b.to_dict() for b in blogs]), 200

@content_bp.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    blog.views = (blog.views or 0) + 1
    db.session.commit()
    return jsonify(blog.to_dict()), 200

@content_bp.route('/blogs', methods=['POST'])
@jwt_required()
def create_blog():
    data = request.get_json() or {}
    if not data.get('title'):
        return jsonify({'error': 'Blog title is required'}), 400

    tags_val = data.get('tags', [])
    tags_str = json.dumps(tags_val) if isinstance(tags_val, list) else str(tags_val)
    slug = data.get('slug', '').strip().lower().replace(' ', '-')
    if not slug:
        import time
        slug = f'post-{int(time.time())}'

    blog = Blog(
        title=data.get('title'),
        slug=slug,
        excerpt=data.get('excerpt', ''),
        content=data.get('content', ''),
        cover_image=data.get('cover_image', ''),
        tags=tags_str,
        read_time=data.get('read_time', '5 min read'),
        published=bool(data.get('published', True))
    )
    db.session.add(blog)
    db.session.commit()
    return jsonify({'message': 'Blog created', 'data': blog.to_dict()}), 201

@content_bp.route('/blogs/<int:id>', methods=['PUT'])
@jwt_required()
def update_blog(id):
    blog = Blog.query.get_or_404(id)
    data = request.get_json() or {}

    blog.title = data.get('title', blog.title)
    if 'slug' in data and data['slug']:
        blog.slug = data['slug'].strip().lower().replace(' ', '-')
    blog.excerpt = data.get('excerpt', blog.excerpt)
    blog.content = data.get('content', blog.content)
    blog.cover_image = data.get('cover_image', blog.cover_image)
    if 'tags' in data:
        t = data['tags']
        blog.tags = json.dumps(t) if isinstance(t, list) else str(t)
    blog.read_time = data.get('read_time', blog.read_time)
    blog.published = bool(data.get('published', blog.published))

    db.session.commit()
    return jsonify({'message': 'Blog updated', 'data': blog.to_dict()}), 200

@content_bp.route('/blogs/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({'message': 'Blog deleted'}), 200

# --- 5. EXPERIENCE ---
@content_bp.route('/experience', methods=['GET'])
def get_experience():
    exp = Experience.query.order_by(Experience.order.asc(), Experience.id.desc()).all()
    return jsonify([e.to_dict() for e in exp]), 200

@content_bp.route('/experience', methods=['POST'])
@jwt_required()
def create_experience():
    data = request.get_json() or {}
    if not data.get('role') or not data.get('company'):
        return jsonify({'error': 'Role and Company are required'}), 400

    tech_val = data.get('technologies', [])
    tech_str = json.dumps(tech_val) if isinstance(tech_val, list) else str(tech_val)

    exp = Experience(
        role=data.get('role'),
        company=data.get('company'),
        location=data.get('location', 'Remote'),
        period=data.get('period', ''),
        description=data.get('description', ''),
        technologies=tech_str,
        is_current=bool(data.get('is_current', False)),
        order=int(data.get('order', 0))
    )
    db.session.add(exp)
    db.session.commit()
    return jsonify({'message': 'Experience entry created', 'data': exp.to_dict()}), 201

@content_bp.route('/experience/<int:id>', methods=['PUT'])
@jwt_required()
def update_experience(id):
    exp = Experience.query.get_or_404(id)
    data = request.get_json() or {}

    exp.role = data.get('role', exp.role)
    exp.company = data.get('company', exp.company)
    exp.location = data.get('location', exp.location)
    exp.period = data.get('period', exp.period)
    exp.description = data.get('description', exp.description)
    if 'technologies' in data:
        t = data['technologies']
        exp.technologies = json.dumps(t) if isinstance(t, list) else str(t)
    exp.is_current = bool(data.get('is_current', exp.is_current))
    exp.order = int(data.get('order', exp.order))

    db.session.commit()
    return jsonify({'message': 'Experience entry updated', 'data': exp.to_dict()}), 200

@content_bp.route('/experience/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_experience(id):
    exp = Experience.query.get_or_404(id)
    db.session.delete(exp)
    db.session.commit()
    return jsonify({'message': 'Experience deleted'}), 200

# --- 6. TESTIMONIALS ---
@content_bp.route('/testimonials', methods=['GET'])
def get_testimonials():
    tests = Testimonial.query.order_by(Testimonial.order.asc(), Testimonial.id.asc()).all()
    return jsonify([t.to_dict() for t in tests]), 200

@content_bp.route('/testimonials', methods=['POST'])
@jwt_required()
def create_testimonial():
    data = request.get_json() or {}
    if not data.get('client_name') or not data.get('quote'):
        return jsonify({'error': 'Client name and quote are required'}), 400

    test = Testimonial(
        client_name=data.get('client_name'),
        company=data.get('company', ''),
        position=data.get('position', ''),
        quote=data.get('quote', ''),
        avatar_url=data.get('avatar_url', ''),
        rating=int(data.get('rating', 5)),
        order=int(data.get('order', 0))
    )
    db.session.add(test)
    db.session.commit()
    return jsonify({'message': 'Testimonial created', 'data': test.to_dict()}), 201

@content_bp.route('/testimonials/<int:id>', methods=['PUT'])
@jwt_required()
def update_testimonial(id):
    test = Testimonial.query.get_or_404(id)
    data = request.get_json() or {}

    test.client_name = data.get('client_name', test.client_name)
    test.company = data.get('company', test.company)
    test.position = data.get('position', test.position)
    test.quote = data.get('quote', test.quote)
    test.avatar_url = data.get('avatar_url', test.avatar_url)
    test.rating = int(data.get('rating', test.rating))
    test.order = int(data.get('order', test.order))

    db.session.commit()
    return jsonify({'message': 'Testimonial updated', 'data': test.to_dict()}), 200

@content_bp.route('/testimonials/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_testimonial(id):
    test = Testimonial.query.get_or_404(id)
    db.session.delete(test)
    db.session.commit()
    return jsonify({'message': 'Testimonial deleted'}), 200

# --- 7. SERVICES ---
@content_bp.route('/services', methods=['GET'])
def get_services():
    services = Service.query.order_by(Service.order.asc(), Service.id.asc()).all()
    return jsonify([s.to_dict() for s in services]), 200

@content_bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    data = request.get_json() or {}
    if not data.get('title') or not data.get('description'):
        return jsonify({'error': 'Title and description are required'}), 400

    del_val = data.get('deliverables', [])
    del_str = json.dumps(del_val) if isinstance(del_val, list) else str(del_val)

    service = Service(
        title=data.get('title'),
        description=data.get('description', ''),
        icon=data.get('icon', 'Layout'),
        deliverables=del_str,
        pricing=data.get('pricing', ''),
        order=int(data.get('order', 0))
    )
    db.session.add(service)
    db.session.commit()
    return jsonify({'message': 'Service created', 'data': service.to_dict()}), 201

@content_bp.route('/services/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    service = Service.query.get_or_404(id)
    data = request.get_json() or {}

    service.title = data.get('title', service.title)
    service.description = data.get('description', service.description)
    service.icon = data.get('icon', service.icon)
    if 'deliverables' in data:
        d = data['deliverables']
        service.deliverables = json.dumps(d) if isinstance(d, list) else str(d)
    service.pricing = data.get('pricing', service.pricing)
    service.order = int(data.get('order', service.order))

    db.session.commit()
    return jsonify({'message': 'Service updated', 'data': service.to_dict()}), 200

@content_bp.route('/services/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted'}), 200

# --- 8. DASHBOARD STATS ---
@content_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    return jsonify({
        'total_projects': Project.query.count(),
        'total_skills': Skill.query.count(),
        'total_blogs': Blog.query.count(),
        'total_services': Service.query.count(),
        'total_experience': Experience.query.count(),
        'total_testimonials': Testimonial.query.count(),
        'unread_messages': Message.query.filter_by(is_read=False).count(),
        'total_messages': Message.query.count()
    }), 200
