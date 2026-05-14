import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const CreateEvent = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Nightlife',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    description: ''
  });

  useEffect(() => {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8" ref={containerRef}>
      <div className="flex flex-col lg:flex-row gap-12 relative">
        
        {/* Form Section */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8 stagger-item">
          <div>
            <h1 className="font-display-md text-display-md text-white">Create Event</h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg mt-2">Design your next unforgettable experience.</p>
          </div>

          <form className="flex flex-col gap-8">
            {/* Basic Info */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden stagger-item">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="font-headline-sm text-white border-b border-white/10 pb-4">Basic Information</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Event Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Midnight Synthesis"
                  value={formData.title}
                  onChange={handleChange}
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
                  <option value="Nightlife">Nightlife</option>
                  <option value="Concert">Concert</option>
                  <option value="Festival">Festival</option>
                  <option value="Networking">Networking</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all font-body-lg text-body-lg [color-scheme:dark]" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,42,95,0.3)] transition-all font-body-lg text-body-lg [color-scheme:dark]" 
                  />
                </div>
              </div>
            </div>

            {/* Venue & Capacity */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden stagger-item">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="font-headline-sm text-white border-b border-white/10 pb-4">Venue Details</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Location</label>
                <input 
                  type="text" 
                  name="location"
                  placeholder="e.g. The Obsidian Vault"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Capacity</label>
                  <input 
                    type="number" 
                    name="capacity"
                    placeholder="e.g. 2500"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all font-body-lg text-body-lg" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Ticket Price (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    placeholder="e.g. 15000"
                    value={formData.price}
                    onChange={handleChange}
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
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tertiary focus:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all resize-none font-body-lg text-body-lg"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Cover Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant group-hover:text-tertiary group-hover:bg-tertiary/10 transition-all">
                    <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                  </div>
                  <p className="text-white font-title-md mt-2">Click to upload or drag and drop</p>
                  <p className="text-on-surface-variant text-sm">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>
            </div>

            <button type="button" className="w-full py-4 bg-primary text-white font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 stagger-item">
              Publish Event
            </button>
          </form>
        </div>

        {/* Live Preview Sticky Sidebar */}
        <div className="hidden lg:block w-[40%] relative">
          <div className="sticky top-32 glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10 stagger-item">
            <div className="h-48 bg-surface-variant relative">
              <img className="w-full h-full object-cover opacity-50" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" alt="Preview" />
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
                  <span className="shrink-0 text-primary font-bold text-xl">₹{formData.price}</span>
                )}
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary">calendar_today</span>
                  <span className="text-sm">{formData.date || 'Date'} • {formData.time || 'Time'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <span className="text-sm line-clamp-1">{formData.location || 'Location'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <span className="text-sm">{formData.capacity ? `${formData.capacity} Capacity` : 'Capacity'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-on-surface-variant line-clamp-3">
                  {formData.description || 'Event description will appear here...'}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-variant border border-white/10"></div>
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Apex Entertainment Group</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateEvent;