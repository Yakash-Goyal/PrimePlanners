import {Calendar, MapPin, Clock} from 'lucide-react';
import {Link} from 'react-router-dom';

const EventCard = ({ event, className = '' }) => {
  const isClosed = event.rawDate && new Date(event.rawDate) < new Date();

  return (
    <div className={`group relative bg-dark-card rounded-2xl overflow-hidden border transition-all duration-500 ${isClosed ? 'border-white/5 opacity-70' : 'border-white/5 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,0,127,0.15)]'} ${className}`}>
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent z-10" />
        {isClosed && (
          <div className="absolute inset-0 bg-black/50 z-10" />
        )}
        <img 
          src={event.image || `https://source.unsplash.com/random/800x600/?${event.category || 'party'}`} 
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isClosed ? 'grayscale' : 'group-hover:scale-110'}`}
        />
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {isClosed && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-500/80 backdrop-blur-md border border-red-400/30 rounded-full text-white">
              Closed
            </span>
          )}
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20">
        <h3 className={`text-2xl font-display font-bold mb-2 transition-colors ${isClosed ? 'text-gray-400' : 'text-white group-hover:text-neon-pink'}`}>
          {event.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-300 text-sm gap-2">
            <Calendar className="w-4 h-4 text-neon-blue" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm gap-2">
            <Clock className="w-4 h-4 text-neon-purple" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm gap-2">
            <MapPin className="w-4 h-4 text-neon-gold" />
            <span>{event.location}</span>
          </div>
        </div>

        <Link 
          to={`/event/${event.id}`}
          className={`block w-full text-center py-3 rounded-xl border font-medium transition-colors ${isClosed ? 'bg-white/5 border-white/5 text-gray-500 cursor-default' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'}`}
        >
          {isClosed ? 'Event Closed' : 'View Details'}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;