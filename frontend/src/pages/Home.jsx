import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, ArrowRight, Music,
  Heart, Briefcase, PartyPopper, Tent,
  Ticket, Building2, CreditCard,
} from 'lucide-react';

import heroBg from '../assets/hero-festival.png';
import catConcerts from '../assets/cat-concerts.png';
import catWeddings from '../assets/cat-weddings.png';
import catCorporate from '../assets/cat-corporate.png';
import catParties from '../assets/cat-parties.png';
import catFestivals from '../assets/cat-festivals.png';
import eventCyber from '../assets/event-cyber.png';
import eventSaas from '../assets/event-saas.png';
import eventJazz from '../assets/event-jazz.png';
import artist1 from '../assets/artist-1.png';
import artist2 from '../assets/artist-2.png';
import artist3 from '../assets/artist-3.png';
import artist4 from '../assets/artist-4.png';
import artist5 from '../assets/artist-5.png';
import artist6 from '../assets/artist-6.png';

gsap.registerPlugin(ScrollTrigger);

/* ── data ── */

const CATEGORIES = [
  { title: 'Concerts', img: catConcerts, tag: 'High Energy', tagColor: 'primary', Icon: Music },
  { title: 'Weddings', img: catWeddings, tag: 'Premium Luxe', tagColor: 'tertiary', Icon: Heart },
  { title: 'Corporate', img: catCorporate, tag: 'Precision', tagColor: 'secondary', Icon: Briefcase },
  { title: 'Parties', img: catParties, tag: 'Vibrant', tagColor: 'primary', Icon: PartyPopper },
  { title: 'Festivals', img: catFestivals, tag: 'Epic Scale', tagColor: 'tertiary', Icon: Tent },
];

const ARTISTS = [
  { name: 'Amelie Lens', img: artist1, glow: 'bg-primary' },
  { name: 'Charlotte de Witte', img: artist2, glow: 'bg-tertiary' },
  { name: 'Solomun', img: artist3, glow: 'bg-primary' },
  { name: 'Boris Brejcha', img: artist4, glow: 'bg-tertiary' },
  { name: 'Adam Beyer', img: artist5, glow: 'bg-primary' },
  { name: 'Nina Kraviz', img: artist6, glow: 'bg-tertiary' },
];

const STATS = [
  { value: '12M+', label: 'Tickets Sold', cls: 'text-primary neon-text-glow' },
  { value: '2.4k', label: 'Global Venues', cls: 'text-tertiary neon-text-glow-cyan' },
  { value: '24/7', label: 'Live Support', cls: 'text-white neon-text-glow' },
  { value: '0.1ms', label: 'API Latency', cls: 'text-secondary neon-text-glow' },
];

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [heroSearch, setHeroSearch] = useState('');

  const doSearch = () =>
    navigate(`/events${heroSearch.trim() ? `?search=${encodeURIComponent(heroSearch.trim())}` : ''}`);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero entrance ── */
      const htl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      htl.fromTo('.hero-bg-img', { scale: 1.2, opacity: 0 }, { scale: 1.1, opacity: 0.6, duration: 2 });
      htl.fromTo('.hero-blob', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'elastic.out(1,0.5)' }, '-=1.5');
      htl.fromTo('.hero-badge', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.8');
      htl.fromTo('.hero-title', { y: 60, opacity: 0, filter: 'blur(12px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, '-=0.5');
      htl.fromTo('.hero-desc', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
      htl.fromTo('.hero-btn', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.4');

      /* ── Hero parallax on scroll ── */
      gsap.to('.hero-bg-img', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-content', { yPercent: 20, opacity: 0, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });

      /* ── Blob floating ── */
      gsap.utils.toArray('.hero-blob').forEach((b, i) => {
        gsap.to(b, { x: `random(-40,40)`, y: `random(-40,40)`, scale: `random(0.9,1.15)`, duration: `random(6,10)`, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 1.5 });
      });

      /* ── Search hub entrance ── */
      gsap.fromTo('.search-hub', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.search-hub', start: 'top 90%' } });
      gsap.fromTo('.stat-card', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.stat-card', start: 'top 90%' } });



      /* ── Categories ── */
      gsap.fromTo('.vibe-card', { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.vibes-grid', start: 'top 85%' } });

      /* ── Artists ── */
      gsap.fromTo('.artist-card', { y: 50, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.artists-grid', start: 'top 85%' } });

      /* ── Featured events bento ── */
      gsap.fromTo('.bento-main', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' } });
      gsap.fromTo('.bento-side', { x: 80, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' } });

      /* ── Stats counter ── */
      gsap.fromTo('.stat-num', { y: 40, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(2)', scrollTrigger: { trigger: '.stats-section', start: 'top 80%' } });

      /* ── Section headers ── */
      gsap.utils.toArray('.section-header').forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 mt-[-96px] overflow-x-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <header ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Festival" className="hero-bg-img absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
          <div className="hero-blob absolute w-[600px] h-[600px] bg-primary/20 -top-20 -left-20 rounded-full filter blur-[120px]" />
          <div className="hero-blob absolute w-[500px] h-[500px] bg-tertiary/20 bottom-40 -right-20 rounded-full filter blur-[120px]" style={{ animationDelay: '-2s' }} />
          <div className="hero-blob absolute w-[300px] h-[300px] bg-secondary/15 top-1/2 left-1/3 rounded-full filter blur-[120px]" style={{ animationDelay: '-4s' }} />
        </div>

        <div className="hero-content relative z-10 text-center px-[16px] md:px-0 max-w-5xl flex flex-col items-center">
          <span className="hero-badge inline-block px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-md text-label-md mb-8 tracking-[0.2em] uppercase backdrop-blur-sm">
            Redefining Nightlife Logistics
          </span>
          <h1 className="hero-title font-display-lg text-5xl md:text-display-lg mb-8 leading-[1.05] tracking-tight text-white">
            Engineering <br /> <span className="neon-text-glow">Electrifying</span> Experiences
          </h1>
          <p className="hero-desc font-body-lg text-lg md:text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate command center for global nightlife operators. Orchestrate complex large-scale events with surgical precision and cinematic atmosphere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/create-event')} className="hero-btn w-full sm:w-auto bg-primary px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-bold text-base shadow-[0_0_40px_rgba(255,45,120,0.5)] hover:scale-105 active:scale-95 transition-all">
              Start Planning
            </button>
            <button onClick={() => navigate('/events')} className="hero-btn w-full sm:w-auto bg-white/5 border border-white/20 backdrop-blur-md px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-bold text-base hover:bg-white/10 active:scale-95 transition-all">
              View Showcase
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════ SEARCH + STATS ═══════════ */}
      <section className="relative z-20 px-[16px] md:px-[40px] py-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Single Search Bar */}
          <div className="search-hub max-w-2xl mx-auto mb-12">
            <div className="glass-card flex items-center rounded-full px-6 py-3 border border-white/10 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(255,45,120,0.15)] transition-all">
              <Search className="w-5 h-5 text-on-surface-variant mr-3 flex-shrink-0" />
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant/50 outline-none font-body-lg text-body-lg py-1"
                placeholder="Search events, artists, venues..."
                type="text"
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/events${e.target.value.trim() ? `?search=${encodeURIComponent(e.target.value.trim())}` : ''}`); }}
              />
              <button onClick={() => navigate('/events')} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex-shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {[
              { label: 'Live Bookings', value: '1,284', Icon: Ticket },
              { label: 'Active Venues', value: '850+', Icon: Building2 },
              { label: 'Fee Commission', value: '1.8%', Icon: CreditCard },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="stat-card glass-card py-6 px-8 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-on-surface-variant text-label-md uppercase tracking-widest mb-1">{label}</p>
                  <h4 className="text-2xl font-bold text-white neon-text-glow-cyan">{value}</h4>
                </div>
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-tertiary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════ FEATURED EVENTS BENTO ═══════════ */}
      <section className="px-[16px] md:px-[40px] mb-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="section-header flex items-end justify-between mb-16">
            <h2 className="font-display-md text-headline-lg md:text-display-md text-white tracking-tight">Featured Experiences</h2>
            <button onClick={() => navigate('/events')} className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-all">Browse Map</button>
          </div>
          <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-[24px]">
            {/* Large Card */}
            <div className="bento-main md:col-span-8 group relative rounded-[3rem] overflow-hidden glass-card h-[650px] shadow-2xl cursor-pointer" onClick={() => navigate('/events')}>
              <img alt="Cyber-Frequency Berlin" src={eventCyber} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary px-4 py-1.5 rounded-lg text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/40">Limited Availability</span>
                  <span className="text-tertiary font-bold text-xs uppercase tracking-widest bg-tertiary/10 backdrop-blur-md px-4 py-1.5 rounded-lg border border-tertiary/20">Electronic • Berlin</span>
                </div>
                <h3 className="font-display-md text-4xl md:text-6xl text-white mb-6 leading-tight tracking-tighter">Cyber-Frequency<br />Berlin 2024</h3>
                <p className="text-xl text-on-surface-variant mb-10 max-w-2xl leading-relaxed">Join the world's most elite digital sound engineers for a 48-hour marathon of progressive techno and immersive visual architecture.</p>
                <div className="flex flex-wrap items-center gap-10">
                  <div className="flex -space-x-4">
                    <img src={artist1} className="w-14 h-14 rounded-full border-4 border-black object-cover" alt="" />
                    <img src={artist2} className="w-14 h-14 rounded-full border-4 border-black object-cover" alt="" />
                    <div className="w-14 h-14 rounded-full border-4 border-black bg-primary flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary/20">+4.2k</div>
                  </div>
                  <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all">Secure Blueprint</button>
                </div>
              </div>
            </div>
            {/* Side cards */}
            <div className="md:col-span-4 flex flex-col gap-[24px]">
              {[
                { img: eventSaas, tag: 'Corporate • NYC', tagColor: 'tertiary', title: 'SaaS Summit Networking' },
                { img: eventJazz, tag: 'Festival • London', tagColor: 'secondary', title: 'Neon Jazz Nights' },
              ].map(({ img, tag, tagColor, title }) => (
                <div key={title} className="bento-side flex-1 group relative rounded-[2.5rem] overflow-hidden glass-card shadow-xl border border-white/5 cursor-pointer min-h-[300px]" onClick={() => navigate('/events')}>
                  <img alt={title} src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className={`text-${tagColor} text-[10px] font-bold uppercase tracking-widest mb-3 block`}>{tag}</span>
                    <h3 className="font-title-lg text-white mb-4 text-2xl">{title}</h3>
                    <span className="text-white flex items-center gap-2 group/btn font-bold">
                      View Logistics <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover/btn:translate-x-2" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[16px] md:px-[40px] mb-32 bg-black/30 py-24 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="section-header font-headline-lg text-headline-lg text-white mb-4">Top Artists &amp; DJs</h2>
          <p className="text-on-surface-variant mb-16 max-w-2xl mx-auto">Instant booking access to the world's most sought-after headliners currently trending in the ecosystem.</p>
          <div className="artists-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
            {ARTISTS.map(({ name, img, glow }) => (
              <div key={name} className="artist-card group flex flex-col items-center">
                <div className="relative w-32 h-32 mb-6 group-hover:scale-105 transition-transform">
                  <div className={`absolute inset-0 ${glow} rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity`} />
                  <img alt={name} src={img} className="w-full h-full rounded-full object-cover border-2 border-white/10 p-1 bg-black relative z-10" />
                </div>
                <h4 className="font-bold text-white">{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="px-[16px] md:px-[40px] mb-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="section-header flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">Vibe Check</h2>
              <p className="text-on-surface-variant">Curate your logistics ecosystem by energy level.</p>
            </div>
            <button onClick={() => navigate('/events')} className="text-tertiary font-bold hover:underline">Explore All Vibes</button>
          </div>
          <div className="vibes-grid grid grid-cols-2 md:grid-cols-5 gap-[24px]">
            {CATEGORIES.map(({ title, img, tag, tagColor }) => (
              <div key={title} className="vibe-card group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer" onClick={() => navigate('/events')}>
                <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-title-lg text-white mb-1">{title}</h3>
                  <span className={`text-${tagColor} text-[10px] font-bold uppercase tracking-widest border border-${tagColor}/40 px-2 py-0.5 rounded backdrop-blur-md`}>{tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="stats-section bg-black/40 py-32 border-y border-white/5 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-primary/10 -bottom-20 left-1/4 rounded-full filter blur-[120px] animate-blob" />
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[40px] relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {STATS.map(({ value, label, cls }) => (
              <div key={label} className="stat-num flex flex-col items-center">
                <span className={`font-display-md ${cls} mb-2 text-5xl`}>{value}</span>
                <span className="font-label-md uppercase tracking-widest text-on-surface-variant font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;