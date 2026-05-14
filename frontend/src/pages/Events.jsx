import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import EventCard from '../components/EventCard';
import {Search, Filter} from 'lucide-react';

const Events = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('All');

  const allEvents = [
    {
      id: 1,
      title: "Neon Nights Festival",
      category: "Music Festival",
      date: "Aug 15, 2026",
      time: "8:00 PM - 4:00 AM",
      location: "Cyber Arena, Neon District",
      description: "Experience the ultimate electronic dance music festival with top DJs and mind-blowing visual effects.",
      image: "https://images.unsplash.com/photo-1540039155732-68ee14318c08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Midnight Masquerade",
      category: "Private Party",
      date: "Oct 31, 2026",
      time: "9:00 PM - 2:00 AM",
      location: "The Grand Chateau",
      description: "An exclusive, high-energy masquerade ball featuring premium cocktails, live bands, and mysterious encounters.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Tech Innovators Gala",
      category: "Corporate",
      date: "Nov 12, 2026",
      time: "7:00 PM - 11:00 PM",
      location: "Silicon Convention Center",
      description: "Celebrate the future with industry leaders in an immersive, futuristic gala setting with neon aesthetics.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Rooftop Sunset Session",
      category: "Private Party",
      date: "Sep 05, 2026",
      time: "5:00 PM - 10:00 PM",
      location: "Skyline Terrace",
      description: "Chill vibes, sunset views, and deep house beats high above the city streets.",
      image: "https://images.unsplash.com/photo-1533174000220-db92813df184?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Electric Wedding Reception",
      category: "Wedding",
      date: "Jul 20, 2026",
      time: "6:00 PM - 1:00 AM",
      location: "The Glass House",
      description: "A non-traditional, ultra-modern wedding reception that feels more like a VIP club experience.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Indie Rock Showcase",
      category: "Music Festival",
      date: "Oct 10, 2026",
      time: "4:00 PM - 11:00 PM",
      location: "Underground Vault",
      description: "Discover the next big thing in indie rock in an intimate, gritty, high-energy venue.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = ['All', 'Music Festival', 'Private Party', 'Corporate', 'Wedding'];

  const filteredEvents = filter === 'All' ? allEvents : allEvents.filter(e => e.category === filter);

  useEffect(() => {
    gsap.fromTo(headerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.event-item');
      gsap.fromTo(cards,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", clearProps: "all" }
      );
    }
  }, [filter]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
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

        {/* Events Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-item">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No events found for this category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;