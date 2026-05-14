import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';

const Explore = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.glass-panel', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
      
      gsap.from('h1, p', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const events = [
    {
      id: 1,
      title: "Neon Dreams: Underground Techno Rave",
      tag: "NIGHTLIFE",
      date: "Oct 24 • 11:00 PM",
      location: "The Vault, Downtown",
      price: "₹2,500",
      image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Tech Innovators Annual Charity Gala",
      tag: "GALA",
      date: "Nov 02 • 7:00 PM",
      location: "Grand Horizon Hotel",
      price: "₹15,000",
      warning: "Only 4 tickets left",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Founders Friday: Startup Mixer & Pitch",
      tag: "MIXER",
      date: "Oct 27 • 6:30 PM",
      location: "Skyline Co-work Space",
      price: "Free",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Symphony of Lights Music Festival",
      tag: "CONCERT",
      date: "Dec 15-17 • 4:00 PM",
      location: "Desert Oasis Arena",
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div ref={containerRef} className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row gap-gutter">
      <div className="w-full md:hidden mb-6">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Explore Events</h1>
      </div>

      {/* Left Sidebar: Filter Panel */}
      <aside className="w-full md:w-1/4 flex flex-col gap-6">
        <div className="glass-panel rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-title-lg text-title-lg text-on-surface">Filters</h2>
            <button className="text-tertiary font-label-md text-label-md hover:underline">Reset All</button>
          </div>

          <div className="mb-6">
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all" placeholder="City or venue" type="text" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Date Range</label>
            <select className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 px-4 text-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all appearance-none cursor-pointer">
              <option>This Weekend</option>
              <option>Next 7 Days</option>
              <option>This Month</option>
              <option>Custom Dates</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-label-md text-label-md text-on-surface-variant mb-3">Categories</label>
            <div className="flex flex-col gap-3">
              {['Nightlife & Clubbing', 'Corporate Galas', 'Live Concerts', 'Exclusive Mixers'].map((cat, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-white/20 rounded bg-[#050505] group-hover:border-primary transition-colors">
                    <input defaultChecked={i===0 || i===2} className="opacity-0 absolute w-full h-full cursor-pointer peer" type="checkbox" />
                    <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md py-3 rounded-lg transition-colors border border-white/5">Apply Filters</button>
        </div>
      </aside>

      {/* Right Main: Events Grid */}
      <section className="w-full md:w-3/4 flex flex-col gap-6">
        <div className="hidden md:flex justify-between items-end mb-2">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface leading-tight">Explore Events</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Showing {events.length} upcoming premium experiences.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-label-md text-label-md text-on-surface-variant">Sort by:</span>
            <select className="bg-surface-container-low border border-white/10 rounded-lg py-2 px-4 text-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all appearance-none cursor-pointer pr-8 relative">
              <option>Recommended</option>
              <option>Date: Soonest</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <article key={event.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group relative transition-transform hover:-translate-y-1 duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  <span className={`bg-${event.tag === 'GALA' ? 'tertiary-container' : 'secondary'}/90 backdrop-blur-sm text-white font-label-md text-[10px] uppercase tracking-wider py-1 px-2 rounded`}>{event.tag}</span>
                </div>
                <button className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <img alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={event.image} />
              </div>
              <div className="p-5 flex flex-col flex-grow relative z-20">
                {event.warning && (
                  <div className="mb-3 inline-flex items-center gap-1 bg-error-container/20 border border-error/30 text-error px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider self-start">
                    <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                    {event.warning}
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-title-lg text-title-lg text-on-surface line-clamp-2 leading-tight">{event.title}</h3>
                </div>
                <div className="flex items-center gap-2 mb-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span className="font-body-md text-[13px]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span className="font-body-md text-[13px]">{event.location}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Starting at</span>
                    <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{event.price}</span>
                  </div>
                  <Link to={`/event/${event.id}`} className={`bg-white/10 hover:bg-primary-container text-on-surface hover:text-white font-label-md text-label-md px-4 py-2 rounded-lg transition-all border border-white/10 hover:border-transparent hover:shadow-[0_0_15px_rgba(255,76,131,0.3)]`}>Book Now</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;