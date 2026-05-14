import {useState, useEffect, useRef} from 'react';
import gsap from 'gsap';

const CheckoutModal = ({ isOpen, onClose, tickets, ticketPrice, eventName }) => {
  const [step, setStep] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState(tickets);
  const modalRef = useRef(null);
  const serviceFee = 500;

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedTickets(tickets);
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, tickets]);

  if (!isOpen) return null;

  const totalAmount = (ticketPrice * selectedTickets) + (serviceFee * selectedTickets);

  const handleConfirm = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={step === 3 ? onClose : undefined}></div>
      
      <div ref={modalRef} className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {step !== 2 && (
          <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant transition-colors z-10">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6 relative z-10">
            <h2 className="font-display-sm text-white">Checkout</h2>
            
            <div className="flex flex-col gap-2">
              <p className="text-on-surface-variant text-sm uppercase tracking-wider">Event</p>
              <h3 className="font-title-lg text-white">{eventName}</h3>
            </div>

            {/* Ticket Selector */}
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-white/10">
              <span className="font-label-md text-white uppercase tracking-wider">Tickets</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-headline-sm text-white w-6 text-center">{selectedTickets}</span>
                <button onClick={() => setSelectedTickets(selectedTickets + 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-body-md text-body-md border-t border-white/10 pt-4">
              <div className="flex justify-between text-on-surface-variant">
                <span>{selectedTickets} x General Admission</span>
                <span>₹{(ticketPrice * selectedTickets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Service Fee</span>
                <span>₹{(serviceFee * selectedTickets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-title-lg text-title-lg text-white pt-3 border-t border-white/10 mt-1">
                <span>Total Amount</span>
                <span className="text-primary font-bold">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <p className="text-on-surface-variant text-sm uppercase tracking-wider">Pay With</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-primary/50 rounded-xl text-white transition-all neon-glow-primary bg-primary/10">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                  Card
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-on-surface-variant hover:text-white hover:border-white/30 transition-all">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  UPI
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button onClick={handleConfirm} className="w-full py-4 mt-2 bg-primary text-white font-headline-md text-headline-md uppercase tracking-wide rounded-xl neon-glow-primary hover:bg-primary-fixed hover:scale-[1.02] transition-all active:scale-95 flex justify-center items-center gap-2">
              Pay ₹{totalAmount.toLocaleString()}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-12 gap-6 relative z-10">
            <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
            <h2 className="font-display-sm text-white animate-pulse">Processing Payment...</h2>
            <p className="text-on-surface-variant text-center">Please do not close this window.</p>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-8 gap-6 relative z-10 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>
            <div className="text-center">
              <h2 className="font-display-sm text-white mb-2">Payment Successful!</h2>
              <p className="text-on-surface-variant">Your {selectedTickets} ticket(s) for {eventName} are confirmed.</p>
            </div>
            
            <div className="w-full bg-surface/50 rounded-xl p-4 border border-white/10 mt-4 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-white text-[32px]">qr_code_2</span>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest">Booking ID: AX-9482-K</p>
            </div>

            <button onClick={onClose} className="w-full py-4 mt-2 bg-white/10 text-white font-label-lg uppercase tracking-wide rounded-xl hover:bg-white/20 transition-all border border-white/20">
              View My Tickets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;