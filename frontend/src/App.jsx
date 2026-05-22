import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import AttenderHub from './pages/AttenderHub';
import CreatorHub from './pages/CreatorHub';
import AdminCommand from './pages/AdminCommand';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackgroundBlobs = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px] animate-blob mix-blend-screen"></div>
    <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-tertiary/10 rounded-full filter blur-[150px] animate-blob animation-delay-2000 mix-blend-screen"></div>
    <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full filter blur-[100px] animate-blob animation-delay-4000 mix-blend-screen"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <BackgroundBlobs />
        <div className="flex flex-col min-h-screen bg-surface-dim text-on-background">
          <Navbar />
          <main className="flex-grow pt-24 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/event/:id" element={<EventDetails />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserProfile />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['attender']} />}>
                <Route path="/attender" element={<AttenderHub />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['creator', 'admin']} />}>
                <Route path="/creator" element={<CreatorHub />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/edit-event/:id" element={<EditEvent />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminCommand />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;