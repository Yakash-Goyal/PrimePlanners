import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Ticket, CreditCard, Clock, ChevronLeft, ChevronRight,
  MapPin, Plus, ArrowRight,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

import recNeonClub from '../assets/rec-neon-club.png';
import recJazzLounge from '../assets/rec-jazz-lounge.png';
import recTechnoArena from '../assets/rec-techno-arena.png';
import recGalaEvent from '../assets/rec-gala-event.png';
import concertBg from '../assets/concert-bg.png';

gsap.registerPlugin(ScrollTrigger);

const recommendations = [
  { id: 1, title: 'Neon Pulse: Retro Revival', venue: 'Grand Central Loft', date: 'Oct 14', tag: 'Hot Vibe', tagColor: 'primary', image: recNeonClub },
  { id: 2, title: 'Midnight Sax & Synthesizers', venue: 'The Blue Room', date: 'Oct 18', tag: 'Chill Deep', tagColor: 'tertiary', image: recJazzLounge },
  { id: 3, title: 'Industrial Bass Night', venue: 'Warehouse District', date: 'Oct 22', tag: 'Techno Elite', tagColor: 'secondary', image: recTechnoArena },
  { id: 4, title: 'Founders Gala 2024', venue: 'The Glass Pavilion', date: 'Oct 30', tag: 'Elite Social', tagColor: 'primary', image: recGalaEvent },
];

const AttenderHub = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my');
        if (!active) return;
        setBookings(data.bookings);
      } catch (error) {
        if (!active) return;
        console.error('Failed to fetch bookings', error);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchBookings();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hub-header', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

      gsap.fromTo('.stat-card', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)', delay: 0.2 });

      gsap.fromTo('.rec-card', { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.4 });

      gsap.fromTo('.bookings-section', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 });

      gsap.fromTo('.booking-row', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, bookings]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);
    try {
      await api.put(`/bookings/${bookingId}/cancel`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  const totalTickets = bookings.reduce((sum, b) => sum + (b.seats || 1), 0);
  const upcomingCount = bookings.filter((b) => new Date(b.event?.date) > new Date()).length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.event?.price || 0) * (b.seats || 1), 0);
  const StatusBadge = ({ date }) => {
    const isUpcoming = new Date(date) > new Date();
    return isUpcoming ? (
      <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-label-md border border-tertiary/30 neon-glow-cyan uppercase">
        Upcoming
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full bg-white/10 text-on-surface-variant text-label-md border border-white/10 uppercase">
        Completed
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative z-20 mt-[-96px] overflow-x-hidden min-h-screen bg-background text-on-surface">
      <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
        <img src={concertBg} alt="" className="w-full h-full object-cover opacity-20 grayscale-[50%] scale-110 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
      </div>

      <main className="relative z-10 max-w-[1440px] mx-auto px-[16px] md:px-[40px] pt-32 pb-16 space-y-12">

        <header className="hub-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}.
            </h1>
            {upcomingCount > 0 ? (
              <p className="text-on-surface-variant font-body-lg mt-2">
                You have <span className="text-primary font-bold">{upcomingCount} upcoming event{upcomingCount > 1 ? 's' : ''}</span> on your radar.
              </p>
            ) : (
              <p className="text-on-surface-variant font-body-lg mt-2">No upcoming events. Time to explore!</p>
            )}
          </div>
          <Link
            to="/events"
            className="flex items-center gap-2 bg-tertiary text-on-tertiary px-8 py-3 rounded-lg font-bold neon-glow-cyan hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Explore Events
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          <div className="stat-card glass-card p-6 rounded-xl group hover:border-primary/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary neon-glow-primary">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="text-label-md text-primary">+{totalTickets} tickets</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Events Booked</h3>
            <p className="font-headline-lg text-headline-lg mt-1 group-hover:text-primary transition-colors">{bookings.length}</p>
          </div>

          <div className="stat-card glass-card p-6 rounded-xl group hover:border-tertiary/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary neon-glow-cyan">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-label-md text-tertiary">Top Tier</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Total Spent</h3>
            <p className="font-headline-lg text-headline-lg mt-1 group-hover:text-tertiary transition-colors">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="stat-card glass-card p-6 rounded-xl group hover:border-secondary/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary neon-glow-purple">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-label-md text-secondary">{upcomingCount > 0 ? 'Next event soon' : 'None yet'}</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Upcoming</h3>
            <p className="font-headline-lg text-headline-lg mt-1 group-hover:text-secondary transition-colors">
              {upcomingCount} Event{upcomingCount !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        <section className="bookings-section space-y-6">
          <h2 className="font-headline-lg text-headline-lg px-2">My Bookings</h2>

          {bookings.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 text-center">
              <Ticket className="w-16 h-16 text-on-surface-variant/30 mx-auto mb-6" />
              <p className="text-on-surface-variant text-lg mb-4">You haven't booked any events yet.</p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all"
              >
                Explore Events <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden md:block glass-card rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Event</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Tickets</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map((booking) => {
                      const eventDate = new Date(booking.event?.date);
                      const isUpcoming = eventDate > new Date();
                      return (
                        <tr key={booking._id} className="booking-row hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={booking.event?.image || concertBg}
                                alt={booking.event?.title}
                                className="w-12 h-12 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-primary/50 transition-all"
                              />
                              <div>
                                <div className="font-title-lg text-body-lg text-white">{booking.event?.title || 'Untitled Event'}</div>
                                <div className="text-on-surface-variant text-body-md flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {booking.event?.location || 'Unknown'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant">
                            {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <StatusBadge date={booking.event?.date} />
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant">
                            <div className="font-bold">x{booking.seats || 1}</div>
                            <div className="text-xs text-primary font-semibold">{booking.ticketType || 'General Admission'}</div>
                          </td>
                          <td className="px-6 py-4 text-right space-x-4">
                            <Link to={`/event/${booking.event?._id}`} className="text-primary hover:underline font-bold text-body-md transition-colors">
                              Details
                            </Link>
                            {isUpcoming && (
                              <button
                                onClick={() => handleCancel(booking._id)}
                                disabled={cancelling === booking._id}
                                className="text-error hover:text-red-400 font-bold transition-colors active:scale-95 text-body-md disabled:opacity-50"
                              >
                                {cancelling === booking._id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {bookings.map((booking) => {
                  const eventDate = new Date(booking.event?.date);
                  const isUpcoming = eventDate > new Date();
                  return (
                    <div key={booking._id} className="booking-row glass-card rounded-2xl p-4 space-y-4">
                      <div className="flex items-center gap-4">
                        <img
                           src={booking.event?.image || concertBg}
                          alt={booking.event?.title}
                          className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold truncate">{booking.event?.title || 'Untitled Event'}</h4>
                          <p className="text-on-surface-variant text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {booking.event?.location || 'Unknown'}
                          </p>
                        </div>
                        <StatusBadge date={booking.event?.date} />
                      </div>

                      <div className="flex items-center justify-between text-sm text-on-surface-variant">
                        <span>{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <div className="text-right">
                          <div>x{booking.seats || 1} tickets</div>
                          <div className="text-xs text-primary font-semibold">{booking.ticketType || 'General Admission'}</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          to={`/event/${booking.event?._id}`}
                          className="flex-1 py-2 text-center bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm"
                        >
                          Details
                        </Link>
                        {isUpcoming && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelling === booking._id}
                            className="flex-1 py-2 text-center bg-error/10 text-error border border-error/30 rounded-lg hover:bg-error hover:text-white transition-colors font-label-md uppercase text-sm disabled:opacity-50"
                          >
                            {cancelling === booking._id ? 'Cancelling...' : 'Cancel'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-headline-lg text-headline-lg">
              Recommended for You{' '}
              <span className="text-tertiary text-body-lg ml-2 font-normal opacity-70">Based on 'Vibe Check'</span>
            </h2>
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll(1)} className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-[24px] overflow-x-auto pb-6 px-2 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {recommendations.map((rec) => (
              <div key={rec.id} className="rec-card min-w-[240px] group cursor-pointer flex-shrink-0" onClick={() => navigate('/events')}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card mb-4">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`bg-${rec.tagColor}/20 backdrop-blur-md border border-${rec.tagColor}/50 text-${rec.tagColor} text-label-md px-3 py-1 rounded-full uppercase`}>
                      {rec.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-on-surface font-title-lg mb-1">{rec.title}</p>
                    <p className="text-on-surface-variant text-body-md">{rec.venue} • {rec.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AttenderHub;