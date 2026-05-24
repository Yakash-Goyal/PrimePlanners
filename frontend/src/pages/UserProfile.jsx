import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileBio, setProfileBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my');
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, []);

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

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalSpent = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const joinedYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear();

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      await updateUser({ name: profileName, bio: profileBio });
      setSaveMsg('Profile updated successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveMsg(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      {/* Header Profile Section */}
      <div className="glass-panel rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden profile-element">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_20px_rgba(255,42,95,0.3)] flex items-center justify-center bg-primary/20">
            <span className="text-5xl font-bold text-primary">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="flex-grow text-center md:text-left flex flex-col justify-center h-full pt-4">
          <h1 className="font-display-md text-display-md text-white">{user?.name || 'User'}</h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg mb-1">{user?.email}</p>
          <p className="text-on-surface-variant font-body-md text-body-md mb-4 flex items-center justify-center md:justify-start gap-2">
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded border border-primary/30 uppercase tracking-wider font-bold">{user?.role}</span>
            <span>• Joined {joinedYear}</span>
          </p>
          <div className="flex items-center justify-center md:justify-start gap-6">
            <div className="text-center md:text-left">
              <p className="text-primary font-display-sm font-bold">{confirmedBookings.length}</p>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-wider">Events Attended</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center md:text-left">
              <p className="text-secondary font-display-sm font-bold">₹{totalSpent.toLocaleString()}</p>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-wider">Total Spent</p>
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
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Full Name</label>
                  <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} readOnly className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed focus:outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Role</label>
                  <input type="text" defaultValue={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || ''} readOnly className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed focus:outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Bio</label>
                  <textarea rows="4" value={profileBio} onChange={(e) => setProfileBio(e.target.value)} placeholder="Tell us about yourself..." className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all resize-none"></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" disabled={saving} className="px-8 py-3 bg-primary text-white rounded-xl font-label-md uppercase tracking-widest neon-glow-primary hover:scale-105 transition-transform w-fit disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  {saveMsg && (
                    <span className={`text-sm font-medium ${saveMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                      {saveMsg}
                    </span>
                  )}
                </div>
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
              <h2 className="font-headline-lg text-white mb-6">Recent Transactions</h2>
              {loadingBookings ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : confirmedBookings.length === 0 ? (
                <p className="text-on-surface-variant text-center py-12">No transactions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-on-surface-variant font-label-md uppercase tracking-wider text-xs">
                        <th className="p-3">Date</th>
                        <th className="p-3">Event</th>
                        <th className="p-3">Tickets</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface text-sm">
                      {confirmedBookings.map(booking => (
                        <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-3 text-on-surface-variant">
                            {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="p-3 font-medium text-white">{booking.event?.title || 'Event'}</td>
                          <td className="p-3 text-on-surface-variant">{booking.seats}</td>
                          <td className="p-3">₹{booking.totalPrice?.toLocaleString()}</td>
                          <td className="p-3"><span className="text-tertiary capitalize">{booking.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;