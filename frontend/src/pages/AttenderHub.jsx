import {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const AttenderHub = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="font-display-md text-white">Attender Hub</h1>
          <p className="text-on-surface-variant mt-1">Your upcoming experiences and tickets.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <Link to="/profile" className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(255,42,95,0.3)]">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger-item">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Upcoming Events</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">3</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Tickets Purchased</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">12</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">stars</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Loyalty Points</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">2,450</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 stagger-item">
        <h2 className="font-headline-lg text-white">My Tickets</h2>
        <button className="text-primary hover:text-white transition-colors font-label-md uppercase tracking-wider flex items-center gap-1">
          View Past <span className="material-symbols-outlined text-[18px]">history</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item">
        {/* Ticket Card 1 */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group">
          <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
            <img src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">Oct 24</div>
          </div>
          <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
            <div>
              <span className="text-tertiary text-xs uppercase tracking-wider font-bold mb-1 block">General Admission (x2)</span>
              <h4 className="text-white font-title-lg line-clamp-1">Midnight Synthesis: Global DJ Showcase</h4>
              <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                The Obsidian Vault, Downtown
              </p>
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm">View Ticket</button>
              <button className="w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
            </div>
          </div>
        </div>

        {/* Ticket Card 2 */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group">
          <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">Nov 12</div>
          </div>
          <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
            <div>
              <span className="text-primary text-xs uppercase tracking-wider font-bold mb-1 block">VIP Access (x1)</span>
              <h4 className="text-white font-title-lg line-clamp-1">Neon Drift Auto Show</h4>
              <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Cybercity Expo Center
              </p>
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm">View Ticket</button>
              <button className="w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AttenderHub;