import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from('.about-hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Values Animation
      gsap.from('.value-card', {
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)'
      });

      // Image Parallax
      gsap.to('.about-image', {
        scrollTrigger: {
          trigger: '.about-image-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: 50,
        scale: 1.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="about-hero-text text-4xl md:text-6xl font-display font-bold text-white mb-6">
            We Create <span className="text-gradient">Moments</span> That Outlast The Night
          </h1>
          <p className="about-hero-text text-xl text-gray-400 leading-relaxed">
            Founded in 2020, PrimePlanners started with a simple idea: parties shouldn't be boring. 
            We injected neon, high-energy vibes, and flawless logistics into the event space, 
            creating a new standard for what a celebration can be.
          </p>
        </div>
      </div>

      {/* Image Banner */}
      <div className="about-image-container w-full h-[60vh] md:h-[80vh] overflow-hidden relative mb-24">
        <div className="absolute inset-0 bg-dark-bg/20 z-10 mix-blend-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Massive crowd at a PrimePlanners event" 
          className="about-image w-full h-[120%] object-cover -mt-[10%]"
        />
      </div>

      {/* Core Values */}
      <div className="values-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Our Core <span className="text-gradient">Values</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">What drives us to stay awake for 48 hours straight to ensure your event is perfect.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Zap className="w-8 h-8 text-neon-pink" />, title: "Relentless Energy", desc: "We bring passion and high-voltage enthusiasm to every project." },
            { icon: <Sparkles className="w-8 h-8 text-neon-purple" />, title: "Aesthetic Obsession", desc: "Every detail must look incredible. We don't do 'good enough'." },
            { icon: <Shield className="w-8 h-8 text-neon-blue" />, title: "Ironclad Execution", desc: "Behind the wild parties is a military-grade logistical operation." },
            { icon: <Heart className="w-8 h-8 text-neon-gold" />, title: "Client Devotion", desc: "Your vision is our mission. We protect your peace of mind." }
          ].map((value, idx) => (
            <div key={idx} className="value-card p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-white/20 transition-colors text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;