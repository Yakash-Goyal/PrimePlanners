import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1440px]">
      <div className="glass-card bg-surface/60 backdrop-blur-2xl rounded-full px-8 py-3 flex justify-between items-center border border-white/10 shadow-2xl">
        <Link to="/" className="font-headline-lg text-title-lg font-black text-white tracking-tighter">
          PRIME<span className="text-primary">PLANNERS</span>
        </Link>
        <div className="hidden lg:flex gap-10 items-center absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="font-label-md text-label-md text-primary tracking-widest uppercase hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase hover:text-white transition-colors">About</Link>
          <Link to="/events" className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase hover:text-white transition-colors">Events</Link>
          <Link to="/contact" className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/auth" className="text-on-surface-variant hover:text-white font-label-md text-label-md uppercase tracking-widest transition-colors">Login</Link>
          <Link to="/auth?mode=signup" className="bg-primary text-white px-6 py-2 rounded-full font-label-md text-label-md uppercase tracking-widest neon-glow-primary hover:scale-105 transition-all">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;