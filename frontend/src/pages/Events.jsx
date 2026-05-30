import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import EventCard from '../components/EventCard';
import { Search, Filter } from 'lucide-react';
import api from '../api/axios';

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
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/events?search=${search}&category=${filter === 'All' ? '' : filter}`);
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
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
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
      gsap.fromTo(cards,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", clearProps: "all" }
      );
    }
  }, [filter, events]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Discover <span className="text-gradient">Experiences</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
            Browse our upcoming events. From underground raves to high-end corporate galas, find your next unforgettable night.
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
            <div className="relative w-full md:w-auto flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark-card border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filter === cat 
                      ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.4)]' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400">
            <p>{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-item">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No events found for this category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;