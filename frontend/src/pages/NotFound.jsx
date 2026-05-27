import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import concertBg from '../assets/concert-bg.png';
import {
  Home,
  Search,
  Disc3,
  PartyPopper,
  Ticket,
  Sparkles,
  Music2,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NotFound = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const statusGridRef = useRef(null);
  const floatingIcon1 = useRef(null);
  const floatingIcon2 = useRef(null);
  const floatingIcon3 = useRef(null);
  const floatingIcon4 = useRef(null);
  const floatingIcon5 = useRef(null);
  const glowOrbsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Master Timeline for page entrance ───
      const masterTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background parallax zoom-in
      masterTL.fromTo(
        bgRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 2 }
      );

      // Gradient overlay fade
      masterTL.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 1.5 },
        '-=1.5'
      );

      // Glow orbs pulse in
      masterTL.fromTo(
        '.glow-orb',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=1'
      );

      // Glass card — scale + blur entrance
      masterTL.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.9, filter: 'blur(20px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 },
        '-=1'
      );

      // ─── 404 text — split character animation ───
      const heading404 = headingRef.current;
      if (heading404) {
        const chars = heading404.textContent.split('');
        heading404.innerHTML = chars
          .map(
            (c) =>
              `<span class="inline-block">${c === ' ' ? '&nbsp;' : c}</span>`
          )
          .join('');

        masterTL.fromTo(
          heading404.querySelectorAll('span'),
          { y: 100, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(2)',
          },
          '-=0.8'
        );
      }

      // Subtitle slide up
      masterTL.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );

      // Description fade in
      masterTL.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.3'
      );

      // Buttons — stagger slide in from bottom
      masterTL.fromTo(
        buttonsRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );

      // Status grid — stagger from bottom with rotation
      masterTL.fromTo(
        statusGridRef.current?.children || [],
        { y: 40, opacity: 0, rotationY: 20 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // ─── Floating Icons — Infinite subtle animations ───
      const floatingIcons = [
        floatingIcon1.current,
        floatingIcon2.current,
        floatingIcon3.current,
        floatingIcon4.current,
        floatingIcon5.current,
      ];

      floatingIcons.forEach((icon, i) => {
        if (!icon) return;

        // Entrance animation
        masterTL.fromTo(
          icon,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.6)',
          },
          `-=${1.2 - i * 0.05}`
        );

        // Infinite floating
        gsap.to(icon, {
          y: `random(-25, 25)`,
          x: `random(-15, 15)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 5)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });

        // Pulsing glow
        gsap.to(icon, {
          opacity: 0.15,
          duration: `random(2, 4)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });

      // ─── Glow Orbs — Continuous drifting ───
      gsap.utils.toArray('.glow-orb').forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-60, 60)`,
          scale: `random(0.8, 1.3)`,
          duration: `random(6, 12)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 1.5,
        });
      });

      // ─── Neon text glow pulsing ───
      gsap.to(heading404, {
        textShadow:
          '0 0 30px rgba(255, 45, 120, 1), 0 0 60px rgba(255, 45, 120, 0.6), 0 0 100px rgba(255, 45, 120, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ─── Card subtle hover float ───
      gsap.to(cardRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ─── ScrollTrigger: Parallax on background ───
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // ─── ScrollTrigger: Status grid counter animation ───
      ScrollTrigger.create({
        trigger: statusGridRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            statusGridRef.current?.children || [],
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.7)',
            }
          );
        },
        once: true,
      });

      // ─── ScrollTrigger: Card glass shimmer ───
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            {
              boxShadow:
                '0 0 0px rgba(255, 45, 120, 0), 0 25px 50px -12px rgba(0,0,0,0.25)',
            },
            {
              boxShadow:
                '0 0 40px rgba(255, 45, 120, 0.15), 0 25px 50px -12px rgba(0,0,0,0.5)',
              duration: 1.5,
              ease: 'power2.out',
            }
          );
        },
        once: true,
      });

      // ─── Mouse parallax on floating icons ───
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        floatingIcons.forEach((icon, i) => {
          if (!icon) return;
          const depth = (i + 1) * 8;
          gsap.to(icon, {
            x: moveX * depth,
            y: moveY * depth,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        // Subtle card tilt
        gsap.to(cardRef.current, {
          rotateY: moveX * 2,
          rotateX: -moveY * 2,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex-grow flex items-center justify-center overflow-hidden py-20 px-[16px] md:px-[40px] min-h-[calc(100vh-6rem)]"
      style={{ perspective: '1000px' }}
    >
      {/* ─── Background Image ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={concertBg}
          alt="Concert atmosphere"
          className="w-full h-full object-cover opacity-0 mix-blend-screen will-change-transform"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-0"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(124, 58, 237, 0.3), transparent),
              radial-gradient(circle at bottom left, rgba(255, 45, 120, 0.2), transparent),
              #0a0a0a
            `,
          }}
        />
      </div>

      {/* ─── Animated Glow Orbs ─── */}
      <div ref={glowOrbsRef} className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="glow-orb absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 filter blur-[100px]" />
        <div className="glow-orb absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-tertiary/8 filter blur-[120px]" />
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/5 filter blur-[150px]" />
      </div>

      {/* ─── Floating Icons ─── */}
      <div
        ref={floatingIcon1}
        className="absolute top-20 left-10 opacity-0 hidden md:block"
      >
        <Disc3 className="w-20 h-20 text-primary/30" strokeWidth={1} />
      </div>
      <div
        ref={floatingIcon2}
        className="absolute bottom-20 right-20 opacity-0 hidden md:block"
      >
        <PartyPopper className="w-28 h-28 text-tertiary/25" strokeWidth={1} />
      </div>
      <div
        ref={floatingIcon3}
        className="absolute top-1/4 right-1/4 opacity-0"
      >
        <Ticket className="w-10 h-10 text-secondary/20" strokeWidth={1.5} />
      </div>
      <div
        ref={floatingIcon4}
        className="absolute bottom-1/3 left-1/5 opacity-0 hidden lg:block"
      >
        <Music2 className="w-16 h-16 text-primary/15" strokeWidth={1} />
      </div>
      <div
        ref={floatingIcon5}
        className="absolute top-1/3 right-1/6 opacity-0 hidden lg:block"
      >
        <Sparkles className="w-12 h-12 text-tertiary/20" strokeWidth={1.5} />
      </div>

      {/* ─── Glassmorphism 404 Card ─── */}
      <section
        ref={cardRef}
        className="glass-card relative z-10 w-full max-w-3xl p-8 md:p-16 rounded-[2rem] text-center flex flex-col items-center gap-8 shadow-2xl will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer border effect */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(135deg, transparent 40%, rgba(255,45,120,0.1) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* 404 Heading + Subtitle */}
        <div className="flex flex-col items-center gap-2">
          <h1
            ref={headingRef}
            className="font-display-lg text-[72px] md:text-[96px] leading-none text-primary tracking-tighter mb-0 font-black"
            style={{
              textShadow:
                '0 0 10px rgba(255, 45, 120, 0.8), 0 0 20px rgba(255, 45, 120, 0.4)',
            }}
          >
            404
          </h1>
          <h2
            ref={subtitleRef}
            className="font-headline-lg text-headline-lg text-on-surface max-w-xl"
          >
            You've reached the after-party (of nowhere)
          </h2>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-md"
        >
          The page you're looking for has left the venue. Let's get you back to
          the main stage where the real action is happening.
        </p>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4"
        >
          <button
            id="notfound-home-btn"
            onClick={() => navigate('/')}
            className="group bg-primary text-white px-8 py-4 rounded-xl font-bold font-body-lg text-body-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 active:scale-95 relative overflow-hidden"
            style={{ boxShadow: '0 0 20px rgba(255, 45, 120, 0.6)' }}
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-15deg]" />
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Main Stage</span>
          </button>
          <button
            id="notfound-explore-btn"
            onClick={() => navigate('/events')}
            className="group border border-secondary text-secondary px-8 py-4 rounded-xl font-bold font-body-lg text-body-lg flex items-center justify-center gap-2 hover:bg-secondary/10 transition-all duration-300 active:scale-95"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Explore Events
          </button>
        </div>

        {/* Fun Status Grid */}
        <div
          ref={statusGridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-8 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center gap-1 group cursor-default">
            <span className="font-label-md text-label-md text-tertiary uppercase tracking-wider">
              Venue Status
            </span>
            <span className="font-title-lg text-title-lg text-on-surface group-hover:text-tertiary transition-colors duration-300 flex items-center gap-1">
              <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Sold Out
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 group cursor-default">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider">
              Current Vibe
            </span>
            <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors duration-300 flex items-center gap-1">
              <Music2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Electronic
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-1 group cursor-default">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">
              Guest List
            </span>
            <span className="font-title-lg text-title-lg text-on-surface group-hover:text-secondary transition-colors duration-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Open
            </span>
          </div>
        </div>
      </section>

      {/* Inline shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: -200% -200%; }
          50% { background-position: 200% 200%; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
