// API Service for Custom CMS
const API_BASE = 'http://127.0.0.1:5000/api';

export const getAuthToken = () => localStorage.getItem('cms_jwt_token');
export const setAuthToken = (token) => localStorage.setItem('cms_jwt_token', token);
export const removeAuthToken = () => localStorage.removeItem('cms_jwt_token');

export const getCurrentUser = () => {
  const user = localStorage.getItem('cms_user');
  return user ? JSON.parse(user) : null;
};
export const setCurrentUser = (user) => localStorage.setItem('cms_user', JSON.stringify(user));
export const removeCurrentUser = () => localStorage.removeItem('cms_user');

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(API_BASE + endpoint, {
      ...options,
      headers,
    });

    if (res.status === 401 && !endpoint.includes('/auth/login')) {
      removeAuthToken();
      removeCurrentUser();
      window.location.href = '/';
      throw new Error('Session expired. Please log in again.');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }
    return data;
  } catch (err) {
    console.error('API Error on ' + endpoint + ':', err);
    throw err;
  }
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData)
}),
  getMe: () => request('/auth/me'),
  
  // Dashboard Stats
  getStats: () => request('/stats'),
  
  // About
  getAbout: () => request('/about'),
  updateAbout: (data) => request('/about', { method: 'PUT', body: JSON.stringify(data) }),

  // Skills
  getSkills: () => request('/skills'),
  createSkill: (data) => request('/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id, data) => request('/skills/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id) => request('/skills/' + id, { method: 'DELETE' }),

  // Projects
  getProjects: () => request('/projects'),
  getProject: (id) => request('/projects/' + id),
  createProject: (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request('/projects/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request('/projects/' + id, { method: 'DELETE' }),

  // Blogs
  getBlogs: () => request('/blogs'),
  createBlog: (data) => request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id, data) => request('/blogs/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id) => request('/blogs/' + id, { method: 'DELETE' }),

  // Experience
  getExperience: () => request('/experience'),
  createExperience: (data) => request('/experience', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id, data) => request('/experience/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id) => request('/experience/' + id, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => request('/testimonials'),
  createTestimonial: (data) => request('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id, data) => request('/testimonials/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id) => request('/testimonials/' + id, { method: 'DELETE' }),

  // Services
  getServices: () => request('/services'),
  createService: (data) => request('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id, data) => request('/services/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id) => request('/services/' + id, { method: 'DELETE' }),

  // Contact Messages
  getMessages: () => request('/messages'),
  markMessageRead: (id) => request('/messages/' + id + '/read', { method: 'PUT' }),
  deleteMessage: (id) => request('/messages/' + id, { method: 'DELETE' }),

  // Media
  getMedia: () => request('/media'),
  deleteMedia: (id) => request('/media/' + id, { method: 'DELETE' }),
  uploadImage: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch(API_BASE + '/upload/image', {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data;
  }
};
