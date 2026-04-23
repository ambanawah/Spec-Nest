import Link from 'next/link';

export default function ProductPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .signature-gradient {
            background: linear-gradient(45deg, #0066ff 0%, #6001d1 100%);
          }
          .halo-effect {
            box-shadow: 0 0 80px 10px rgba(179, 197, 255, 0.1);
          }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0c0c1f; }
          ::-webkit-scrollbar-thumb { background: #333348; border-radius: 4px; }
        `
      }} />
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#111125]/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 w-full shadow-2xl shadow-black/20">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[#e2e0fc] font-headline">SpecNest</Link>
        <div className="hidden md:flex gap-8 items-center">
          <a className="font-['Manrope'] uppercase tracking-wider text-sm text-[#e2e0fc]/70 hover:text-[#b3c5ff] transition-colors duration-300" href="#">Workstations</a>
          <a className="font-['Manrope'] uppercase tracking-wider text-sm text-[#b3c5ff] border-b-2 border-[#0066ff] pb-1" href="#">Laptops</a>
          <a className="font-['Manrope'] uppercase tracking-wider text-sm text-[#e2e0fc]/70 hover:text-[#b3c5ff] transition-colors duration-300" href="#">Components</a>
          <a className="font-['Manrope'] uppercase tracking-wider text-sm text-[#e2e0fc]/70 hover:text-[#b3c5ff] transition-colors duration-300" href="#">Enterprise</a>
        </div>
        <div className="flex gap-6 items-center text-[#b3c5ff]">
          <Link href="/cart" className="scale-95 active:duration-100 transition-transform">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          <button className="scale-95 active:duration-100 transition-transform">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      {/* SideNavBar (Product Sub-Nav) */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-[#1a1a2e] flex flex-col py-6 hidden lg:flex">
        <div className="px-6 mb-10">
          <div className="text-xs font-label uppercase tracking-widest text-primary mb-1">Titan Pro 16</div>
          <div className="text-[0.65rem] font-label text-on-surface-variant uppercase">RTX 4090 Edition</div>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 px-6 py-3 bg-[#28283d] text-[#b3c5ff] border-l-4 border-[#0066ff] font-label text-xs uppercase tracking-wider transition-all" href="#overview">
            <span className="material-symbols-outlined text-sm">info</span> Overview
          </a>
          <a className="flex items-center gap-4 px-6 py-3 text-[#e2e0fc]/50 hover:bg-[#1a1a2e] hover:text-[#e2e0fc] font-label text-xs uppercase tracking-wider transition-all" href="#specs">
            <span className="material-symbols-outlined text-sm">list_alt</span> Specs
          </a>
          <a className="flex items-center gap-4 px-6 py-3 text-[#e2e0fc]/50 hover:bg-[#1a1a2e] hover:text-[#e2e0fc] font-label text-xs uppercase tracking-wider transition-all" href="#benchmarks">
            <span className="material-symbols-outlined text-sm">bar_chart</span> Benchmarks
          </a>
          <a className="flex items-center gap-4 px-6 py-3 text-[#e2e0fc]/50 hover:bg-[#1a1a2e] hover:text-[#e2e0fc] font-label text-xs uppercase tracking-wider transition-all" href="#configure">
            <span className="material-symbols-outlined text-sm">settings</span> Configure
          </a>
          <a className="flex items-center gap-4 px-6 py-3 text-[#e2e0fc]/50 hover:bg-[#1a1a2e] hover:text-[#e2e0fc] font-label text-xs uppercase tracking-wider transition-all" href="#reviews">
            <span className="material-symbols-outlined text-sm">rate_review</span> Reviews
          </a>
        </nav>
        <div className="px-6 mt-auto">
          <button className="w-full signature-gradient text-white font-headline font-bold py-3 rounded-md text-sm scale-95 active:scale-90 transition-transform mb-4">Buy Now</button>
          <Link href="/compare" className="w-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-[#b3c5ff] font-label text-xs uppercase tracking-widest py-3 rounded-md scale-95 active:scale-90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">compare_arrows</span> Compare Models
          </Link>
        </div>
      </aside>

      <main className="lg:ml-64 mt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center px-8 lg:px-20 py-24 overflow-hidden bg-surface" id="overview">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              className="w-full h-full object-cover"
              alt="Moody cinematic shot of a sleek dark metallic laptop with glowing blue keyboard backlight against a dark architectural background with sharp shadows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLEsZt8PrUyCb88QhdfR_9VfnlY8zh-BKnzcrI4hU7VSvMc0LhSVrcOPDcmrXsqJ8Z-0D4VDaY3yDn99tDLoo8PmdZE0RpHjbg6f3BzoWVg6CgbHfAAfjz_1WlkIXs0JDetpBZtGpHUSR8KSTLkq36kZYamWbXG2KqLXY98kVmckSlK_yuXk_DMyWkYG5_uMFv8YT15ElMIIlm61m9lYchoue_T8_khMbTcGMKTRD11NCy7tfhd3ZY93XNInylIcwbZaTw0lxElyJZ"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-sm mb-6">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface">Extreme Performance Tier</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
              Titan Pro <span className="text-primary">16</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-body mb-12 max-w-xl leading-relaxed">
              Forged for the digital architect. A synthesis of raw computational power and surgical precision, encased in a CNC-milled obsidian chassis.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-1">Architecture</span>
                <span className="text-2xl font-headline font-bold">RTX 4090</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-1">Processing</span>
                <span className="text-2xl font-headline font-bold">i9-14900HX</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-1">Thermal</span>
                <span className="text-2xl font-headline font-bold">Vapor Chamber</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Grid */}
        <section className="py-32 px-8 lg:px-20 bg-surface-container-low" id="specs">
          <div className="mb-24">
            <h2 className="text-4xl font-headline font-bold tracking-tight mb-4">Precision Engineering</h2>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Hardware Artifact Breakdown</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {/* Spec Card 1 */}
            <div className="bg-surface-container-high p-10 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-secondary mb-8 text-3xl">developer_board</span>
              <h3 className="font-headline font-bold text-xl mb-4">Memory Architecture</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">Dual-channel DDR5-5600MHz modules with XMP 3.0 support for aggressive overclocking stability.</p>
              <div className="inline-flex bg-surface-container-highest px-2 py-1 rounded-sm">
                <span className="font-label text-[0.65rem] uppercase text-primary">Up to 64GB DDR5</span>
              </div>
            </div>
            {/* Spec Card 2 */}
            <div className="bg-surface-container-high p-10 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-secondary mb-8 text-3xl">display_settings</span>
              <h3 className="font-headline font-bold text-xl mb-4">Retina-Grade Matrix</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">16-inch Mini-LED display with 1600 nits peak brightness and 100% DCI-P3 color accuracy.</p>
              <div className="inline-flex bg-surface-container-highest px-2 py-1 rounded-sm">
                <span className="font-label text-[0.65rem] uppercase text-primary">240Hz Refresh Rate</span>
              </div>
            </div>
            {/* Spec Card 3 */}
            <div className="bg-surface-container-high p-10 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-secondary mb-8 text-3xl">thermostat</span>
              <h3 className="font-headline font-bold text-xl mb-4">Cryo-Flow Thermal</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">Liquid metal thermal interface and quad-exhaust fans engineered for sustained 175W TGP.</p>
              <div className="inline-flex bg-surface-container-highest px-2 py-1 rounded-sm">
                <span className="font-label text-[0.65rem] uppercase text-primary">Delta-T Optimized</span>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Benchmarks */}
        <section className="py-32 px-8 lg:px-20 bg-surface" id="benchmarks">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-headline font-bold tracking-tight mb-8">Performance Delta</h2>
              <p className="text-on-surface-variant font-body mb-12 max-w-lg leading-relaxed">
                The Titan Pro 16 redefines the upper limits of mobile computing. Benchmarked against the previous generation, we see a 34% uplift in multi-threaded workflows and 22% in rasterization performance.
              </p>
              <div className="space-y-10">
                {/* Benchmark 1 */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface">Cinebench R23 Multi-Core</span>
                    <span className="font-headline font-bold text-primary">32,450 pts</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0066ff] to-[#6001d1]" style={{ width: '95%' }}></div>
                  </div>
                  <div className="mt-2 text-[0.65rem] text-on-surface-variant font-label uppercase">vs. Previous Gen: 24,100 pts</div>
                </div>
                {/* Benchmark 2 */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface">3DMark Time Spy Extreme</span>
                    <span className="font-headline font-bold text-primary">10,890 pts</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0066ff] to-[#6001d1]" style={{ width: '88%' }}></div>
                  </div>
                  <div className="mt-2 text-[0.65rem] text-on-surface-variant font-label uppercase">vs. Industry Average: 7,500 pts</div>
                </div>
              </div>
            </div>
            <div className="relative bg-surface-container-low p-8 rounded-xl" style={{ boxShadow: '0 0 80px 10px rgba(179, 197, 255, 0.1)' }}>
              <img
                className="rounded-lg shadow-2xl"
                alt="Close-up internal shot of high-tech computer cooling system with neon blue liquid pipes and sophisticated motherboard circuits"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG77daDnbmQH18QuDWvu528zlwM80gpdGOIjNsl9lCdnrgc2j5R3gknUlFBMggprisY60UOOwmwFEKsAgeYLQI-E5AlhG7k2uB29gV-HGq-gp5-WzctoD2bZhrzWCEjqsotLm2hhdnYOXS_D9F9Rz9zbYIywXIVMwAPukjDYYf3BImbgLSgLBQkhsbuovq62_nohEr_DpzHAmL73S31uTgQBE62dW2-1HRgJzHHLjwttqbRGeT4ESn7zsXe8htZDV3W--fa6ZWeUmy"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-container p-6 rounded-md shadow-xl">
                <div className="text-3xl font-headline font-black text-on-primary-container leading-none">+34%</div>
                <div className="text-[0.65rem] font-label uppercase tracking-tighter text-on-primary-container/80 mt-1">Raw Throughput Gain</div>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Panel */}
        <section className="py-32 px-8 lg:px-20 bg-surface-container-low" id="configure">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-headline font-bold tracking-tight mb-4">Configure Your Artifact</h2>
              <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Built to your precise specifications</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {/* RAM Selection */}
                <div className="mb-16">
                  <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-6">System Memory (DDR5)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-6 bg-surface-container-highest border-l-4 border-primary text-left transition-all">
                      <div className="font-headline font-bold">32GB (2 x 16GB)</div>
                      <div className="text-xs text-on-surface-variant mt-1">5600MHz • Factory Standard</div>
                    </button>
                    <button className="p-6 bg-surface-container-high hover:bg-surface-container-highest text-left transition-all">
                      <div className="font-headline font-bold">64GB (2 x 32GB)</div>
                      <div className="text-xs text-on-surface-variant mt-1">6000MHz • Overclocked +$249</div>
                    </button>
                  </div>
                </div>
                {/* Storage Selection */}
                <div>
                  <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-6">Storage Volume (NVMe Gen5)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-6 bg-surface-container-high hover:bg-surface-container-highest text-left transition-all">
                      <div className="font-headline font-bold">1TB</div>
                      <div className="text-xs text-on-surface-variant mt-1">Primary Boot</div>
                    </button>
                    <button className="p-6 bg-surface-container-highest border-l-4 border-primary text-left transition-all">
                      <div className="font-headline font-bold">2TB</div>
                      <div className="text-xs text-on-surface-variant mt-1">Power User +$199</div>
                    </button>
                    <button className="p-6 bg-surface-container-high hover:bg-surface-container-highest text-left transition-all">
                      <div className="font-headline font-bold">4TB</div>
                      <div className="text-xs text-on-surface-variant mt-1">Dual RAID 0 +$499</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-highest p-8 h-fit sticky top-24 shadow-2xl">
                <h4 className="font-headline font-bold text-xl mb-8">Summary</h4>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Base Model</span>
                    <span className="font-label">$3,499.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Storage Upgrade</span>
                    <span className="font-label">+$199.00</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-headline font-bold text-primary text-2xl">$3,698.00</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[#0066ff] to-[#6001d1] py-4 rounded-md font-headline font-extrabold text-white scale-95 active:scale-90 transition-transform">
                  Add to Technical Build
                </button>
                <p className="text-[0.6rem] text-center text-on-surface-variant mt-6 uppercase font-label tracking-widest">Ships in 4-6 Business Days</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#0c0c1f] border-t border-[#333348]/15 flex flex-col items-center gap-4 w-full">
        <div className="font-['Manrope'] font-black text-[#e2e0fc] text-xl">SpecNest</div>
        <div className="flex gap-8">
          <a className="font-['Inter'] text-xs text-[#e2e0fc]/40 hover:text-[#b3c5ff] transition-colors" href="#">Privacy Policy</a>
          <a className="font-['Inter'] text-xs text-[#e2e0fc]/40 hover:text-[#b3c5ff] transition-colors" href="#">Technical Support</a>
          <a className="font-['Inter'] text-xs text-[#e2e0fc]/40 hover:text-[#b3c5ff] transition-colors" href="#">Global Shipping</a>
          <a className="font-['Inter'] text-xs text-[#e2e0fc]/40 hover:text-[#b3c5ff] transition-colors" href="#">Press Kit</a>
        </div>
        <div className="font-['Inter'] text-xs text-[#e2e0fc]/40 mt-4">
          © 2024 SpecNest Precision Editorial. All hardware artifacts rendered in high-fidelity.
        </div>
      </footer>
    </>
  );
}