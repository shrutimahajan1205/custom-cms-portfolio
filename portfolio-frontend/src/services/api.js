// Frontend API Service - Fetches live data from custom CMS backend
const API_BASE = 'http://127.0.0.1:5000/api';

async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const res = await fetch(API_BASE + endpoint, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("[CMS API] Using fallback data for " + endpoint + ":", err.message);
    return fallbackData;
  }
}

export const portfolioApi = {
  getAbout: () => fetchWithFallback('/about', {
    name: 'Alex Rivera',
    title: 'Senior Full-Stack Engineer & Cloud Solutions Architect',
    bio: 'Passionate software engineer with 6+ years of experience designing and building high-performance web applications, scalable distributed APIs, and delightful user experiences. Focused on clean architecture, modern React ecosystems, and robust Python/Node microservices.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    resume_url: '#',
    location: 'San Francisco, CA (Open to Remote)',
    email: 'alex.rivera.dev@gmail.com',
    phone: '+1 (555) 234-5678',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    years_experience: 6,
    projects_completed: 38,
    satisfied_clients: 24,
  }),

  getSkills: () => fetchWithFallback('/skills', [
    { id: 1, name: 'React & Next.js', category: 'Frontend', proficiency: 95, icon: 'Layers' },
    { id: 2, name: 'TypeScript / JavaScript', category: 'Frontend', proficiency: 92, icon: 'Code' },
    { id: 3, name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: 'Palette' },
    { id: 4, name: 'Python (Flask / FastAPI)', category: 'Backend', proficiency: 94, icon: 'Server' },
    { id: 5, name: 'Node.js & Express', category: 'Backend', proficiency: 88, icon: 'Terminal' },
    { id: 6, name: 'PostgreSQL & SQLite', category: 'Database', proficiency: 90, icon: 'Database' },
    { id: 7, name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 84, icon: 'Box' },
    { id: 8, name: 'AWS Cloud Services', category: 'DevOps', proficiency: 86, icon: 'Cloud' },
  ]),

  getProjects: () => fetchWithFallback('/projects', [
    {
      id: 1,
      title: 'OmniSync - Cloud Asset & Workspace Orchestrator',
      description: 'Real-time collaborative workspace manager with distributed state synchronization, granular permission controls, and lightning-fast file streaming.',
      content: 'OmniSync handles real-time synchronization across hundreds of concurrent team members using WebSockets and Redis streams. Built with Python Flask backend and React frontend.',
      tags: ['Python', 'Flask', 'React', 'Redis', 'Docker'],
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      demo_url: 'https://example.com/omnisync-demo',
      github_url: 'https://github.com/example/omnisync',
      featured: true,
    },
    {
      id: 2,
      title: 'ApexPulse - AI-Driven Financial Analytics Dashboard',
      description: 'Modern financial intelligence portal featuring predictive trend modeling, interactive trading charts, and automated portfolio rebalancing alerts.',
      tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Chart.js'],
      image_url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=900&q=80',
      demo_url: 'https://example.com/apexpulse-demo',
      github_url: 'https://github.com/example/apexpulse',
      featured: true,
    },
    {
      id: 3,
      title: 'HyperCMS - Headless Content Hub & Asset CDN',
      description: 'Custom lightweight headless CMS built from the ground up with dynamic schema builders, instant webhooks, and multi-tenant publishing.',
      tags: ['Python Flask', 'SQLAlchemy', 'React', 'REST API'],
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      demo_url: 'https://example.com/hypercms-demo',
      github_url: 'https://github.com/example/hypercms',
      featured: true,
    }
  ]),

  getBlogs: () => fetchWithFallback('/blogs', [
    {
      id: 1,
      title: 'Building a Custom Headless CMS with Python and React in 2026',
      slug: 'building-custom-headless-cms-python-react',
      excerpt: 'Why building your own CMS from scratch can be significantly more performant and secure than off-the-shelf monolithic alternatives.',
      content: 'Modern web development often pushes developers towards heavy third-party CMS platforms. However, constructing a tailor-made CMS backend using Python Flask and React offers unmatched control, zero vendor lock-in, and ultra-lean database schemas.\n\nIn this comprehensive deep dive, we explore how relational data models, JWT authentication, and optimized REST APIs create an unstoppable stack.',
      cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
      tags: ['Python', 'Architecture', 'CMS', 'React'],
      read_time: '6 min read',
      published: true,
      views: 412,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Optimizing Full-Stack Performance: From Database Indices to React Virtual DOM',
      slug: 'optimizing-full-stack-performance',
      excerpt: 'Key techniques for cutting page load times below 300ms, minimizing network round-trips, and boosting Core Web Vitals.',
      content: 'Performance is not an afterthought; it is a foundational feature. We review database indexing strategies in SQLite/PostgreSQL, query batching with SQLAlchemy, and debounced state in React.',
      cover_image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
      tags: ['Performance', 'SQLAlchemy', 'Optimization'],
      read_time: '8 min read',
      published: true,
      views: 685,
      created_at: new Date().toISOString(),
    }
  ]),

  getExperience: () => fetchWithFallback('/experience', [
    {
      id: 1,
      role: 'Lead Full-Stack Architect',
      company: 'Vanguard Cloud Technologies',
      location: 'San Francisco, CA',
      period: '2023 - Present',
      description: 'Directed engineering teams across distributed frontend and backend microservices. Spearheaded custom CMS platform overhaul, reducing content delivery latency by 45%.',
      technologies: ['Python', 'FastAPI', 'React', 'Docker', 'AWS'],
      is_current: true,
    },
    {
      id: 2,
      role: 'Senior Backend Engineer',
      company: 'Nexus Dynamics',
      location: 'Austin, TX (Remote)',
      period: '2021 - 2023',
      description: 'Architected high-throughput REST APIs and data ingestion pipelines processing 2M+ daily requests. Designed secure JWT authentication and role-based access systems.',
      technologies: ['Flask', 'PostgreSQL', 'Redis', 'TypeScript'],
      is_current: false,
    }
  ]),

  getTestimonials: () => fetchWithFallback('/testimonials', [
    {
      id: 1,
      client_name: 'Sarah Jenkins',
      company: 'AcroTech Solutions',
      position: 'VP of Engineering',
      quote: 'Alex delivered an extraordinary custom CMS and portfolio architecture ahead of schedule. The code quality, API documentation, and UI polish were world-class.',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
    {
      id: 2,
      client_name: 'David Miller',
      company: 'Vertex Labs',
      position: 'Founder & CEO',
      quote: 'Working with Alex completely transformed our digital presence. The custom admin dashboard makes content updates effortless and the site runs with blazing speed.',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    }
  ]),

  getServices: () => fetchWithFallback('/services', [
    {
      id: 1,
      title: 'Full-Stack Web Application Development',
      description: 'End-to-end bespoke web apps engineered with modern React, TypeScript, and Python Flask backends. Tailored for scalability and top performance.',
      icon: 'Code',
      deliverables: ['Custom Frontend UI', 'Robust REST API', 'Database Architecture', 'Automated Unit Tests'],
      pricing: 'From $2,500',
    },
    {
      id: 2,
      title: 'Custom CMS & Content Engine',
      description: 'Zero vendor lock-in headless CMS platforms designed specifically for your data models, workflow requirements, and multi-channel publishing.',
      icon: 'LayoutDashboard',
      deliverables: ['Admin Management Portal', 'Dynamic Schema CRUD', 'Media Upload Handler', 'JWT Protected Endpoints'],
      pricing: 'From $1,800',
    },
    {
      id: 3,
      title: 'Cloud Architecture & DevOps Pipelines',
      description: 'Production-ready cloud deployments on AWS, Docker containerization, CI/CD automated test pipelines, and security hardening.',
      icon: 'CloudLightning',
      deliverables: ['Docker Multi-Stage Builds', 'CI/CD GitHub Actions', 'Reverse Proxy & SSL Setup'],
      pricing: 'From $1,500',
    }
  ]),

  submitContact: async (formData) => {
    const res = await fetch(API_BASE + '/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return data;
  }
};
