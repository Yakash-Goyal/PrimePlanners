import { useEffect, useRef, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import gsap from 'gsap';
import CheckoutModal from '../components/CheckoutModal';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

const EventDetails = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchEvent = async ()=>{
      try{
        const {data} = await api.get(`/events/${id}`);
        setEvent(data.event);
      }
      catch (err){
        setError('Failed to load event details');
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchEvent();
  },[id]);

  useEffect(() => {
    if (!loading && event) {
      const ctx = gsap.context(() => {
        gsap.from('.glass-panel', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
        
        gsap.from('.hero-content > *', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading, event]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setShowCheckout(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">{error || 'Event not found'}</p>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-end pb-12 mt-[-96px]">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src={event.image || `https://source.unsplash.com/random/2000x800/?${event.category}`} 
            alt={event.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-gutter max-w-container-max flex flex-col gap-4 hero-content">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md uppercase tracking-wider flex items-center gap-1 w-fit border border-secondary/30">
              <span className="material-symbols-outlined text-[16px]">category</span>
              {event.category}
            </span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface max-w-3xl leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop max-w-container-max flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="w-full lg:w-[65%] flex flex-col gap-10">
          <div className="flex items-center justify-between p-6 glass-panel rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center bg-primary/20">
                <span className="text-2xl font-bold text-primary">
                  {event.organizer?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Organized By</p>
                <h3 className="font-title-lg text-title-lg text-on-surface">{event.organizer?.name || 'Unknown Organizer'}</h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-tertiary mb-2">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date & Time</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{formattedDate}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">TBA</p>
            </div>
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-tertiary mb-2">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Location</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{event.venue}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{event.location}</p>
            </div>
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary mb-2 relative z-10">
                <span className="material-symbols-outlined">group</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider relative z-10">Capacity</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold relative z-10">{event.totalSeats} Attendees</p>
              <p className="font-body-md text-body-md text-primary relative z-10">{event.pricing?.fillRate || 0}% Filled</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">About This Event</h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
              <p>{event.description}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] relative">
          <div className="sticky top-32 glass-panel rounded-2xl p-6 flex flex-col gap-8 shadow-2xl shadow-black border-t border-l border-white/20">
            <div className="flex flex-col gap-2 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-4 -translate-y-4"></div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Current Tier Pricing</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display-md text-display-md text-primary font-extrabold">₹{event.pricing?.finalPrice?.toLocaleString() || event.basePrice?.toLocaleString()}</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ ticket</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Select Tickets</label>
              <div className="flex items-center justify-between glass-panel rounded-lg p-2 border border-white/10 focus-within:border-tertiary transition-all">
                <button onClick={() => setTickets(Math.max(1, tickets - 1))} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-md transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-headline-lg text-headline-lg text-on-surface w-16 text-center">{tickets}</span>
                <button onClick={() => setTickets(Math.min(event.pricing?.seatsRemaining || 10, tickets + 1))} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-md transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Total Table */}
            <div className="flex flex-col gap-3 font-body-md text-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>{tickets} x General Admission</span>
                <span>₹{((event.pricing?.finalPrice || event.basePrice) * tickets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-title-lg text-title-lg text-on-surface pt-3 border-t border-white/10 mt-1">
                <span>Total</span>
                <span>₹{((event.pricing?.finalPrice || event.basePrice) * tickets).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleBookNow} 
              disabled={event.pricing?.seatsRemaining <= 0}
              className="w-full py-4 bg-primary text-white font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {event.pricing?.seatsRemaining <= 0 ? 'Sold Out' : 'Book Now'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        tickets={tickets}
        ticketPrice={event.pricing?.finalPrice}
        eventName={event.title}
        eventId={event._id}
      />
    </div>
  );
};

export default EventDetails;