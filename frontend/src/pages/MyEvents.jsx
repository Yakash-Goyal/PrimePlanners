import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const MyEvents = () => {
  const containerRef = useRef(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('joined');
  const [bookings, setBookings] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, eventsRes] = await Promise.all([
          api.get('/bookings/my'),
          api.get('/events')
        ]);
        setBookings(bookingsRes.data.bookings || []);
        const myCreated = (eventsRes.data.events || []).filter(
          e => e.organizer?._id === user?._id
        );
        setCreatedEvents(myCreated);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
    else setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from('.stagger-item', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, activeTab]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant">lock</span>
        <h2 className="font-headline-lg text-white text-center">Sign in to see your events</h2>
        <Link to="/auth" className="bg-primary text-white px-8 py-3 rounded-full font-label-md uppercase tracking-widest neon-glow-primary hover:scale-105 transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const isCreatorOrAdmin = user?.role === 'creator' || user?.role === 'admin';

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 stagger-item">
        <div>
          <h1 className="font-display-md text-display-md text-white">My Events</h1>
          <p className="text-on-surface-variant font-body-lg mt-1">Your tickets and events in one place.</p>
        </div>
        <Link to="/events" className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full font-label-md uppercase tracking-wider transition-colors border border-white/10 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">explore</span>
          Browse Events
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 stagger-item">
        <button
          onClick={() => setActiveTab('joined')}
          className={`px-6 py-3 rounded-xl font-label-md uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'joined'
              ? 'bg-primary/20 text-primary border border-primary/50 neon-glow-primary'
              : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
          Tickets ({confirmedBookings.length})
        </button>
        {isCreatorOrAdmin && (
          <button
            onClick={() => setActiveTab('created')}
            className={`px-6 py-3 rounded-xl font-label-md uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'created'
                ? 'bg-primary/20 text-primary border border-primary/50 neon-glow-primary'
                : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">event</span>
            Created ({createdEvents.length})
          </button>
        )}
      </div>

      {/* Joined / Tickets Tab */}
      {activeTab === 'joined' && (
        <>
          {confirmedBookings.length === 0 ? (
            <div className="text-center py-20 stagger-item glass-panel rounded-2xl">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">event_busy</span>
              <p className="text-on-surface-variant text-lg mb-4">You haven't joined any events yet.</p>
              <Link to="/events" className="inline-block text-primary hover:text-white transition-colors font-label-md uppercase tracking-wider">
                Explore Events →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {confirmedBookings.map(booking => {
                const eventDate = new Date(booking.event?.date);
                return (
                  <div key={booking._id} className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group stagger-item">
                    <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
                      <img
                        src={booking.event?.image || `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80`}
                        alt={booking.event?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">
                        {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
                      <div>
                        <span className="text-tertiary text-xs uppercase tracking-wider font-bold mb-1 block">
                          {booking.ticketType || 'General Admission'} × {booking.seats}
                        </span>
                        <h4 className="text-white font-title-lg line-clamp-1">{booking.event?.title}</h4>
                        <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          {booking.event?.location}
                        </p>
                        <p className="text-primary text-sm mt-1 font-semibold">₹{booking.totalPrice?.toLocaleString()}</p>
                      </div>
                      <div className="mt-auto flex gap-3">
                        <Link
                          to={`/event/${booking.event?._id}`}
                          className="flex-1 py-2 text-center bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm"
                        >
                          Event Details
                        </Link>
                        <button
                          onClick={async () => {
                            if (!window.confirm('Are you sure you want to cancel this booking? This cannot be undone.')) return;
                            try {
                              await api.delete(`/bookings/${booking._id}`);
                              setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b));
                            } catch (err) {
                              alert(err.response?.data?.message || 'Failed to cancel booking');
                            }
                          }}
                          className="flex-1 py-2 text-center bg-white/5 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 hover:border-red-500/60 transition-colors font-label-md uppercase text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Created Tab */}
      {activeTab === 'created' && isCreatorOrAdmin && (
        <>
          {createdEvents.length === 0 ? (
            <div className="text-center py-20 stagger-item glass-panel rounded-2xl">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">add_circle</span>
              <p className="text-on-surface-variant text-lg mb-4">You haven't created any events yet.</p>
              <Link to="/create-event" className="inline-block text-primary hover:text-white transition-colors font-label-md uppercase tracking-wider">
                Create Your First Event →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {createdEvents.map(event => {
                const eventDate = new Date(event.date);
                return (
                  <div key={event._id} className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group stagger-item">
                    <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
                      <img
                        src={event.image || `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80`}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">
                        {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
                      <div>
                        <span className="text-secondary text-xs uppercase tracking-wider font-bold mb-1 block">
                          {event.category}
                        </span>
                        <h4 className="text-white font-title-lg line-clamp-1">{event.title}</h4>
                        <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          {event.bookedSeats} / {event.totalSeats} Sold
                        </p>
                      </div>
                      <div className="mt-auto flex gap-3">
                        <Link
                          to={`/edit-event/${event._id}`}
                          className="flex-1 py-2 text-center bg-secondary/20 text-secondary border border-secondary/50 rounded-lg hover:bg-secondary hover:text-white transition-colors font-label-md uppercase text-sm"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/event/${event._id}`}
                          className="flex-1 py-2 text-center bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={async () => {
                            if (!window.confirm(`Delete "${event.title}"? This action cannot be undone.`)) return;
                            try {
                              await api.delete(`/events/${event._id}`);
                              setCreatedEvents(prev => prev.filter(e => e._id !== event._id));
                            } catch (err) {
                              alert(err.response?.data?.message || 'Failed to delete event');
                            }
                          }}
                          className="py-2 px-3 bg-white/5 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 hover:border-red-500/60 transition-colors font-label-md uppercase text-sm flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyEvents;
