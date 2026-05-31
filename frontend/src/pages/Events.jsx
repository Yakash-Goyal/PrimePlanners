import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventCard from '../components/EventCard';
import { Search, Filter } from 'lucide-react';
import api from '../api/axios';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const categories = ['All', 'Concert', 'Wedding', 'Corporate', 'Private Party', 'Festival'];

  useEffect(() => {
    let active = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/events?search=${search}&category=${filter === 'All' ? '' : filter}`);
        if (!active) return;
        const formattedEvents = data.events.map(e => ({
          ...e,
          id: e._id,
          rawDate: e.date,
          date: new Date(e.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          time: 'TBA'
        }));
        setEvents(formattedEvents);
      } catch (err) {
        if (!active) return;
        setError('Failed to load events');
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchEvents();
    return () => {
      active = false;
    };
  }, [search, filter]);

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter);

  useEffect(() => {
    gsap.fromTo(headerRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (gridRef.current && filteredEvents.length > 0) {
      const cards = gridRef.current.querySelectorAll('.event-item');
      
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && gridRef.current.contains(t.trigger)) {
          t.kill();
        }
      });

      cards.forEach((card) => {
        gsap.fromTo(card,
          { scale: 0.95, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, [filter, events]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Discover <span className="text-gradient">Experiences</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg mb-10">
            Browse our upcoming events. From underground raves to high-end corporate galas, find your next unforgettable night.
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full max-w-2xl mx-auto px-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events by title, venue, or location..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-sm shadow-inner"
              />
            </div>
            
            <div className="flex overflow-x-auto gap-2 w-full pb-3 justify-start md:justify-center scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-2 mx-auto px-4 md:px-0 shrink-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border whitespace-nowrap cursor-pointer shrink-0 ${
                      filter === cat 
                        ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(255,45,120,0.4)]' 
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-error">
            <p>{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-item">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-xl">No events found for this category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;