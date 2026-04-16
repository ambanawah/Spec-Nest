import ComparisonTray from '../components/ComparisonTray';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function CartPage() {
  return (
    <>
      <Header activePage="cart" />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4">Precision Cart</h1>
          <div className="flex items-center gap-3 bg-surface-container-high w-fit px-4 py-2 rounded-sm border border-outline-variant/15">
            <span className="material-symbols-outlined text-[#00ff9d]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#00ff9d]">Technical Compatibility Check: 100% Compatible</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {/* Item 1 */}
            <div className="bg-surface-container-low p-6 flex flex-col md:flex-row gap-6 group hover:bg-surface-container transition-colors duration-300">
              <div className="w-full md:w-48 h-48 bg-surface-container-lowest overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="close-up of a high-end graphics card with metallic textures and glowing blue led accents on dark surface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANBUtiDkceL5_krwcUJFidy-3ZeBcaJobebZR3hc9GO2IlXcEgZW7sADQt206IZwYH86CSRLtXyLFRUqOjWr9oPeG5Uo0Yp4t2-eUbLwCcfjeTivctKgKnR6YmLrJ-fWTgLhXslXK3BXS2EJLyHM47T97A09LCxkvGGrZXs2c0LIhavpi7UOzPgBT4Jrz58dK4Y_ndNMlOcCRgVujMLJPiJRq8UVHZWZFNCOS1KKSSgjGdht2EpW9BIOveivcXB7iui-jYoM5oDmiE"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-[#e2e0fc]">RTX 4090 Phantom Strix OC</h3>
                    <p className="text-on-surface-variant font-body text-sm">24GB GDDR6X • Advanced Ray Tracing Core v3</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container-highest px-2 py-1 font-label text-[10px] tracking-widest uppercase text-on-surface">Overclocked</span>
                  <span className="bg-surface-container-highest px-2 py-1 font-label text-[10px] tracking-widest uppercase text-on-surface">Triple-Fan</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-4 bg-surface-container-lowest px-3 py-1 rounded-sm">
                    <button className="text-primary hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="font-label font-bold text-sm">01</span>
                    <button className="text-primary hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <span className="text-xl font-headline font-extrabold">$1,999.00</span>
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="bg-surface-container-low p-6 flex flex-col md:flex-row gap-6 group hover:bg-surface-container transition-colors duration-300">
              <div className="w-full md:w-48 h-48 bg-surface-container-lowest overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="modern industrial design of a gold-rated power supply unit with modular cable ports and matte black finish"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9LPjshVV4H4pkKCf9n3fAsxCQyIipP54OR1PzR93Km5E-xMSPqxPmM8qi0DbmJRFDR55bts6f9rFu9JyEmgni6ewV32jy5cwMgrG-s23DK8PAxgRlJRDLuqXF91PI5Ds4kLvF4kshIbTm8z-w2z87ZEKQZEB1nbYLIUTQDeIzguBl72rg4WQ3n6vPKg5uSQ2yYlKJE8rby5ACorNVsmkLK6atywr3-Y5GxA2yotJXYLHod4CJGq6g8r_I28iSXOcEnd0N4o8gH3no"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-[#e2e0fc]">Quantum Core 1200W PSU</h3>
                    <p className="text-on-surface-variant font-body text-sm">80+ Platinum • Fully Modular • ATX 3.0</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container-highest px-2 py-1 font-label text-[10px] tracking-widest uppercase text-on-surface">Zero-RPM Fan</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-4 bg-surface-container-lowest px-3 py-1 rounded-sm">
                    <button className="text-primary hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="font-label font-bold text-sm">01</span>
                    <button className="text-primary hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <span className="text-xl font-headline font-extrabold">$289.50</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side: Order Summary */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-container-high p-8 shadow-2xl shadow-black/40">
              <h2 className="text-xl font-headline font-bold mb-8 tracking-tight">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant text-sm font-body">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-label">$2,288.50</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-sm font-body">
                  <span>Estimated Tax</span>
                  <span className="text-on-surface font-label">$183.08</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-sm font-body">
                  <span>Priority Shipping</span>
                  <span className="text-secondary font-label tracking-widest text-[10px] uppercase">Calculated at Step 2</span>
                </div>
              </div>
              {/* Promo Code */}
              <div className="mb-8">
                <label className="block font-label text-[10px] uppercase tracking-[0.2em] mb-2 text-on-surface-variant">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary font-label text-sm px-4 py-3"
                    placeholder="ENTER CODE"
                    type="text"
                  />
                  <button className="bg-surface-container-highest px-4 py-3 font-label text-[10px] uppercase tracking-widest hover:bg-primary-container transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              <div className="border-t border-outline-variant/20 pt-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="font-headline font-bold text-lg">Total</span>
                  <div className="text-right">
                    <span className="block text-3xl font-headline font-black text-primary tracking-tighter">$2,471.58</span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-label">USD (Incl. Fees)</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-br from-primary-container to-secondary-container py-4 rounded-md font-headline font-extrabold text-white text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-transform duration-200 active:scale-95 group shadow-lg shadow-primary-container/20">
                Secure Checkout
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">lock</span>
              </button>
              <div className="mt-8 grid grid-cols-4 gap-4 opacity-40 grayscale">
                <span className="material-symbols-outlined text-2xl mx-auto">payments</span>
                <span className="material-symbols-outlined text-2xl mx-auto">credit_card</span>
                <span className="material-symbols-outlined text-2xl mx-auto">account_balance</span>
                <span className="material-symbols-outlined text-2xl mx-auto">token</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ComparisonTray />
      <Footer />
    </>
  );
}