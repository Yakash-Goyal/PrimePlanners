import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Input focus animations
      const inputs = document.querySelectorAll('.input-field');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input.previousElementSibling, { y: -24, scale: 0.85, color: '#ff007f', duration: 0.3, ease: 'power2.out' });
        });
        input.addEventListener('blur', () => {
          if (input.value === '') {
            gsap.to(input.previousElementSibling, { y: 0, scale: 1, color: '#9ca3af', duration: 0.3, ease: 'power2.out' });
          } else {
            gsap.to(input.previousElementSibling, { color: '#ffffff', duration: 0.3 });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-neon-purple/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-pink/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 contact-anim">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Let's <span className="text-gradient">Talk</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start planning? Drop us a line and let's make some magic happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div className="space-y-10 contact-anim">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Whether you have a fully formed vision or just a wild idea, our team is ready to listen. We usually respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Headquarters</h3>
                  <p className="text-gray-400">123 Party Avenue, Neon District<br/>Cyber City, CC 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567<br/>Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-400">hello@primeplanners.com<br/>events@primeplanners.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl contact-anim relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
            
            <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pt-6">
                  <label className="absolute left-0 top-6 text-gray-400 transition-all duration-300 origin-left pointer-events-none">First Name</label>
                  <input type="text" className="input-field w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-neon-pink transition-colors" />
                </div>
                <div className="relative pt-6">
                  <label className="absolute left-0 top-6 text-gray-400 transition-all duration-300 origin-left pointer-events-none">Last Name</label>
                  <input type="text" className="input-field w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-neon-pink transition-colors" />
                </div>
              </div>

              <div className="relative pt-6">
                <label className="absolute left-0 top-6 text-gray-400 transition-all duration-300 origin-left pointer-events-none">Email Address</label>
                <input type="email" className="input-field w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-neon-purple transition-colors" />
              </div>

              <div className="relative pt-6">
                <label className="absolute left-0 top-6 text-gray-400 transition-all duration-300 origin-left pointer-events-none">Event Type</label>
                <input type="text" className="input-field w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors" />
              </div>

              <div className="relative pt-6">
                <label className="absolute left-0 top-6 text-gray-400 transition-all duration-300 origin-left pointer-events-none">Tell us about your event</label>
                <textarea rows="4" className="input-field w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-neon-gold transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-party text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;