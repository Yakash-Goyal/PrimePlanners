import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const EditEvent = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Concert',
    date: '',
    location: '',
    venue: '',
    capacity: '',
    price: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        const e = data.event;
        setFormData({
          title: e.title || '',
          category: e.category || 'Concert',
          date: e.date ? new Date(e.date).toISOString().split('T')[0] : '',
          location: e.location || '',
          venue: e.venue || '',
          capacity: e.totalSeats?.toString() || '',
          price: e.basePrice?.toString() || '',
          description: e.description || '',
          image: e.image || ''
        });
      } catch (err) {
        setError('Failed to load event data');
      } finally {
        setFetching(false);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!fetching) {
      const ctx = gsap.context(() => {
        gsap.from('.stagger-item', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [fetching]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.put(`/events/${id}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        venue: formData.venue,
        image: formData.image,
        totalSeats: Number(formData.capacity),
        basePrice: Number(formData.price)
      });
      navigate('/my-events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex flex-col lg:flex-row gap-12 relative">
        
        {/* Form Section */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8 stagger-item">
          <div>
            <h1 className="font-display-md text-display-md text-white">Edit Event</h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg mt-2">Update your event details.</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Basic Info */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden stagger-item">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="font-headline-sm text-white border-b border-white/10 pb-4">Basic Information</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Event Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all font-body-lg text-body-lg" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all font-body-lg text-body-lg appearance-none"
                >
                  <option value="Concert">Concert</option>
                  <option value="Festival">Festival</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Private Party">Private Party</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all font-body-lg text-body-lg [color-scheme:dark]" 
                />
              </div>
            </div>

            {/* Venue & Capacity */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden stagger-item">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="font-headline-sm text-white border-b border-white/10 pb-4">Venue Details</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Venue Name</label>
                <input 
                  type="text" 
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">City / Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Capacity</label>
                  <input 
                    type="number" 
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Base Ticket Price (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden stagger-item">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="font-headline-sm text-white border-b border-white/10 pb-4">Event Description</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">About This Event</label>
                <textarea 
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tertiary focus:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all resize-none font-body-lg text-body-lg"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Cover Image URL</label>
                <input 
                  type="text" 
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tertiary focus:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all font-body-lg text-body-lg" 
                />
              </div>
            </div>

            <div className="flex gap-4 stagger-item">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-4 bg-primary text-white font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-white/5 text-on-surface-variant border border-white/10 font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wide rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Sticky Sidebar */}
        <div className="hidden lg:block w-[40%] relative">
          <div className="sticky top-32 glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10 stagger-item">
            <div className="h-48 bg-surface-variant relative">
              <img className="w-full h-full object-cover opacity-50" src={formData.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"} alt="Preview" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-wider border border-white/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">preview</span> Live Preview
              </span>
            </div>
            
            <div className="p-6 flex flex-col gap-4 relative z-10">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-display-sm text-display-sm text-white leading-tight line-clamp-2">
                  {formData.title || 'Untitled Event'}
                </h3>
                {formData.price && (
                  <span className="shrink-0 text-primary font-bold text-xl">₹{Number(formData.price).toLocaleString()}</span>
                )}
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary">calendar_today</span>
                  <span className="text-sm">{formData.date || 'Date'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <span className="text-sm line-clamp-1">{formData.venue || formData.location || 'Location'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <span className="text-sm">{formData.capacity ? `${Number(formData.capacity).toLocaleString()} Capacity` : 'Capacity'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-on-surface-variant line-clamp-3">
                  {formData.description || 'Event description will appear here...'}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50 text-sm font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">{user?.name || 'Organizer'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditEvent;
