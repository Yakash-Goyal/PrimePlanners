import {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';

const CreatorHub = () => {
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
      <div className="flex justify-between items-center mb-8 stagger-item flex-wrap gap-4">
        <div>
          <h1 className="font-display-md text-white">Creator Hub</h1>
          <p className="text-on-surface-variant mt-1">Manage your events and track performance.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/create-event" className="px-6 py-3 bg-primary text-white rounded-xl neon-glow-primary hover:scale-105 transition-transform flex items-center gap-2 font-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Event
          </Link>
          <Link to="/profile" className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/50 hover:border-secondary transition-colors hover:shadow-[0_0_15px_rgba(0,183,255,0.3)] shrink-0">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-item">
        <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-primary relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
          <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">payments</span> Total Revenue
          </h3>
          <p className="text-3xl text-white font-display-sm font-bold mt-3">₹12.4L</p>
          <p className="text-primary text-xs mt-2 flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-[14px]">trending_up</span> +14% this month</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-tertiary relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl group-hover:bg-tertiary/20 transition-colors"></div>
          <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">event_available</span> Active Events
          </h3>
          <p className="text-3xl text-white font-display-sm font-bold mt-3">2</p>
          <p className="text-on-surface-variant text-xs mt-2">1 event ending soon</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-secondary relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors"></div>
          <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">confirmation_number</span> Tickets Sold
          </h3>
          <p className="text-3xl text-white font-display-sm font-bold mt-3">845</p>
          <p className="text-secondary text-xs mt-2 flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-[14px]">trending_up</span> +8% this week</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-white relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-[18px]">visibility</span> Page Views
          </h3>
          <p className="text-3xl text-white font-display-sm font-bold mt-3">15.2k</p>
          <p className="text-on-surface-variant text-xs mt-2">Across all events</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 stagger-item">
        <h2 className="font-headline-lg text-white">Manage Events</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg bg-surface/50 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-surface/50 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="glass-panel rounded-2xl overflow-hidden stagger-item">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-on-surface-variant font-label-md uppercase tracking-wider text-xs">
                <th className="p-5 font-medium">Event Name</th>
                <th className="p-5 font-medium">Date</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium">Tickets Sold</th>
                <th className="p-5 font-medium">Revenue</th>
                <th className="p-5 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-surface-variant overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=100&q=80" alt="Event" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-white group-hover:text-primary transition-colors">Midnight Synthesis</span>
                  </div>
                </td>
                <td className="p-5 text-on-surface-variant">Oct 24, 2026</td>
                <td className="p-5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs uppercase tracking-wider border border-green-500/20 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Published
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex flex-col gap-1">
                    <span>2,125 / 2,500</span>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%] rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-mono text-secondary">₹53.1L</td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="Edit">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="Analytics">
                      <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="More">
                      <span className="material-symbols-outlined text-[16px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-surface-variant flex items-center justify-center shrink-0 border border-dashed border-white/20">
                      <span className="material-symbols-outlined text-on-surface-variant">image</span>
                    </div>
                    <span className="font-bold text-white group-hover:text-primary transition-colors">New Year Eve Bash</span>
                  </div>
                </td>
                <td className="p-5 text-on-surface-variant">Dec 31, 2026</td>
                <td className="p-5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs uppercase tracking-wider border border-yellow-500/20 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Draft
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex flex-col gap-1 text-on-surface-variant">
                    <span>0 / 500</span>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-surface-variant w-[0%] rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-mono text-on-surface-variant">₹0</td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="Edit">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="Publish">
                      <span className="material-symbols-outlined text-[16px]">publish</span>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors" title="Delete">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatorHub;