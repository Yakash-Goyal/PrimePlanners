import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import CheckoutModal from '../components/CheckoutModal';

const EventDetails = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [tickets, setTickets] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-end pb-12 mt-[-96px]">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Event" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-gutter max-w-container-max flex flex-col gap-4 hero-content">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md uppercase tracking-wider flex items-center gap-1 w-fit border border-secondary/30">
              <span className="material-symbols-outlined text-[16px]">headphones</span>
              Nightlife
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-on-surface font-label-md text-label-md flex items-center gap-1 w-fit border border-white/10">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Verified Event
            </span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface max-w-3xl leading-tight">
            Midnight Synthesis: Global DJ Showcase
          </h1>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="container mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop max-w-container-max flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Left Column */}
        <div className="w-full lg:w-[65%] flex flex-col gap-10">
          {/* Organizer Info */}
          <div className="flex items-center justify-between p-6 glass-panel rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 relative">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Organizer" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Organized By</p>
                <h3 className="font-title-lg text-title-lg text-on-surface">Apex Entertainment Group</h3>
              </div>
            </div>
            <button className="px-5 py-2 rounded-lg border border-white/20 text-on-surface hover:bg-white/5 transition-colors font-label-md text-label-md uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_add</span> Follow
            </button>
          </div>

          {/* Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-tertiary mb-2">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date & Time</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">Oct 24, 2026</p>
              <p className="font-body-md text-body-md text-on-surface-variant">10:00 PM - 4:00 AM</p>
            </div>
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-tertiary mb-2">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Location</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">The Obsidian Vault</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Downtown Metropolis</p>
            </div>
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary mb-2 relative z-10">
                <span className="material-symbols-outlined">group</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider relative z-10">Capacity</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold relative z-10">2,500 Attendees</p>
              <p className="font-body-md text-body-md text-primary relative z-10">85% Filled</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">About This Event</h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
              <p>Experience the ultimate fusion of cutting-edge sound design and architectural lighting at Midnight Synthesis. This is not just a concert; it is a meticulously engineered sensory environment designed for the modern audiophile.</p>
              <p>Featuring a state-of-the-art spatial audio system and a bespoke generative visual installation, the venue will be transformed into an immersive cyber-landscape. Expect deep basslines, crystalline synths, and an atmosphere that defines the future of nightlife.</p>
            </div>
          </div>
        </div>

        {/* Right Column (Sticky) */}
        <div className="w-full lg:w-[35%] relative">
          <div className="sticky top-32 glass-panel rounded-2xl p-6 flex flex-col gap-8 shadow-2xl shadow-black border-t border-l border-white/20">
            {/* Header / Price */}
            <div className="flex flex-col gap-2 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-4 -translate-y-4"></div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Current Tier Pricing</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display-md text-display-md text-primary font-extrabold">₹15,000</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ ticket</span>
              </div>
            </div>

            {/* Dynamic Pricing Indicator */}
            <div className="flex flex-col gap-2 bg-surface/50 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-end mb-1">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">trending_up</span> Demand Status
                </span>
                <span className="font-label-md text-label-md text-error font-bold">Critical</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                <div className="h-full w-[85%] bg-gradient-to-r from-tertiary via-secondary to-primary rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#ffb1c0] animate-pulse"></div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-2">Price increases as seats fill up. Next tier at 90% capacity.</p>
            </div>

            {/* Input / Selector */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Select Tickets</label>
              <div className="flex items-center justify-between glass-panel rounded-lg p-2 border border-white/10 focus-within:border-tertiary transition-all">
                <button onClick={() => setTickets(Math.max(1, tickets - 1))} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-md transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-headline-lg text-headline-lg text-on-surface w-16 text-center">{tickets}</span>
                <button onClick={() => setTickets(tickets + 1)} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-md transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Total Table */}
            <div className="flex flex-col gap-3 font-body-md text-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>{tickets} x General Admission</span>
                <span>₹{(15000 * tickets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Service Fee</span>
                <span>₹{(500 * tickets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-title-lg text-title-lg text-on-surface pt-3 border-t border-white/10 mt-1">
                <span>Total</span>
                <span>₹{((15000 * tickets) + (500 * tickets)).toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <button onClick={() => setShowCheckout(true)} className="w-full py-4 bg-primary text-white font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 flex justify-center items-center gap-2">
              Book Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

      </section>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        tickets={tickets} 
        ticketPrice={15000} 
        eventName="Midnight Synthesis: Global DJ Showcase" 
      />
    </div>
  );
};

export default EventDetails;