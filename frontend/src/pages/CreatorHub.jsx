import {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

const CreatorHub = () => {
  const containerRef = useRef(null);
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchMyEvents = async () => {
      try{
        const {data} = await api.get('/events');
        if (!active) return;
        const myEvents = data.events.filter(e => e.organizer?._id === user?._id);
        setEvents(myEvents);
      } catch(error){
        if (!active) return;
        console.error('Failed to fetch creator events', error);
      } finally {
        if (active) setLoading(false);
      }
    };
    if (user?._id) {
      fetchMyEvents();
    }
    return () => {
      active = false;
    };
  },[user]);

  useEffect(() => {
    if(!loading){
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
    }
  },[loading, events]);

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalRevenue = events.reduce((sum, e) => sum + (e.bookedSeats * (e.pricing?.finalPrice || e.basePrice)), 0);
  const totalTicketsSold = events.reduce((sum, e) => sum + e.bookedSeats, 0);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="font-display-md text-white">Creator Hub</h1>
          <p className="text-on-surface-variant mt-1">Manage your events and track performance.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/create-event" className="bg-primary hover:bg-primary-fixed text-white px-6 py-2 rounded-full font-label-md uppercase tracking-wider transition-colors neon-glow-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Event
          </Link>
          <Link to="/profile" className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-colors flex items-center justify-center bg-primary/20 hover:shadow-[0_0_15px_rgba(255,42,95,0.3)]">
            <span className="text-xl font-bold text-primary">{user?.name?.charAt(0).toUpperCase()}</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger-item">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Total Revenue</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">₹{totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Tickets Sold</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">{totalTicketsSold}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Active Events</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">{events.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 stagger-item">
        <h2 className="font-headline-lg text-white">My Events</h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 stagger-item">
          <p className="text-on-surface-variant text-lg">You have not created any events yet.</p>
          <Link to="/create-event" className="inline-block mt-4 text-primary hover:text-white transition-colors">Create Your First Event</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item">
          {events.map(event => {
            const eventDate = new Date(event.date);
            return (
              <div key={event._id} className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group">
                <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
                  <img src={event.image || `https://source.unsplash.com/random/400x400/?${event.category}`} alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
                  <div>
                    <h4 className="text-white font-title-lg line-clamp-1">{event.title}</h4>
                    <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">group</span>
                      {event.bookedSeats} / {event.totalSeats} Sold
                    </p>
                  </div>
                  <div className="mt-auto flex gap-3">
                    <Link to={`/event/${event._id}`} className="flex-1 py-2 text-center bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm">
                      Manage Event
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CreatorHub;