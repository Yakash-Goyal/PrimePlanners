import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = (path) =>
    `font-label-md text-label-md tracking-widest uppercase transition-colors ${
      location.pathname === path
        ? 'text-primary'
        : 'text-on-surface-variant hover:text-white'
    }`;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1440px]">
      <div className="glass-card bg-surface/60 backdrop-blur-2xl rounded-full px-8 py-3 flex justify-between items-center border border-white/10 shadow-2xl">
        <Link to="/" className="font-headline-lg text-title-lg font-black text-white tracking-tighter">
          PRIME<span className="text-primary">PLANNERS</span>
        </Link>
        <div className="hidden lg:flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/events" className={linkClass('/events')}>Events</Link>
          <Link to="/my-events" className={linkClass('/my-events')}>My Events</Link>
          
          {user?.role === 'creator' && (
            <Link to="/creator" className={linkClass('/creator')}>Creator Hub</Link>
          )}
          {user?.role === 'attender' && (
            <Link to="/attender" className={linkClass('/attender')}>My Tickets</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className={linkClass('/admin')}>Admin</Link>
          )}

          <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
        </div>
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/profile" className="text-on-surface-variant hover:text-white font-label-md text-label-md uppercase tracking-widest transition-colors flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="text-on-surface-variant hover:text-tertiary font-label-md text-label-md uppercase tracking-widest transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-on-surface-variant hover:text-white font-label-md text-label-md uppercase tracking-widest transition-colors">Login</Link>
              <Link to="/auth?mode=signup" className="bg-primary text-white px-6 py-2 rounded-full font-label-md text-label-md uppercase tracking-widest neon-glow-primary hover:scale-105 transition-all">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;