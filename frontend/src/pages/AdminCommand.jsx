import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Shield, Users, CalendarCheck, TrendingUp, DollarSign,
  BarChart3, PieChart, Crown, Activity, Zap, MapPin,
  ArrowUpRight, ArrowDownRight, Clock, Eye
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import concertBg from '../assets/concert-bg.png';

const CATEGORY_COLORS = {
  Concert: { bg: 'bg-primary/20', text: 'text-primary', hex: '#FF2A5F' },
  Festival: { bg: 'bg-secondary/20', text: 'text-secondary', hex: '#B388FF' },
  Wedding: { bg: 'bg-tertiary/20', text: 'text-tertiary', hex: '#00FFC8' },
  Corporate: { bg: 'bg-blue-500/20', text: 'text-blue-400', hex: '#60A5FA' },
  'Private Party': { bg: 'bg-amber-500/20', text: 'text-amber-400', hex: '#FBBF24' },
};

const DEMAND_COLORS = {
  Critical: 'bg-red-500/20 text-red-400 border-red-500/40',
  High: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  Medium: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

const AdminCommand = () => {
  const containerRef = useRef(null);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topEvents, setTopEvents] = useState([]);
  const [pricingMonitor, setPricingMonitor] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchAll = async () => {
      try {
        const [overviewRes, regRes, catRes, topRes, priceRes, bookingsRes, usersRes] = await Promise.all([
          api.get('/analytics/overview').catch(err => { console.error('Overview fetch failed:', err); return null; }),
          api.get('/analytics/registrations').catch(err => { console.error('Registrations fetch failed:', err); return null; }),
          api.get('/analytics/categories').catch(err => { console.error('Categories fetch failed:', err); return null; }),
          api.get('/analytics/top-events').catch(err => { console.error('Top Events fetch failed:', err); return null; }),
          api.get('/analytics/pricing-monitor').catch(err => { console.error('Pricing Monitor fetch failed:', err); return null; }),
          api.get('/bookings/all').catch(err => { console.error('Bookings fetch failed:', err); return null; }),
          api.get('/analytics/users').catch(err => { console.error('Users list fetch failed:', err); return null; })
        ]);
        if (!active) return;
        if (overviewRes) setStats(overviewRes.data);
        if (regRes) setRegistrations(regRes.data.data || []);
        if (catRes) setCategories(catRes.data.data || []);
        if (topRes) setTopEvents(topRes.data.data || []);
        if (priceRes) setPricingMonitor(priceRes.data.monitor || []);
        if (usersRes) setUsersList(usersRes.data.users || []);
        if (bookingsRes) {
          const allBookings = bookingsRes.data.bookings || [];
          setRecentBookings(allBookings.slice(0, 10));
        }
      } catch (err) {
        if (!active) return;
        console.error('Admin fetch failed:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.admin-header', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.kpi-card', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.chart-section', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.data-table', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.monitor-card', { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.8 });
      gsap.fromTo('.feed-item', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const platformRevenue = Math.round((stats?.totalRevenue || 0) * 0.02);
  const regMax = Math.max(...registrations.map(d => d.bookings), 1);
  const catTotal = categories.reduce((s, c) => s + c.bookings, 0) || 1;

  // Build donut segments
  let cumulativePercent = 0;
  const donutSegments = categories.map(cat => {
    const pct = (cat.bookings / catTotal) * 100;
    const offset = cumulativePercent;
    cumulativePercent += pct;
    return { ...cat, pct, offset, color: CATEGORY_COLORS[cat._id]?.hex || '#888' };
  });

  return (
    <div ref={containerRef} className="relative z-20 mt-[-96px] overflow-x-hidden min-h-screen bg-background text-on-surface">
      <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
        <img src={concertBg} alt="" className="w-full h-full object-cover opacity-10 grayscale-[60%] scale-110 blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background"></div>
      </div>

      <main className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-32 pb-16 space-y-10">

        {/* Header */}
        <header className="admin-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Super Admin
              </span>
            </div>
            <h1 className="font-display-md text-display-md text-on-surface tracking-tight">
              Command Center
            </h1>
            <p className="text-on-surface-variant font-body-lg mt-1">
              Welcome back, <span className="text-red-400 font-bold">{user?.name || 'Admin'}</span>. Full platform oversight.
            </p>
          </div>
          <div className="text-on-surface-variant text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* KPI Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard icon={DollarSign} label="Platform Revenue" sublabel="2% commission" value={`₹${platformRevenue.toLocaleString()}`} accent="red" extra={`Total Sales: ₹${(stats?.totalRevenue || 0).toLocaleString()}`} />
          <KpiCard icon={Users} label="Active Users" value={stats?.totalUsers || 0} accent="primary" />
          <KpiCard icon={CalendarCheck} label="Total Bookings" value={stats?.totalBookings || 0} accent="tertiary" extra={`Cancel rate: ${stats?.cancellationRate || 0}%`} />
          <KpiCard icon={Activity} label="Active Events" value={stats?.totalEvents || 0} accent="secondary" />
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registration Trend */}
          <div className="chart-section lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-headline-md text-white">30-Day Booking Trend</h3>
              </div>
              <span className="text-xs text-on-surface-variant">{registrations.length} data points</span>
            </div>
            {registrations.length === 0 ? (
              <p className="text-on-surface-variant text-center py-12">No registration data yet.</p>
            ) : (
              <div className="flex items-end gap-[3px] h-[180px]">
                {registrations.map((d, i) => {
                  const h = Math.max((d.bookings / regMax) * 100, 4);
                  return (
                    <div key={i} className="flex-1 group relative flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary to-primary/40 group-hover:from-primary group-hover:to-primary/70 transition-all duration-300 min-h-[4px]"
                        style={{ height: `${h}%` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 z-10">
                        {d._id?.slice(5)}: {d.bookings} bookings<br />₹{d.revenue?.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="chart-section glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5 text-tertiary" />
              <h3 className="font-headline-md text-white">Category Split</h3>
            </div>
            {categories.length === 0 ? (
              <p className="text-on-surface-variant text-center py-12">No category data yet.</p>
            ) : (
              <>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {donutSegments.map((seg, i) => (
                      <circle
                        key={i}
                        cx="18" cy="18" r="15.9"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="3.5"
                        strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                        strokeDashoffset={`${-seg.offset}`}
                        className="transition-all duration-500"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{catTotal}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {categories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat._id]?.hex || '#888' }}></div>
                        <span className="text-on-surface-variant">{cat._id}</span>
                      </div>
                      <span className="text-white font-semibold">{cat.bookings}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Top Events Table */}
        <section className="data-table">
          <div className="flex items-center gap-3 mb-5">
            <Crown className="w-5 h-5 text-amber-400" />
            <h3 className="font-headline-lg text-white">Top Performing Events</h3>
          </div>
          {topEvents.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">No event data yet.</div>
          ) : (
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">#</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Event</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Category</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs text-right">Tickets</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {topEvents.map((ev, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-gray-400/20 text-gray-300' : i === 2 ? 'bg-orange-600/20 text-orange-400' : 'bg-white/5 text-on-surface-variant'}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <Link to={`/event/${ev._id}`} className="text-white font-semibold hover:text-primary transition-colors">{ev.title}</Link>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[ev.category]?.bg || 'bg-white/10'} ${CATEGORY_COLORS[ev.category]?.text || 'text-white'}`}>
                            {ev.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right text-on-surface-variant font-semibold">{ev.totalSeats}</td>
                        <td className="px-5 py-4 text-right text-primary font-bold">₹{ev.totalRevenue?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Pricing Monitor + Recent Bookings */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Pricing Monitor */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="font-headline-lg text-white">Live Pricing Monitor</h3>
            </div>
            {pricingMonitor.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">No active events.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricingMonitor.slice(0, 6).map((ev) => (
                  <div key={ev._id} className="monitor-card glass-card rounded-xl p-5 border border-white/5 hover:border-white/15 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-white font-semibold text-sm line-clamp-1 flex-1 mr-2">{ev.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${DEMAND_COLORS[ev.demandLevel]}`}>
                        {ev.demandLevel}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-primary text-xl font-bold">₹{ev.finalPrice?.toLocaleString()}</span>
                      <span className="text-on-surface-variant text-xs line-through">₹{ev.basePrice?.toLocaleString()}</span>
                      {ev.finalPrice > ev.basePrice && (
                        <span className="text-red-400 text-xs flex items-center"><ArrowUpRight className="w-3 h-3" />{Math.round(((ev.finalPrice - ev.basePrice) / ev.basePrice) * 100)}%</span>
                      )}
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                        <span>{ev.bookedSeats}/{ev.totalSeats} seats</span>
                        <span>{ev.fillRate}% filled</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${ev.fillRate >= 90 ? 'bg-red-500' : ev.fillRate >= 70 ? 'bg-amber-500' : ev.fillRate >= 40 ? 'bg-blue-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(ev.fillRate, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[10px] text-on-surface-variant mt-2">
                      <span>D:{ev.demandMultiplier?.toFixed(1)}x</span>
                      <span>T:{ev.timeMultiplier?.toFixed(1)}x</span>
                      <span>C:{ev.categoryMultiplier?.toFixed(2)}x</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-tertiary" />
              <h3 className="font-headline-lg text-white">Recent Bookings</h3>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/5 space-y-3 max-h-[520px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {recentBookings.length === 0 ? (
                <p className="text-on-surface-variant text-center py-8">No bookings yet.</p>
              ) : (
                recentBookings.map((b, i) => (
                  <div key={b._id || i} className="feed-item flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-colors border border-white/5">
                    <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center shrink-0">
                      <span className="text-tertiary text-xs font-bold">{b.user?.name?.charAt(0)?.toUpperCase() || '?'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{b.user?.name || 'Unknown User'}</p>
                      <p className="text-on-surface-variant text-xs truncate">{b.event?.title || 'Event'} · {b.ticketType || 'General'} × {b.seats}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-primary text-sm font-bold">₹{b.totalPrice?.toLocaleString()}</p>
                      <p className="text-on-surface-variant text-[10px]">{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Platform Users */}
        <section className="data-table">
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-5 h-5 text-tertiary" />
            <h3 className="font-headline-lg text-white">Registered Users</h3>
          </div>
          {usersList.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">No registered users found.</div>
          ) : (
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Name</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Email</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Role</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Bio</th>
                      <th className="px-5 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-xs text-right">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usersList.map((usr) => (
                      <tr key={usr._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-semibold text-white">{usr.name}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{usr.email}</td>
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                            usr.role === 'admin' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                            usr.role === 'creator' ? 'bg-primary/20 text-primary border-primary/30' :
                            'bg-tertiary/20 text-tertiary border-tertiary/30'
                          }`}>
                            {usr.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-on-surface-variant max-w-xs truncate">{usr.bio || <span className="text-white/20 italic">No bio</span>}</td>
                        <td className="px-5 py-4 text-right text-on-surface-variant">
                          {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="data-table">
          <div className="flex items-center gap-3 mb-5">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="font-headline-lg text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'verified_user', label: 'Verify Organizers', color: 'text-primary' },
              { icon: 'campaign', label: 'Global Announcement', color: 'text-tertiary' },
              { icon: 'payments', label: 'Payouts', color: 'text-white' },
              { icon: 'settings', label: 'System Settings', color: 'text-red-400' },
            ].map((action, i) => (
              <button key={i} className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3 group border border-white/5 hover:border-white/15">
                <span className={`material-symbols-outlined text-3xl ${action.color} group-hover:scale-110 transition-transform`}>{action.icon}</span>
                <span className="font-label-md uppercase text-xs tracking-wider text-on-surface-variant group-hover:text-white transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, sublabel, value, accent, extra }) => {
  const accentClasses = {
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'hover:border-red-500/50', glow: 'neon-glow-primary' },
    primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'hover:border-primary/50', glow: 'neon-glow-primary' },
    tertiary: { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'hover:border-tertiary/50', glow: 'neon-glow-cyan' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'hover:border-secondary/50', glow: 'neon-glow-purple' },
  };
  const a = accentClasses[accent] || accentClasses.primary;

  return (
    <div className={`kpi-card glass-card p-6 rounded-xl group ${a.border} transition-all duration-500`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-lg ${a.bg} flex items-center justify-center ${a.text} ${a.glow}`}>
          <Icon className="w-6 h-6" />
        </div>
        {sublabel && <span className={`text-label-md ${a.text} text-xs`}>{sublabel}</span>}
      </div>
      <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">{label}</h3>
      <p className={`font-headline-lg text-headline-lg mt-1 group-hover:${a.text} transition-colors`}>{value}</p>
      {extra && <p className="text-on-surface-variant text-xs mt-1">{extra}</p>}
    </div>
  );
};

export default AdminCommand;