import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import { Ticket, Megaphone, ArrowLeft } from 'lucide-react';
import concertBg from '../assets/concert-bg.png';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const navigate = useNavigate();
  const { login, register: authRegister } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attender', // 'attender' or 'creator'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  useEffect(() => {
    // Initial GSAP animation
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(cardRef.current, 
        { scale: 0.95, opacity: 0, y: 30 }, 
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await authRegister(formData.name, formData.email, formData.password, formData.role);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="relative z-20 min-h-screen flex flex-col md:flex-row mt-[-96px] overflow-hidden bg-background text-on-surface">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Left Column: Visual Brand Banner */}
      <div ref={leftColRef} className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden group z-10">
        <img 
          src={concertBg} 
          alt="Concert Experience" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent"></div>
        <div className="relative z-20 flex flex-col justify-end p-20 h-full w-full">
          <div className="max-w-2xl">
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-md text-label-md tracking-[0.25em] uppercase backdrop-blur-sm mb-6 inline-block">
              Welcome to the Arena
            </span>
            <h1 className="font-display-lg text-6xl lg:text-display-lg text-white mb-6 leading-none tracking-tighter">
              UNFORGETTABLE<br />
              <span className="text-primary text-glow italic">EXPERIENCES</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
              Engineering the future of nightlife logistics. Join the elite network of event creators and enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Card Container */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 relative z-10 min-h-screen pt-32 pb-16 md:pt-28">
        <div ref={cardRef} className="glass-card w-full max-w-md p-8 md:p-10 rounded-3xl relative shadow-2xl">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors font-bold text-sm cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          {/* Switch Tab Options */}
          <div className="flex gap-8 mb-8 border-b border-white/10 relative">
            <button 
              className={`font-title-lg text-title-lg pb-4 relative transition-all cursor-pointer ${
                isLogin ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Login
              {isLogin && (
                <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_#ff2d78]"></span>
              )}
            </button>
            <button 
              className={`font-title-lg text-title-lg pb-4 relative transition-all cursor-pointer ${
                !isLogin ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Register
              {!isLogin && (
                <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_#ff2d78]"></span>
              )}
            </button>
          </div>

          {/* Form Content */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name input for registration */}
            {!isLogin && (
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="floating-label-input w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all peer placeholder-transparent"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none font-body-md text-body-md"
                >
                  Full Name
                </label>
              </div>
            )}

            {/* Email input */}
            <div className="relative">
              <input 
                type="email" 
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="floating-label-input w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all peer placeholder-transparent"
              />
              <label 
                htmlFor="email" 
                className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none font-body-md text-body-md"
              >
                Email Address
              </label>
            </div>

            {/* Password input */}
            <div className="relative">
              <input 
                type="password" 
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="floating-label-input w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all peer placeholder-transparent"
              />
              <label 
                htmlFor="password" 
                className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none font-body-md text-body-md"
              >
                Password
              </label>
            </div>

            {/* Role picker card selectors for registration */}
            {!isLogin && (
              <div className="space-y-3">
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest pl-1">
                  Select your path
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => handleRoleSelect('attender')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      formData.role === 'attender' 
                        ? 'border-tertiary neon-glow-cyan bg-tertiary/10 text-white' 
                        : 'border-white/10 bg-white/5 text-on-surface-variant hover:border-tertiary/50'
                    }`}
                  >
                    <Ticket className="mb-2 block text-tertiary" />
                    <span className="font-title-lg text-sm md:text-body-lg block font-bold">Attend Events</span>
                  </div>
                  <div 
                    onClick={() => handleRoleSelect('creator')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      formData.role === 'creator' 
                        ? 'border-primary neon-glow-pink bg-primary/10 text-white' 
                        : 'border-white/10 bg-white/5 text-on-surface-variant hover:border-primary/50'
                    }`}
                  >
                    <Megaphone className="mb-2 block text-primary" />
                    <span className="font-title-lg text-sm md:text-body-lg block font-bold">Create Events</span>
                  </div>
                </div>
              </div>
            )}

            {/* Remember Me and Forgot Password options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <button type="button" className="font-label-md text-label-md text-tertiary hover:underline bg-transparent border-none outline-none cursor-pointer">
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary py-4 rounded-xl text-white font-title-lg text-title-lg font-bold shadow-[0_0_20px_rgba(255,45,120,0.4)] active:scale-95 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Enter the Arena' : 'Create Account')}
            </button>

            {/* Social logins */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] bg-white/10 flex-grow"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">OR CONTINUE WITH</span>
              <div className="h-[1px] bg-white/10 flex-grow"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <img 
                  alt="Google" 
                  className="w-5 h-5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMrUePeM-aGwl0pBh_ZGpSZO_2_IyTaldhJJoWyy2-lUoA_QP4oQoVLvFs9j_r0498oYm1mQGGFPBtkVVH1K8eo_gu4_K0-tvc8D62ETiagRLPV6LsohMpvuilegq-i5CnwOmjpU1Ccu3QOO8IzHlruua_GCeS3yvWoZgabGY1CH1fiecoM6mCXFhzjpA55xPaQkke_6xKZqzHEGP8pBSKXq4WpAtrBVBMXRMfZCKuPyS8W4Yd5Nu-uZxSoRVdL-Odtu6KSNTw5Xw" 
                />
                <span className="font-body-md text-body-md text-white">Google</span>
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <img 
                  alt="Apple" 
                  className="w-5 h-5 invert" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5V6LAZf2tnZVaKXNJxrOF7B6Zm9iDjiGHMoWDJlOVeRW7bI7m5ECVt6I7FInnHNlqrOgtZzOQYKYOzhR-xaMFIiHBV_wpRvwnat8GXqKiGFwcmo8DKx028qOpw6lAg4sFoeYWcd1FOkkiNQdAYZ0qR9SPtP-HY5EL6Yns6RWrDVIAW52JMp3bUJXyq9Gut4ZnfaL6aRPqnQZfKyG0qnEiDkOybTrCzdc7h-21EPzMZcsKy9FmuwbcvT9395Ppuml8oSSa40zIFEo" 
                />
                <span className="font-body-md text-body-md text-white">Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;