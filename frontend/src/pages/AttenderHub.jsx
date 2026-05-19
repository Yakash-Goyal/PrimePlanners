import {useRef,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

const AttenderHub = () => {
  const containerRef = useRef(null);
  const {user} = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try{
        const {data} = await api.get('/bookings/my');
        setBookings(data.bookings);
      } catch(error){
        console.error('Failed to fetch bookings', error);
      } finally{
        setLoading(false);
      }
    };
    fetchBookings();
  },[]);

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
  },[loading,bookings]);

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="font-display-md text-white">Attender Hub</h1>
          <p className="text-on-surface-variant mt-1">Your upcoming experiences and tickets.</p>
        </div>
        <div className="flex items-center gap-4">
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
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Tickets Purchased</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">{bookings.reduce((sum, b) => sum + b.seats, 0)}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <h3 className="text-on-surface-variant font-label-md uppercase tracking-wider">Events Attending</h3>
          </div>
          <p className="text-4xl text-white font-display-sm font-bold relative z-10">{bookings.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 stagger-item">
        <h2 className="font-headline-lg text-white">My Tickets</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 stagger-item">
          <p className="text-on-surface-variant text-lg">You have no upcoming events.</p>
          <Link to="/events" className="inline-block mt-4 text-primary hover:text-white transition-colors">Explore Events</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item">
          {bookings.map(booking => {
            const eventDate = new Date(booking.event.date);
            return (
              <div key={booking._id} className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative overflow-hidden group">
                <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
                  <img src={booking.event.image || `https://source.unsplash.com/random/400x400/?${booking.event.category}`} alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold border border-white/10 uppercase">
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="flex flex-col flex-grow justify-center py-2 gap-3 w-full">
                  <div>
                    <span className="text-tertiary text-xs uppercase tracking-wider font-bold mb-1 block">
                      General Admission (x{booking.seats})
                    </span>
                    <h4 className="text-white font-title-lg line-clamp-1">{booking.event.title}</h4>
                    <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {booking.event.location}
                    </p>
                  </div>
                  <div className="mt-auto flex gap-3">
                    <Link to={`/event/${booking.event._id}`} className="flex-1 py-2 text-center bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary hover:text-white transition-colors font-label-md uppercase text-sm">
                      Event Details
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

export default AttenderHub;