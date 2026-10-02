import React, { useState, useEffect } from 'react';
import { getAuthToken, removeAuthToken, removeCurrentUser, api } from './services/api';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutManager from './pages/AboutManager';
import SkillsManager from './pages/SkillsManager';
import ProjectsManager from './pages/ProjectsManager';
import BlogsManager from './pages/BlogsManager';
import ExperienceManager from './pages/ExperienceManager';
import TestimonialsManager from './pages/TestimonialsManager';
import ServicesManager from './pages/ServicesManager';
import MessagesInbox from './pages/MessagesInbox';
import MediaManager from './pages/MediaManager';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async () => {
    try {
      const stats = await api.getStats();
      if (stats) setUnreadCount(stats.unread_messages || 0);
    } catch (err) {
      // Ignore
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnread();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    removeAuthToken();
    removeCurrentUser();
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} unreadMessages={unreadCount} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onLogout={handleLogout} />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'about' && <AboutManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'blogs' && <BlogsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'messages' && <MessagesInbox onRefreshUnread={fetchUnread} />}
          {activeTab === 'media' && <MediaManager />}
        </main>
      </div>
    </div>
  );
}
