import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.hero-content', {
        yPercent: 15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.fromTo(section, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%'
            }
          }
        );
      });

      gsap.fromTo('.event-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.events-grid', start: 'top 80%' }
        }
      );
      
      gsap.fromTo('.category-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.categories-grid', start: 'top 85%' }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 mt-[-96px]"> {/* Offset Navbar padding */}
      <header ref={heroRef} className="relative w-full h-[921px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-surface-dim hero-bg">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155732-68ee14318c08?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 mix-blend-screen scale-110" style={{ transform: 'translateZ(-200px)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-tertiary/20 mix-blend-overlay z-10"></div>
          <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        </div>
        
        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop text-center flex flex-col items-center gap-10 hero-content">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="space-y-4">
              <span className="font-label-md text-primary tracking-[0.3em] uppercase bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block backdrop-blur-md">
                Premium Event Discovery
              </span>
              <h1 className="font-display-lg text-display-lg text-white max-w-5xl tracking-tighter uppercase leading-[0.9]">
                UNFORGETTABLE EVENTS.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary neon-text-glow">CREATED EFFORTLESSLY.</span>
              </h1>
            </div>
            
            <div className="glass-card bg-surface/40 backdrop-blur-3xl rounded-full p-2 flex items-center w-full max-w-3xl border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
              <div className="flex-1 flex items-center px-6 gap-4">
                <span className="material-symbols-outlined text-primary text-2xl">search</span>
                <input 
                  className="bg-transparent border-none text-white placeholder:text-on-surface-variant/50 focus:ring-0 flex-1 py-4 font-body-lg text-body-lg outline-none" 
                  placeholder="What are you looking for?" 
                  type="text"
                />
              </div>
              <Link to="/explore" className="bg-primary text-white px-10 py-4 rounded-full font-label-md text-label-md uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all flex items-center gap-3 neon-glow-primary">
                Find Events
                <span className="material-symbols-outlined text-lg">trending_flat</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="slant-divider"></div>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto px-margin-desktop py-24 flex flex-col gap-40 relative z-20">

        <section className="reveal-section">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display-md text-display-md text-white tracking-tight uppercase">Featured Events</h2>
              <p className="font-body-lg text-on-surface-variant mt-2">The hottest tickets in town right now.</p>
            </div>
            <Link to="/explore" className="text-primary hover:text-white font-label-md uppercase tracking-widest flex items-center gap-2 transition-colors neon-text-glow">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter events-grid">
            {[
              { id: 1, title: 'Neon Nights Festival', location: 'Cyber Dome, Neo City', price: '$99.00', img: 'https://images.unsplash.com/photo-1540039155732-68ee14318c08', tag: 'Concert', color: 'primary' },
              { id: 2, title: 'Midnight Synthesis', location: 'The Void Club', price: '$45.00', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', tag: 'Party', color: 'tertiary' },
              { id: 3, title: 'Electric Echoes', location: 'Echo Valley Fields', price: '$150.00', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', tag: 'Festival', color: 'primary' }
            ].map(event => (
              <Link to={`/event/${event.id}`} key={event.id} className={`event-card glass-card bg-surface-container-low rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 hover:border-${event.color}/30 transition-all duration-500`}>
                <div className="relative h-72 overflow-hidden">
                  <img alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src={`${event.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}/>
                  <div className="absolute top-6 left-6">
                    <span className={`bg-surface/80 backdrop-blur-md text-${event.color} border border-${event.color}/20 px-4 py-1 rounded-full font-label-md uppercase text-[10px] tracking-widest font-bold`}>
                      {event.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className={`font-title-lg text-white group-hover:text-${event.color} transition-colors tracking-tight`}>{event.title}</h3>
                  <div className="flex items-center gap-2 mt-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <p className="font-body-md">{event.location}</p>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Tickets</p>
                      <p className={`font-title-lg text-${event.color} font-black mt-1`}>{event.price}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-${event.color} group-hover:border-${event.color} transition-all`}>
                      <span className="material-symbols-outlined text-white text-xl">arrow_outward</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Categories */}
        <section className="reveal-section">
          <div className="text-center mb-16">
            <h2 className="font-display-md text-display-md text-white uppercase tracking-tight">Vibe Check</h2>
            <p className="font-body-lg text-on-surface-variant mt-4">Find exactly what you're looking for.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 categories-grid">
            {[
              { title: 'Concerts', icon: 'music_note', color: 'primary' },
              { title: 'Weddings', icon: 'favorite', color: 'tertiary' },
              { title: 'Corporate', icon: 'business_center', color: 'primary' },
              { title: 'Parties', icon: 'celebration', color: 'tertiary' },
              { title: 'Festivals', icon: 'festival', color: 'primary' }
            ].map((cat, i) => (
              <div key={i} className={`category-card glass-card rounded-2xl p-8 flex flex-col items-center gap-6 hover:-translate-y-3 transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_var(--color-${cat.color})] hover:border-${cat.color}/50 group bg-gradient-to-b from-white/5 to-transparent`}>
                <div className={`w-16 h-16 rounded-full bg-${cat.color}/10 flex items-center justify-center group-hover:bg-${cat.color}/20 transition-colors`}>
                  <span className={`material-symbols-outlined text-5xl text-${cat.color} group-hover:scale-110 transition-transform`} style={{textShadow: `0 0 15px var(--color-${cat.color})`}}>
                    {cat.icon}
                  </span>
                </div>
                <span className={`font-label-md text-label-md text-white uppercase tracking-widest group-hover:text-${cat.color} transition-colors`}>{cat.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;