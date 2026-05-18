import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const navigate = useNavigate();
  const {login, register} = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attender'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, formData.role);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative mt-[-96px]">
      <div className="glass-panel p-10 rounded-2xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl">
        <h2 className="font-display-md text-3xl text-white text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-on-surface-variant text-center mb-8 font-body-md">
          {isLogin ? 'Enter your credentials to access your account' : 'Sign up to start planning and exploring'}
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                placeholder="John Doe" 
              />
            </div>
          )}
          
          <div>
            <label className="block font-label-md text-on-surface-variant mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              placeholder="hello@example.com" 
            />
          </div>
          
          <div>
            <label className="block font-label-md text-on-surface-variant mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              placeholder="••••••••" 
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2">I want to be a:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="attender"
                    checked={formData.role === 'attender'}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span className="text-white text-sm">Attender</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="creator"
                    checked={formData.role === 'creator'}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span className="text-white text-sm">Event Creator</span>
                </label>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-primary text-white font-headline-lg-mobile text-lg uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ ...formData, password: '' });
            }} 
            className="text-tertiary hover:text-white transition-colors font-label-md"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;