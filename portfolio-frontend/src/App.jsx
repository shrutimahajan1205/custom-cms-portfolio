import React, { useEffect, useState } from 'react';
import { portfolioApi } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [a, s, p, e, sv, t, b] = await Promise.all([
          portfolioApi.getAbout(),
          portfolioApi.getSkills(),
          portfolioApi.getProjects(),
          portfolioApi.getExperience(),
          portfolioApi.getServices(),
          portfolioApi.getTestimonials(),
          portfolioApi.getBlogs(),
        ]);
        setAbout(a);
        setSkills(s || []);
        setProjects(p || []);
        setExperience(e || []);
        setServices(sv || []);
        setTestimonials(t || []);
        setBlogs(b || []);
      } catch (err) {
        console.error('Error fetching CMS portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <Navbar about={about} />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
        <Blog blogs={blogs} />
        <Contact about={about} />
      </main>
      <Footer about={about} />
    </div>
  );
}
