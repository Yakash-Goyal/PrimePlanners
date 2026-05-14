import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-element', {
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
      {/* Header Profile Section */}
      <div className="glass-panel rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden profile-element">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_20px_rgba(255,42,95,0.3)]">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="User Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        
        <div className="flex-grow text-center md:text-left flex flex-col justify-center h-full pt-4">
          <h1 className="font-display-md text-display-md text-white">Alex Vanguard</h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg mb-4">alex.vanguard@example.com • Joined 2024</p>
          <div className="flex items-center justify-center md:justify-start gap-6">
            <div className="text-center md:text-left">
              <p className="text-primary font-display-sm font-bold">12</p>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-wider">Events Attended</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center md:text-left">
              <p className="text-tertiary font-display-sm font-bold">4</p>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-wider">Saved Events</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center md:text-left">
              <p className="text-secondary font-display-sm font-bold">₹2.4k</p>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-wider">Credits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 profile-element">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-6 py-4 rounded-xl font-label-md uppercase tracking-wider transition-all flex items-center gap-3 ${activeTab === 'profile' ? 'bg-primary/20 text-primary border border-primary/50 neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined">person</span> Personal Info
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-6 py-4 rounded-xl font-label-md uppercase tracking-wider transition-all flex items-center gap-3 ${activeTab === 'settings' ? 'bg-primary/20 text-primary border border-primary/50 neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined">settings</span> Settings
          </button>
          <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-6 py-4 rounded-xl font-label-md uppercase tracking-wider transition-all flex items-center gap-3 ${activeTab === 'billing' ? 'bg-primary/20 text-primary border border-primary/50 neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined">credit_card</span> Billing
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow glass-panel rounded-2xl p-8">
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-headline-lg text-white mb-6">Personal Information</h2>
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">First Name</label>
                    <input type="text" defaultValue="Alex" className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Last Name</label>
                    <input type="text" defaultValue="Vanguard" className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Email Address</label>
                  <input type="email" defaultValue="alex.vanguard@example.com" className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Bio</label>
                  <textarea rows="4" defaultValue="Cyberpunk enthusiast. Night owl. Always looking for the next underground techno event." className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all resize-none"></textarea>
                </div>
                <button type="button" className="mt-4 px-8 py-3 bg-primary text-white rounded-xl font-label-md uppercase tracking-widest neon-glow-primary hover:scale-105 transition-transform w-fit">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-headline-lg text-white mb-6">Preferences</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-white font-title-md">Email Notifications</h4>
                    <p className="text-on-surface-variant text-sm mt-1">Receive updates about upcoming saved events.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-white font-title-md">SMS Alerts</h4>
                    <p className="text-on-surface-variant text-sm mt-1">Get text alerts for last-minute ticket availability.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-white font-title-md">Dark Mode</h4>
                    <p className="text-on-surface-variant text-sm mt-1">Toggle the cyber-noir aesthetic across the app.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary opacity-50"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-headline-lg text-white mb-6">Payment Methods</h2>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-tertiary/50 shadow-[0_0_10px_rgba(0,255,204,0.1)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">VISA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-title-md">Visa ending in 4242</h4>
                      <p className="text-on-surface-variant text-sm mt-1">Expires 12/28</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-tertiary/20 text-tertiary text-xs rounded border border-tertiary/30">Default</span>
                  </div>
                </div>
                
                <button className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-white/20 rounded-xl text-on-surface-variant hover:text-white hover:border-white/50 transition-all hover:bg-white/5">
                  <span className="material-symbols-outlined">add_circle</span>
                  Add New Payment Method
                </button>
              </div>

              <h2 className="font-headline-lg text-white mb-4 mt-8">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-on-surface-variant font-label-md uppercase tracking-wider text-xs">
                      <th className="p-3">Date</th>
                      <th className="p-3">Event</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface text-sm">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3 text-on-surface-variant">Oct 12, 2026</td>
                      <td className="p-3 font-medium text-white">Midnight Synthesis</td>
                      <td className="p-3">₹31,000</td>
                      <td className="p-3"><span className="text-tertiary">Completed</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-on-surface-variant">Sep 05, 2026</td>
                      <td className="p-3 font-medium text-white">Neon Drift Showcase</td>
                      <td className="p-3">₹8,500</td>
                      <td className="p-3"><span className="text-tertiary">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;