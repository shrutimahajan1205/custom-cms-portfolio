import json
from .models import db, User, About, Skill, Project, Blog, Experience, Testimonial, Service, Message

def seed_database():
    # Only seed if no admin user exists
    if User.query.first():
        return

    print('[*] Seeding database with initial portfolio & CMS data...')

    # 1. Admin User
    admin = User(
        username='admin',
        email='admin@example.com',
        role='admin'
    )
    admin.set_password('admin123')
    db.session.add(admin)

    # 2. About
    about = About(
        name='Alex Rivera',
        title='Senior Full-Stack Engineer & Cloud Solutions Architect',
        bio='Passionate software engineer with 6+ years of experience designing and building high-performance web applications, scalable distributed APIs, and delightful user experiences. Focused on clean architecture, modern React ecosystems, and robust Python/Node microservices.',
        avatar_url='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        resume_url='#',
        location='San Francisco, CA (Open to Remote)',
        email='alex.rivera.dev@gmail.com',
        phone='+1 (555) 234-5678',
        github='https://github.com',
        linkedin='https://linkedin.com',
        twitter='https://twitter.com',
        website='https://alexrivera.dev',
        years_experience=6,
        projects_completed=38,
        satisfied_clients=24
    )
    db.session.add(about)

    # 3. Skills
    skills_data = [
        # Frontend
        {'name': 'React & Next.js', 'category': 'Frontend', 'proficiency': 95, 'icon': 'Layers', 'order': 1},
        {'name': 'TypeScript / JavaScript', 'category': 'Frontend', 'proficiency': 92, 'icon': 'Code', 'order': 2},
        {'name': 'Tailwind CSS & Framer Motion', 'category': 'Frontend', 'proficiency': 90, 'icon': 'Palette', 'order': 3},
        {'name': 'Vue.js / Nuxt', 'category': 'Frontend', 'proficiency': 82, 'icon': 'Layout', 'order': 4},
        
        # Backend
        {'name': 'Python (Flask / FastAPI)', 'category': 'Backend', 'proficiency': 94, 'icon': 'Server', 'order': 5},
        {'name': 'Node.js / Express / NestJS', 'category': 'Backend', 'proficiency': 88, 'icon': 'Terminal', 'order': 6},
        {'name': 'REST & GraphQL APIs', 'category': 'Backend', 'proficiency': 92, 'icon': 'Share2', 'order': 7},
        {'name': 'Microservices & JWT Auth', 'category': 'Backend', 'proficiency': 90, 'icon': 'ShieldCheck', 'order': 8},
        
        # Database & Cloud
        {'name': 'PostgreSQL & SQLite', 'category': 'Database', 'proficiency': 90, 'icon': 'Database', 'order': 9},
        {'name': 'MongoDB & Redis Cache', 'category': 'Database', 'proficiency': 85, 'icon': 'HardDrive', 'order': 10},
        {'name': 'Docker & Kubernetes', 'category': 'DevOps', 'proficiency': 84, 'icon': 'Box', 'order': 11},
        {'name': 'AWS / GCP / Cloudflare', 'category': 'DevOps', 'proficiency': 86, 'icon': 'Cloud', 'order': 12},
    ]
    for s in skills_data:
        db.session.add(Skill(**s))

    # 4. Projects
    projects_data = [
        {
            'title': 'OmniSync - Cloud Asset & Workspace Orchestrator',
            'description': 'Real-time collaborative workspace manager with distributed state synchronization, granular permission controls, and lightning-fast file streaming.',
            'content': 'OmniSync handles real-time synchronization across hundreds of concurrent team members using WebSockets and Redis streams. Built with Python Flask backend and React frontend.',
            'tags': json.dumps(['Python', 'Flask', 'React', 'Redis', 'Docker', 'TailwindCSS']),
            'image_url': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
            'demo_url': 'https://example.com/omnisync-demo',
            'github_url': 'https://github.com/example/omnisync',
            'featured': True,
            'order': 1
        },
        {
            'title': 'ApexPulse - AI-Driven Financial Analytics Dashboard',
            'description': 'Modern financial intelligence portal featuring predictive trend modeling, interactive trading charts, and automated portfolio rebalancing alerts.',
            'content': 'Provides sub-second querying across millions of historical market records. Features JWT authentication, role-based access, and dark mode UI.',
            'tags': json.dumps(['Next.js', 'FastAPI', 'PostgreSQL', 'Chart.js', 'TailwindCSS']),
            'image_url': 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=900&q=80',
            'demo_url': 'https://example.com/apexpulse-demo',
            'github_url': 'https://github.com/example/apexpulse',
            'featured': True,
            'order': 2
        },
        {
            'title': 'HyperCMS - Headless Content Hub & Asset CDN',
            'description': 'Custom lightweight headless CMS built from the ground up with dynamic schema builders, instant webhooks, and multi-tenant publishing.',
            'content': 'The foundation for decoupled enterprise portfolios and marketing platforms. Supports rich media processing, markdown editors, and live revision history.',
            'tags': json.dumps(['Python Flask', 'SQLAlchemy', 'React', 'REST API', 'Vite']),
            'image_url': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
            'demo_url': 'https://example.com/hypercms-demo',
            'github_url': 'https://github.com/example/hypercms',
            'featured': True,
            'order': 3
        },
        {
            'title': 'DevShield - Secure Multi-Cloud API Gateway',
            'description': 'High-throughput reverse proxy with automated TLS certificate management, rate-limiting algorithms, and anomalous traffic detection.',
            'content': 'Handles over 10,000 req/sec with minimal latency overhead. Designed for microservice architectures requiring enterprise-grade security.',
            'tags': json.dumps(['Go', 'Python', 'Docker', 'Redis', 'Prometheus']),
            'image_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
            'demo_url': 'https://example.com/devshield-demo',
            'github_url': 'https://github.com/example/devshield',
            'featured': False,
            'order': 4
        }
    ]
    for p in projects_data:
        db.session.add(Project(**p))

    # 5. Blogs
    blogs_data = [
        {
            'title': 'Building a Custom Headless CMS with Python and React in 2026',
            'slug': 'building-custom-headless-cms-python-react',
            'excerpt': 'Why building your own CMS from scratch can be significantly more performant and secure than off-the-shelf monolithic alternatives.',
            'content': 'Modern web development often pushes developers towards heavy third-party CMS platforms. However, constructing a tailor-made CMS backend using Python Flask and React offers unmatched control, zero vendor lock-in, and ultra-lean database schemas.\n\nIn this comprehensive deep dive, we explore how relational data models, JWT authentication, and optimized REST APIs create an unstoppable stack.',
            'cover_image': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
            'tags': json.dumps(['Python', 'Architecture', 'CMS', 'React']),
            'read_time': '6 min read',
            'published': True,
            'views': 412
        },
        {
            'title': 'Optimizing Full-Stack Performance: From Database Indices to React Virtual DOM',
            'slug': 'optimizing-full-stack-performance',
            'excerpt': 'Key techniques for cutting page load times below 300ms, minimizing network round-trips, and boosting Core Web Vitals.',
            'content': 'Performance is not an afterthought; it is a foundational feature. We review database indexing strategies in SQLite/PostgreSQL, query batching with SQLAlchemy, and debounced state in React.',
            'cover_image': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
            'tags': json.dumps(['Performance', 'SQLAlchemy', 'Frontend', 'Optimization']),
            'read_time': '8 min read',
            'published': True,
            'views': 685
        },
        {
            'title': 'Mastering Clean Architecture in RESTful Python APIs',
            'slug': 'clean-architecture-python-rest-apis',
            'excerpt': 'How to separate business logic, domain models, and presentation layers for scalable, maintainable microservices.',
            'content': 'Structuring applications with separation of concerns guarantees long-term maintainability. Here is how we separate repository layers, service layers, and route blueprints in Flask and FastAPI.',
            'cover_image': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
            'tags': json.dumps(['Python', 'Flask', 'CleanCode', 'Backend']),
            'read_time': '5 min read',
            'published': True,
            'views': 329
        }
    ]
    for b in blogs_data:
        db.session.add(Blog(**b))

    # 6. Experience
    exp_data = [
        {
            'role': 'Lead Full-Stack Architect',
            'company': 'Vanguard Cloud Technologies',
            'location': 'San Francisco, CA',
            'period': '2023 - Present',
            'description': 'Directed engineering teams across distributed frontend and backend microservices. Spearheaded custom CMS platform overhaul, reducing content delivery latency by 45%.',
            'technologies': json.dumps(['Python', 'FastAPI', 'React', 'Docker', 'AWS']),
            'is_current': True,
            'order': 1
        },
        {
            'role': 'Senior Backend Engineer',
            'company': 'Nexus Dynamics',
            'location': 'Austin, TX (Remote)',
            'period': '2021 - 2023',
            'description': 'Architected high-throughput REST APIs and data ingestion pipelines processing 2M+ daily requests. Designed secure JWT authentication and role-based access systems.',
            'technologies': json.dumps(['Flask', 'PostgreSQL', 'Redis', 'Celery', 'TypeScript']),
            'is_current': False,
            'order': 2
        },
        {
            'role': 'Full-Stack Software Engineer',
            'company': 'Aura Interactive Labs',
            'location': 'New York, NY',
            'period': '2019 - 2021',
            'description': 'Developed dynamic web platforms, responsive component libraries, and client portals with React, Tailwind CSS, and Node.js.',
            'technologies': json.dumps(['React', 'Node.js', 'TailwindCSS', 'GraphQL', 'MongoDB']),
            'is_current': False,
            'order': 3
        }
    ]
    for e in exp_data:
        db.session.add(Experience(**e))

    # 7. Testimonials
    test_data = [
        {
            'client_name': 'Sarah Jenkins',
            'company': 'AcroTech Solutions',
            'position': 'VP of Engineering',
            'quote': 'Alex delivered an extraordinary custom CMS and portfolio architecture ahead of schedule. The code quality, API documentation, and UI polish were world-class.',
            'avatar_url': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            'rating': 5,
            'order': 1
        },
        {
            'client_name': 'David Miller',
            'company': 'Vertex Labs',
            'position': 'Founder & CEO',
            'quote': 'Working with Alex completely transformed our digital presence. The custom admin dashboard makes content updates effortless and the site runs with blazing speed.',
            'avatar_url': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
            'rating': 5,
            'order': 2
        },
        {
            'client_name': 'Elena Rostova',
            'company': 'FinCloud Global',
            'position': 'Head of Product',
            'quote': 'Exceptional attention to detail in both backend architecture and frontend animations. One of the most reliable and talented full-stack engineers I have worked with.',
            'avatar_url': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
            'rating': 5,
            'order': 3
        }
    ]
    for t in test_data:
        db.session.add(Testimonial(**t))

    # 8. Services
    serv_data = [
        {
            'title': 'Full-Stack Web Application Development',
            'description': 'End-to-end bespoke web apps engineered with modern React, TypeScript, and Python Flask/FastAPI backends. Tailored for scalability and top performance.',
            'icon': 'Code',
            'deliverables': json.dumps(['Custom Frontend UI', 'Robust REST/GraphQL API', 'Database Architecture', 'Automated Unit Tests']),
            'pricing': 'From ,500',
            'order': 1
        },
        {
            'title': 'Custom CMS & Content Engine',
            'description': 'Zero vendor lock-in headless CMS platforms designed specifically for your data models, workflow requirements, and multi-channel publishing.',
            'icon': 'LayoutDashboard',
            'deliverables': json.dumps(['Admin Management Portal', 'Dynamic Schema CRUD', 'Media Upload Handler', 'JWT Protected Endpoints']),
            'pricing': 'From ,800',
            'order': 2
        },
        {
            'title': 'Cloud Architecture & DevOps Pipelines',
            'description': 'Production-ready cloud deployments on AWS, Docker containerization, CI/CD automated test pipelines, and security hardening.',
            'icon': 'CloudLightning',
            'deliverables': json.dumps(['Docker Multi-Stage Builds', 'CI/CD GitHub Actions', 'Reverse Proxy & SSL Setup', 'Monitoring & Metrics']),
            'pricing': 'From ,500',
            'order': 3
        },
        {
            'title': 'UI/UX Polish & Web Performance Tuning',
            'description': 'Speed audits, Core Web Vitals optimization, responsive mobile design, and modern dark-mode glassmorphic animations.',
            'icon': 'Sparkles',
            'deliverables': json.dumps(['Sub-second Page Speeds', 'Interactive Micro-animations', 'Accessibility & SEO Auditing', 'Cross-browser QA']),
            'pricing': 'From ,200',
            'order': 4
        }
    ]
    for sv in serv_data:
        db.session.add(Service(**sv))

    # 9. Initial Messages
    msg = Message(
        name='Jonathan Edwards',
        email='jonathan@innovatetech.io',
        subject='Full-Stack Enterprise App Project Inquiry',
        message='Hi Alex, we reviewed your work on OmniSync and would love to discuss developing a custom management dashboard for our team. Are you available for a discovery call this week?',
        is_read=False
    )
    db.session.add(msg)

    db.session.commit()
    print('[OK] Database seeded successfully with initial models!')
