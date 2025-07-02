import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

// Lazy load page components for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
