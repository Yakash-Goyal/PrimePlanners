import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Ticket, Calendar, Clock, MapPin, Sparkles, Volume2, Cpu,
  ArrowLeft, Plus, Minus, CreditCard, ShieldCheck, Activity, Users, Zap
} from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Artist assets for headliners section
import artist1 from '../assets/artist-1.png';
import artist2 from '../assets/artist-2.png';
import artist3 from '../assets/artist-3.png';
import artist4 from '../assets/artist-4.png';
import artist5 from '../assets/artist-5.png';
import artist6 from '../assets/artist-6.png';
import concertBg from '../assets/concert-bg.png';

const headlinersPool = [
  { name: 'NULL VECTOR', genre: 'Industrial Bass & Electro', image: artist1 },
  { name: 'CYBER_DYNE', genre: 'Live Volumetric AV Set', image: artist2 },
  { name: 'HYPER SONIC', genre: 'Acid Techno / Dark synth', image: artist3 },
  { name: 'NEON WAVE', genre: 'Glitch Hop & Synthwave', image: artist4 },
  { name: 'VIBE SHIFT', genre: 'Deep Tech & Progressive', image: artist5 },
  { name: 'SONIC PULSE', genre: 'Garage / Future Bass', image: artist6 },
];

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [tickets, setTickets] = useState(1);
  const [selectedTier, setSelectedTier] = useState('General Admission');
  const [showCheckout, setShowCheckout] = useState(false);
  
  const [pulseHeights, setPulseHeights] = useState([40, 65, 50, 85, 70, 95, 80, 45, 60, 75]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data.event);
      } catch (err) {
        setError('Failed to load event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event && event.ticketTiers && event.ticketTiers.length > 0) {
      setSelectedTier(event.ticketTiers[0].name);
    }
  }, [event]);

  useEffect(() => {
    if (loading || !event) return;
    const interval = setInterval(() => {
      setPulseHeights(prev =>
        prev.map(h => {
          const delta = (Math.random() - 0.5) * 12;
          return Math.min(Math.max(h + delta, 25), 100);
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, [loading, event]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!loading && event) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-title-box', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        gsap.fromTo('.hero-stat-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 });
        gsap.fromTo('.detail-card-left', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
        gsap.fromTo('.detail-card-right', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 });
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-error font-body-lg">{error || 'Event not found'}</p>
          <Link to="/events" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const basePrice = event.pricing?.finalPrice || event.basePrice;
  const multiplier = (
    (event.pricing?.demandMultiplier || 1.0) *
    (event.pricing?.timeMultiplier || 1.0) *
    (event.pricing?.categoryMultiplier || 1.0)
  ).toFixed(2);

  const getTierPrice = () => {
    const tier = (event.ticketTiers || []).find(t => t.name === selectedTier);
    const multiplier = tier ? tier.priceMultiplier : 1.0;
    return Math.round(basePrice * multiplier);
  };

  const currentTierPrice = getTierPrice();
  const seatsRemaining = event.pricing?.seatsRemaining ?? (event.totalSeats - event.bookedSeats);
  const fillRate = event.pricing?.fillRate ?? Math.round((event.bookedSeats / event.totalSeats) * 100);

  // Map category to localized specs
  const getSpecs = () => {
    const category = event.category || 'Concert';
    if (category === 'Concert' || category === 'Festival') {
      return {
        leftTitle: 'Audio Spec',
        leftIcon: Volume2,
        leftColor: 'tertiary',
        leftItems: [
          { label: 'Output Peak', val: '142dB Dynamic Range' },
          { label: 'Frequency Response', val: '5Hz - 45kHz' },
          { label: 'Audio Rig', val: 'L-Acoustics K1 Omni' }
        ],
        rightTitle: 'Visual Engine',
        rightIcon: Cpu,
        rightColor: 'primary-container',
        rightItems: [
          { label: 'Resolution Output', val: '16K Volumetric' },
          { label: 'Engine Pipeline', val: 'Unreal Prime 5.4' },
          { label: 'Refresh Index', val: '240FPS Fluid Motion' }
        ]
      };
    }
    return {
      leftTitle: 'Guest Experience',
      leftIcon: Users,
      leftColor: 'tertiary',
      leftItems: [
        { label: 'Catering Tier', val: 'Premium Buffet Included' },
        { label: 'Lounge Comfort', val: 'Acoustically Controlled' },
        { label: 'Access Level', val: 'All-inclusive Beverage' }
      ],
      rightTitle: 'Venue Specs',
      rightIcon: Sparkles,
      rightColor: 'primary-container',
      rightItems: [
        { label: 'Climate Profile', val: 'Dual-Zone Air Flow' },
        { label: 'Security Layer', val: 'Biometric Access Gates' },
        { label: 'Acoustics Mode', val: 'Digital Echo Absorption' }
      ]
    };
  };

  const specs = getSpecs();

  // Pick headliners based on category/event id
  const getHeadliners = () => {
    const seed = event.title.length % 4;
    return [headlinersPool[seed], headlinersPool[(seed + 1) % headlinersPool.length]];
  };
  const eventHeadliners = getHeadliners();

  return (
    <div ref={containerRef} className="relative overflow-x-hidden min-h-screen bg-background text-on-surface mt-[-96px] pb-16">
      <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
        <img src={concertBg} alt="" className="w-full h-full object-cover opacity-15 grayscale-[40%] scale-105 blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
      </div>

      <section className="relative w-full h-[550px] flex items-end pb-12 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60 scale-105"
            src={event.image || concertBg}
            alt={event.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[16px] md:px-[40px] flex flex-col md:flex-row justify-between items-end gap-8 hero-title-box">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-caps text-xs uppercase tracking-widest border border-secondary/30">
                {event.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Live Sync Enabled</span>
              </div>
            </div>
            <h1 className="font-display-lg text-display-lg text-white leading-none tracking-tight">
              {event.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {event.description.length > 150 ? `${event.description.slice(0, 150)}...` : event.description}
            </p>
          </div>

          <div className="flex gap-8 border-l border-white/10 pl-8 shrink-0">
            <div className="space-y-1 hero-stat-item">
              <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Location</p>
              <p className="font-headline-md text-lg text-white font-bold">{event.venue}</p>
              <p className="font-body-md text-sm text-on-surface-variant">{event.location}</p>
            </div>
            <div className="space-y-1 hero-stat-item">
              <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Date & Time</p>
              <p className="font-headline-md text-lg text-white font-bold">{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              <p className="font-body-md text-sm text-on-surface-variant">21:00 - Late</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT GRID ═══════════ */}
      <section className="max-w-[1440px] mx-auto px-[16px] md:px-[40px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Operation Brief */}
          <article className="detail-card-left glass-card p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center bg-primary/20">
                <span className="text-xl font-bold text-primary">
                  {event.organizer?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Host & Organizer</p>
                <h3 className="font-title-lg text-lg text-white font-bold">{event.organizer?.name || 'Authorized PrimePlanners Agent'}</h3>
              </div>
            </div>

            <div className="h-px bg-white/10 my-4"></div>

            <h2 className="font-headline-lg text-headline-lg text-primary">Operation Brief</h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-4">
              <p>{event.description}</p>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              {/* Left Specs */}
              <div className="p-6 glass-card rounded-2xl border border-tertiary/20">
                <div className="flex items-center gap-3 mb-4">
                  <specs.leftIcon className="w-5 h-5 text-tertiary" />
                  <h3 className="font-headline-md text-base text-tertiary uppercase tracking-wider font-bold">{specs.leftTitle}</h3>
                </div>
                <ul className="space-y-2 font-body-md text-sm text-on-surface-variant">
                  {specs.leftItems.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b border-white/5 pb-1">
                      <span>{item.label}</span>
                      <span className="text-white font-semibold">{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Specs */}
              <div className="p-6 glass-card rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <specs.rightIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-headline-md text-base text-primary uppercase tracking-wider font-bold">{specs.rightTitle}</h3>
                </div>
                <ul className="space-y-2 font-body-md text-sm text-on-surface-variant">
                  {specs.rightItems.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b border-white/5 pb-1">
                      <span>{item.label}</span>
                      <span className="text-white font-semibold">{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Demand Velocity Bento */}
          <section className="detail-card-left glass-card p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-headline-md text-xl text-white font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-tertiary" />
                  Demand Velocity
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant">Dynamic pricing fluctuations in real-time</p>
              </div>
              <div className="text-right">
                <span className="font-display-lg text-2xl text-tertiary font-extrabold">x{multiplier}</span>
                <p className="font-label-caps text-xs text-tertiary tracking-wider uppercase">Current Multiplier</p>
              </div>
            </div>

            {/* Simulated Live Pulse Bars */}
            <div className="flex items-end gap-2 h-36 mb-6">
              {pulseHeights.map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-lg transition-all duration-[1200ms] ${
                    i % 2 === 0
                      ? 'bg-primary/30 hover:bg-primary neon-glow-pink'
                      : 'bg-tertiary/30 hover:bg-tertiary neon-glow-cyan'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 text-center border-t border-white/15 pt-6">
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Capacity</p>
                <p className="font-headline-md text-lg text-white font-bold">{fillRate}% Filled</p>
              </div>
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Seats Left</p>
                <p className="font-headline-md text-lg text-white font-bold">{seatsRemaining} Left</p>
              </div>
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Price Trend</p>
                <p className="font-headline-md text-lg text-primary font-bold">{fillRate > 50 ? 'UPWARD' : 'STABLE'}</p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8 detail-card-right">
            
            {/* Booking Card */}
            <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-4 -translate-y-4"></div>
              
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Selected Tier Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg text-3xl text-secondary font-extrabold">₹{currentTierPrice.toLocaleString()}</span>
                  <span className="font-body-md text-sm text-on-surface-variant">/ ticket</span>
                </div>
              </div>

              {/* Input Forms */}
              <div className="space-y-4">
                <div className="p-4 bg-surface-container-lowest/80 rounded-xl border border-white/10 focus-within:border-primary/50 transition-colors">
                  <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-2">Tier Selection</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-transparent border-none text-white text-base focus:ring-0 appearance-none cursor-pointer outline-none"
                  >
                    {event.ticketTiers && event.ticketTiers.length > 0 ? (
                      event.ticketTiers.map((tier, idx) => (
                        <option key={idx} className="bg-surface-container" value={tier.name}>
                          {tier.name} ({tier.priceMultiplier}x Multiplier)
                        </option>
                      ))
                    ) : (
                      <>
                        <option className="bg-surface-container" value="General Admission">General Admission</option>
                        <option className="bg-surface-container" value="VIP - Sky Deck">VIP (1.5x Multiplier)</option>
                        <option className="bg-surface-container" value="Executive - Backstage">Executive (2.5x Multiplier)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="p-4 bg-surface-container-lowest/80 rounded-xl border border-white/10 focus-within:border-tertiary/50 transition-colors">
                  <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-2">Quantity</label>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setTickets(Math.max(1, tickets - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-headline-md text-lg text-white font-bold w-12 text-center">{tickets}</span>
                    <button
                      onClick={() => setTickets(Math.min(seatsRemaining || 10, tickets + 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-sm text-on-surface-variant border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>{tickets} x {selectedTier}</span>
                  <span>₹{(currentTierPrice * tickets).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base border-t border-white/5 pt-2 mt-2">
                  <span>Total Due</span>
                  <span className="text-primary font-bold">₹{(currentTierPrice * tickets).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={seatsRemaining <= 0}
                className="w-full py-4 bg-primary text-white font-label-caps text-sm uppercase tracking-widest rounded-2xl neon-glow-primary hover:brightness-110 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {seatsRemaining <= 0 ? 'SOLD OUT' : 'RESERVE NOW'}
                <Zap className="w-4 h-4" />
              </button>

              <p className="text-center font-label-caps text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                SECURE TRANSACTION • REFUND POLICY APPLIES
              </p>
            </div>

            {/* Headliners Column */}
            <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
              <h4 className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Featured Talents</h4>
              <div className="space-y-4">
                {eventHeadliners.map((artist, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden shrink-0 border border-white/10">
                      <img alt={artist.name} className="w-full h-full object-cover" src={artist.image} />
                    </div>
                    <div>
                      <p className="font-headline-md text-sm text-white font-bold">{artist.name}</p>
                      <p className="text-xs text-tertiary font-semibold">{artist.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Booking Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        tickets={tickets}
        ticketPrice={currentTierPrice}
        eventName={event.title}
        eventId={event._id}
        ticketType={selectedTier}
      />
    </div>
  );
};

export default EventDetails;