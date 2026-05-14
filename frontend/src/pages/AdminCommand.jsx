const AdminCommand = () => {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display-md text-white text-error">Command Center</h1>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-error/20 text-error rounded border border-error/30 font-label-md uppercase">Super Admin</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-error">
          <h3 className="text-on-surface-variant font-label-md uppercase">Platform Revenue</h3>
          <p className="text-4xl text-white font-bold mt-2">₹1.5Cr</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-white">
          <h3 className="text-on-surface-variant font-label-md uppercase">Active Users</h3>
          <p className="text-4xl text-white font-bold mt-2">45.2k</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-white">
          <h3 className="text-on-surface-variant font-label-md uppercase">Pending Approvals</h3>
          <p className="text-4xl text-white font-bold mt-2">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-headline-lg text-white mb-6">Recent Activity</h2>
          <div className="glass-panel rounded-xl p-6 flex flex-col gap-4">
            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <div className="w-2 h-2 rounded-full bg-tertiary mt-2"></div>
              <div>
                <p className="text-white"><span className="font-bold">New Organizer:</span> Apex Entertainment Group registered.</p>
                <p className="text-on-surface-variant text-sm mt-1">2 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div>
                <p className="text-white"><span className="font-bold">Event Published:</span> Neon Dreams Techno Rave.</p>
                <p className="text-on-surface-variant text-sm mt-1">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-error mt-2"></div>
              <div>
                <p className="text-white"><span className="font-bold">System Alert:</span> High traffic detected on payment gateway.</p>
                <p className="text-on-surface-variant text-sm mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-headline-lg text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
              <span className="font-label-md uppercase">Verify Organizers</span>
            </button>
            <button className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-3xl text-tertiary">campaign</span>
              <span className="font-label-md uppercase">Global Announcement</span>
            </button>
            <button className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-3xl text-white">payments</span>
              <span className="font-label-md uppercase">Payouts</span>
            </button>
            <button className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-3xl text-error">settings</span>
              <span className="font-label-md uppercase">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommand;