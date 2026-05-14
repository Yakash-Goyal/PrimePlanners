import {useState} from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center relative mt-[-96px]">
      <div className="glass-panel p-10 rounded-2xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl">
        <h2 className="font-display-md text-3xl text-white text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-on-surface-variant text-center mb-8 font-body-md">
          {isLogin ? 'Enter your credentials to access your account' : 'Sign up to start planning and exploring'}
        </p>

        <form className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2">Full Name</label>
              <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block font-label-md text-on-surface-variant mb-2">Email Address</label>
            <input type="email" className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="hello@example.com" />
          </div>
          <div>
            <label className="block font-label-md text-on-surface-variant mb-2">Password</label>
            <input type="password" className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full py-4 mt-4 bg-primary text-white font-headline-lg-mobile text-lg uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-tertiary hover:text-white transition-colors font-label-md">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;