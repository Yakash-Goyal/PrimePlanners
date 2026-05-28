import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] w-full pt-20 pb-12 px-[40px] border-t border-white/10 relative z-30 overflow-hidden mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="font-headline-lg text-headline-lg text-white tracking-tighter font-black uppercase mb-4">
            PRIME<span className="text-primary neon-text-glow">PLANNERS</span>
          </div>
          <p className="font-Inter text-body-md text-on-surface-variant max-w-sm">Curating the ultimate experiences. Your access to the events that define the night.</p>
          <p className="font-Inter text-label-md text-on-surface-variant/50 mt-4 tracking-widest uppercase">© {new Date().getFullYear()} PRIMEPLANNERS. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-8 md:justify-end items-start pt-4">
          <Link to="#" className="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase">Privacy Policy</Link>
          <Link to="#" className="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase">Terms of Service</Link>
          <Link to="#" className="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase">Contact Support</Link>
          <Link to="#" className="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase">API Status</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;