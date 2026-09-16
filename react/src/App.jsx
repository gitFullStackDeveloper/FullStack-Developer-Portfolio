import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './App.css'

import Header from './components/Website/header';
import Footer from './components/Website/footer';

// website home page
import Hero from './components/Website/home/Hero';
import WhyChooseMe from './components/Website/home/WhyChooseMe';
import About from './components/Website/home/About';
import Services from './components/Website/home/Services';
import Skills from './components/Website/home/Skills';
import Portfolio from './components/Website/home/Portfolio';
import Contact from './components/Website/home/Contact';

// website about page 
import WebsiteAboutHero from './components/Website/about/Hero';
import WebsiteAboutBio from './components/Website/about/BioSection';
import WebsiteAboutExperienceTimeline from './components/Website/about/ExperienceTimeline';
import WebsiteAboutCoreValues from './components/Website/about/CoreValues';
import WebsiteAboutInterests from './components/Website/about/Interests';
import WebsiteAboutCTA from './components/Website/about/AboutCTA';
import Certifications from './components/Website/about/Certifications';
import CertificateView from './components/Website/about/CertificateView';
// service detail components
import ServiceHero from './components/Website/service-detail/ServiceHero';
import ServiceTechStack from './components/Website/service-detail/ServiceTechStack';
import ServiceFeatures from './components/Website/service-detail/ServiceFeatures';
import ServiceProcess from './components/Website/service-detail/ServiceProcess';
import { useParams } from 'react-router-dom';

// services page
import ServicesHero from './components/Website/services/ServicesHero';
import AllServices from './components/Website/services/AllServices';
import WhyChooseServices from './components/Website/services/WhyChooseServices';
import ServicesFAQ from './components/Website/services/FAQ';

// contact page
import ContactHero from './components/Website/contact/ContactHero';
import ContactForm from './components/Website/contact/ContactForm';
import ProjectDetailsForm from './components/Website/contact/ProjectDetails';
import ThankYou from './components/Website/contact/ThankYou';

// projects page
import ProjectsHero from './components/Website/projects/ProjectsHero';
import AvailableProjects from './components/Website/projects/AvailableProjects';
import WhyBuyBenefits from './components/Website/projects/WhyBuyBenefits';
import HowItWorks from './components/Website/projects/HowItWorks';

// project detail page
import ProjectGallery from './components/Website/project-detail/ProjectGallery';
import ProjectInfo from './components/Website/project-detail/ProjectInfo';
import ProjectTabs from './components/Website/project-detail/ProjectTabs';
import ProjectCTA from './components/Website/project-detail/ProjectCTA';

// portfolio
import PortfolioHero from './components/Website/portfolio/PortfolioHero';
import PortfolioGrid from './components/Website/portfolio/PortfolioGrid';
import FeaturedProject from './components/Website/portfolio/FeaturedProject';
import StatsCounter from './components/Website/portfolio/StatsCounter';

// funnel-home
import FunnelHero from './components/Website/funnel-home/FunnelHero';
import TrustSection from './components/Website/funnel-home/TrustSection';
import HowItWorksFunnal from './components/Website/funnel-home/HowItWorks';
import StoryGrowth from './components/Website/funnel-home/StoryGrowth';

// admin
import AdminProjects from './components/Website/admin/AdminProjects';
import AdminServices from './components/Website/admin/AdminServices';
import AdminContacts from './components/Website/admin/AdminContacts';
import AdminSettings from './components/Website/admin/AdminSettings';
import Login from './components/Website/admin/Login';
import AdminProfile from './components/Website/admin/AdminProfile';
import AdminSignup from './components/Website/admin/AdminSignup';
import { AuthProvider, useAuth } from './components/Website/admin/AuthContext';
import AdminCertifications from './components/Website/admin/AdminCertifications';

import SupportChatWidget from './components/Website/SupportChatWidget';
import AdminAnalytics from './components/Website/admin/AdminAnalytics';
import AdminDashboard from './components/Website/admin/AdminDashboard';

import GlobalLoader from './components/Website/GlobalLoader'; 


const trackPageView = (page_type, item_id = null) => {
  fetch(`${window.API_BASE}/api/analytics/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page_type,
      item_id,
      path: window.location.pathname
    })
  }).catch(() => {});
};


// ---------- Page Components ----------
const WebsiteHomePage = () => (
  <>
    <Hero />
    <WhyChooseMe />
    <About />
    <Skills />
    <Services />
    <Portfolio />
    <ContactForm />
  </>
);

const WebsiteAboutPage = () => (
  <>
    <WebsiteAboutHero />
    <WebsiteAboutBio />
    <Skills />
    <WebsiteAboutExperienceTimeline />
    <Certifications />
    <Portfolio />
    <WebsiteAboutCoreValues />
    {/* <WebsiteAboutInterests /> */}
    <WebsiteAboutCTA />
  </>
);

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchService = async () => {
//     try {
//       // const res = await fetch(`/api/services/slug/${serviceId}`);
//       const res = await fetch(`${window.API_BASE}/api/services/slug/${serviceId}`);
//       if (!res.ok) throw new Error('Service not found');
//       const data = await res.json();
//       setService(data);
//     } catch (err) {
//       console.error(err);
//       setService(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchService();
// }, [serviceId]);
useEffect(() => {
  const fetchService = async () => {
    // ✅ Notify App that a page load is starting
    window.dispatchEvent(new CustomEvent('pageLoadingChange', { detail: true }));
    try {
      const res = await fetch(`${window.API_BASE}/api/services/slug/${serviceId}`);
      if (!res.ok) throw new Error('Service not found');
      const data = await res.json();
      setService(data);
    } catch (err) {
      console.error(err);
      setService(null);
    } finally {
      setLoading(false);
      // ✅ Notify App that loading is done
      window.dispatchEvent(new CustomEvent('pageLoadingChange', { detail: false }));
    }
  };
  fetchService();
}, [serviceId]);
useEffect(() => {
  if (service?.id) {
    trackPageView('service', service.id);
  }
}, [service?.id]);
  if (loading) return null;   // 👈 loader will be shown globally
  // if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}><i className="fa-solid fa-spinner fa-spin"></i> Loading service...</div>;
  if (!service) return <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}><i className="fa-solid fa-circle-exclamation"></i> Service not found.</div>;

  return (
    <>
      <ServiceHero service={service} />
      <ServiceTechStack techStack={service.techStack} />
      <ServiceFeatures features={service.features} />
      <ServiceProcess process={service.process} />
      <WebsiteAboutCTA />
    </>
  );
};

const ServicesPage = () => (
  <>
    <ServicesHero />
    <AllServices />
    <WhyChooseServices />
    <ServicesFAQ />
    <WebsiteAboutCTA />
  </>
);

const ContactPage = () => (
  <>
    <ContactHero />
    <ContactForm />
  </>
);

const ProjectDetailsPage = () => <ProjectDetailsForm />;
const ThankYouPage = () => <ThankYou />;

const ProjectsPage = () => (
  <>
    <ProjectsHero />
    <AvailableProjects />
    <WhyBuyBenefits />
    <HowItWorks />
    <WebsiteAboutCTA />
  </>
);

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchProject = async () => {
//     try {
//       // const res = await fetch(`/api/projects/${projectId}`);
//       const res = await fetch(`${window.API_BASE}/api/projects/${projectId}`);
//       if (!res.ok) throw new Error('Project not found');
//       const data = await res.json();
//       setProject(data);
//     } catch (err) {
//       console.error(err);
//       setProject(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchProject();
// }, [projectId]);
useEffect(() => {
  const fetchProject = async () => {
    // ✅ Notify App that a page load is starting
    window.dispatchEvent(new CustomEvent('pageLoadingChange', { detail: true }));
    try {
      const res = await fetch(`${window.API_BASE}/api/projects/${projectId}`);
      if (!res.ok) throw new Error('Project not found');
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error(err);
      setProject(null);
    } finally {
      setLoading(false);
      // ✅ Notify App that loading is done
      window.dispatchEvent(new CustomEvent('pageLoadingChange', { detail: false }));
    }
  };
  fetchProject();
}, [projectId]);
useEffect(() => {
  if (project?.id) {
    trackPageView('project', project.id);
  }
}, [project?.id]);
  if (loading) return null;
  // if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}><i className="fa-solid fa-spinner fa-spin"></i> Loading project...</div>;
  if (!project) return <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}><i className="fa-solid fa-circle-exclamation"></i> Project not found.</div>;

  return (
    <>
      <ProjectGallery project={project} />
      <ProjectInfo project={project} />
      <ProjectTabs project={project} />
      <WebsiteAboutCTA />
    </>
  );
};

const PortfolioPage = () => (
  <>
    <PortfolioHero />
    <PortfolioGrid />
    <StatsCounter />
    <WebsiteAboutCTA />
  </>
);

const FunnelHomePage = () => (
  <>
    <FunnelHero />
    <TrustSection />
    <HowItWorksFunnal />
    <StoryGrowth />
    <ContactForm />
  </>
);

// ---------- Protected Route Wrapper ----------
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};



// ---------- App Component ----------
// function App() {
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith('/admin');

//   // ✅ Global Loader state INSIDE App component

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);
function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // ✅ Global Loader state INSIDE App component
  // const [isLoading, setIsLoading] = useState(true);
const [isLoading, setIsLoading] = useState(false);
  // const [pageLoading, setPageLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(
    () => location.pathname.startsWith('/service/') || location.pathname.startsWith('/project/')
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const handlePageLoading = (e) => {
      setPageLoading(e.detail);
    };
    window.addEventListener('pageLoadingChange', handlePageLoading);
    return () => window.removeEventListener('pageLoadingChange', handlePageLoading);
  }, []);
  // return (
  //   <AuthProvider>
  //     <div className="app">
  //       {!isAdminPage && <Header />}
  //       <Routes>
    return (
    <AuthProvider>
      <div className="app">
        {!isAdminPage && !pageLoading && <Header />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WebsiteHomePage />} />
          <Route path="/home" element={<WebsiteHomePage />} />
          <Route path="/about" element={<WebsiteAboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/project-details" element={<ProjectDetailsPage />} />
          <Route path="/contact/thank-you" element={<ThankYouPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/funnel" element={<FunnelHomePage />} />

          {/* Admin – Login (public) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin – Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
          <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/signup" element={<ProtectedRoute><AdminSignup /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/certifications" element={<ProtectedRoute><AdminCertifications /></ProtectedRoute>} />
          <Route path="/certificate/:id" element={<CertificateView />} />
        </Routes>
        {/* {!isAdminPage && <Footer />}
        <SupportChatWidget />
        <GlobalLoader isLoading={isLoading} /> */}
              {!isAdminPage && !pageLoading && <Footer />}
        <SupportChatWidget />
        <GlobalLoader isLoading={isLoading || pageLoading} />
      </div>
    </AuthProvider>
  );
}

export default App;