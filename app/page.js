import Header from './components/Header';

export default function HomePage() {
  return (
    <>
      <Header activePage="home" />

      <main className="pt-24">
        <section className="relative h-[921px] overflow-hidden flex items-center px-8 md:px-20 bg-surface-container-lowest">
          <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
          <img
            className="w-full h-full object-cover object-center opacity-60"
            alt="high-end gaming laptop with neon purple and blue backlighting on a sleek dark desk with abstract geometric shadows"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ01FrT5UMzxq9zGg5VlVfq6TgchOZbvZRQ6iUm6pnY8-dfhfTMz5SRKi2PNtb2cFySGvsCpLSCSdGyvFHsRf1_Fy00egNfQuGMQYX4NXfGfjhf7nijLkA29cjsY_zQy4ImRAv-cJwF1_3zaY9aPZOfH_rR0PPTNxfeZ0fnUvtSkqVURY3eU1FZGOxj83REj-FNWVqyIXfGEimeJD1gK2PzvvFONYqnG0rH_pndMXWrteX_FNn7mgWOh0pwxs-3lqauuxJXV2YX_mx"
          />
        </div>
        <div className="relative z-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary-container text-on-secondary-container mb-6">
            <span className="font-label text-[10px] uppercase tracking-widest font-bold">New Release</span>
            <div className="w-1 h-1 rounded-full bg-on-secondary-container" />
            <span className="font-label text-[10px] uppercase tracking-widest font-bold">2024 Edition</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
            UNLEASH THE <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">ARCHITECT</span> WITHIN.
          </h1>
          <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Precision-engineered hardware curated for those who build the future. Experience zero latency and peak thermal performance.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-br from-primary-container to-secondary-container text-white px-8 py-4 rounded-md font-headline font-bold text-sm tracking-tight transition-transform duration-200 active:scale-95 shadow-lg shadow-primary-container/20">
              CONFIGURE YOUR RIG
            </button>
            <button className="bg-transparent border border-outline-variant/30 text-on-surface px-8 py-4 rounded-md font-headline font-bold text-sm tracking-tight hover:bg-surface-container-high transition-colors active:scale-95">
              EXPLORE SPECS
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-20 bg-surface-container-low">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-high cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
              alt="ultra thin modern workspace with a high-end metal laptop and blue ambient lighting on the edges"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTI0W_ESpC2nGMDNggu3J8d0zn87bTHbYhZ32PYdSEQeQArwaBry8ErVK19FJv5DQ4NQ0Qc9z4YRwAkIEvdqiIrvnbVExGulgRIjT1q6H3XjMDxJaSyaqBAustF5vzuxfCUOo8NkmMf-OzuhGDQXyM2YnjSRSnxo0V951VWWxIaQnEjctewR2T3zRZYFcC_ukAfRP9VkMf0cy4K6hKDYks7r1j1QU4-kL9NJyITB2zUwS4-abxun_ArNz36gSIVyh8yu5z28Fzkq7L"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline text-3xl font-black text-[#e2e0fc] mb-2 tracking-tighter">LAPTOPS</h3>
              <p className="font-label text-xs tracking-widest text-primary uppercase">Mobile Powerhouses</p>
            </div>
          </div>
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-high cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
              alt="inside of a custom water cooled pc with glowing purple liquid and vibrant rgb components"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWE9qyd3LtgEkbbfrsb6JGYyudD_yOz1tbABnQv6tSI6VxD-eh_mjo62Qn00MmY8UX1WSHWa1MtMDFX3XwGLAHBts5--OoKHBsxpiMuAwaAbH8Pq60zuEbu6cACxgAUblCIgBlevToJYBfANviL25CS-kgvMJUR0fuIkixl1_Pi8PHkO1gH40JOBGFPVkeuPybQ469zCU5A1ook3-GoT61H9sRsaqihkW_0W9uxYF4f553lyp1z2wqoSKlU9v-a-ucRljzUxK3GVih"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline text-3xl font-black text-[#e2e0fc] mb-2 tracking-tighter">CUSTOM DESKTOPS</h3>
              <p className="font-label text-xs tracking-widest text-secondary uppercase">Precision Built</p>
            </div>
          </div>
          <div className="md:col-span-12 group relative overflow-hidden rounded-xl bg-surface-container-high cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/5">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40"
              alt="cinematic close up of high end graphics card circuitry with glowing status lights and brushed metal finish"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Ve37lXplMsZHA94VGbN1MdasbdAsYQ_OzZdPwVYQ7MzreTeUF1GoIjg0fnOVRol-0WGOHvWL-T6JvreWqm3f8FF_ZYJ_ffjkURAAWD17buqj-b3_5tkuFt43fx8w4So5U7kXa21bcGV6KIQmf4Xf-vPkC73pDwWorQcoT7cBnDi9Vl2QJIeun2yUFtfIsibM3tX-L3-a8vh_PtCB6__qIKhQukvfGhNehlTdR2dAHq4WnHy61t-fhm6s0qoD47oINsDIj_7OECwB"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-8 flex flex-col justify-center max-w-md">
              <h3 className="font-headline text-4xl font-black text-[#e2e0fc] mb-4 tracking-tighter leading-none">GRAPHICS CARDS</h3>
              <p className="font-body text-on-surface-variant mb-6">Experience realism redefined with our selection of next-gen GPUs.</p>
              <span className="inline-flex items-center text-primary font-label text-xs tracking-[0.2em] uppercase font-bold">
                Browse Inventory <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-20 bg-surface">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="font-label text-secondary text-xs tracking-[0.3em] uppercase mb-4">The Selection</p>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">LATEST ARRIVALS</h2>
          </div>
          <a className="hidden md:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-xs tracking-widest uppercase" href="#">
            View All Collections <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden bg-surface-container-high">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="top view of a professional high performance laptop on dark surface showing slim design"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9WnNftwDOqKhZUSmp3l60mfbHOnBPTUquw1DowEX4CSSXQxvdi4KKrw9doFG-esNJM6c9tmLT7p01S7h7wa0SePvJN7Tlu1t5q2CSacAFVGja892me0AKznpp1oEBNQnquOxfx1TiPeBE7u2EOlKF6z0C6mzzoaSOie06TxqNE4WAHiraRYFxTqVUITIhCLV2mNREjQz7p9mR8yRow7SZGvx98Zs_exrWG4klChOpUvlGIg1aiv9xbzjhVs_cGS-jgvuSaCccLT04"
              />
              <div className="absolute top-4 left-4 bg-primary-container text-white px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider">In Stock</div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-headline text-xl font-bold text-on-surface leading-tight">Apex-15 Pro</h4>
                <span className="text-primary font-label font-bold">$2,499</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">i9-14900HX</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">RTX 4080</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">32GB DDR5</span>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label text-xs text-on-surface">4.9</span>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">add_shopping_cart</button>
              </div>
            </div>
          </div>
          <div className="group bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden bg-surface-container-high">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="gaming peripheral with sharp lines and blue backlighting on a matte black background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClSy2u2T1uZ1F8yABNPCUIFjgrDNQNG6Vcj3mfNflXOjw5HlSnBYx8DEjS6Ev8xUxIOVOvH0R36DuTanyiahEgQYb7xcSUOOAzq6TSpk6eQIkx1003ncqQMTkBVch4HJWovW9TfovFwmkkneNzrMHIxifY4dFX5Q9iYjkiqplQmJls4BjpC6GoMkvifTwWSJ-cRcn7WWhYaQSWS5_7CYPINaBzEj4RvDHjoitNc1rLMECq4r3r_dqntrpGVoRrabtu7Pz6Dy6ScG7P"
              />
              <div className="absolute top-4 left-4 bg-secondary-container text-white px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider">Trending</div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-headline text-xl font-bold text-on-surface leading-tight">Vortex S7 Desktop</h4>
                <span className="text-primary font-label font-bold">$3,150</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">R9 7950X3D</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">RTX 4090</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">64GB RAM</span>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label text-xs text-on-surface">5.0</span>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">add_shopping_cart</button>
              </div>
            </div>
          </div>
          <div className="group bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden bg-surface-container-high">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="futuristic desktop setup with blue and purple glowing fans and liquid cooling pipes"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbNdE0zUBzXJcarfMD3DjaLjwSBJy127d1la83Zw979--Uo6dKY-QSUi7Z87iQtVHcwyrCVbmdWBR3mA0FvSyJXmcwDOjyfSFNszT6MtOYOgqOe6HfW8Mm7LNiPZZUdZTYwGMMF8zBuG204alJPp-_bdiTW8PpQIvZxgu-kUapb252Ij6nSaV5nk3qJ5GdV3lH8XpQ5oFwgGjYTaaSKoAAjG9XPrQH-mOGrjLsx2DOiOze6JzuBrjxNeVNbG8pC8VGGDua6NEvFWoE"
              />
              <div className="absolute top-4 left-4 bg-tertiary-container text-white px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider">Last Few</div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-headline text-xl font-bold text-on-surface leading-tight">Ghost-X Slim</h4>
                <span className="text-primary font-label font-bold">$1,899</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">i7-13700H</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">RTX 4070</span>
                <span className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">16GB DDR5</span>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label text-xs text-on-surface">4.8</span>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">add_shopping_cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-20 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter mb-4 text-on-surface">THE SPECNEST EDGE</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8 rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-xl shadow-black/20">
              <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">PERFORMANCE</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">Every unit is stress-tested to ensure sustained peak throughput under maximum thermal load.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-xl border border-outline-variant/10 hover:border-secondary/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-xl shadow-black/20">
              <span className="material-symbols-outlined text-3xl text-secondary">visibility</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">CLARITY</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">No hidden specs. Transparent component sourcing and bench-marking data for every hardware tier.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-xl border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-xl shadow-black/20">
              <span className="material-symbols-outlined text-3xl text-tertiary">architecture</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">PRECISION</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">Custom internal cable management and thermal paste application as standard editorial quality.</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 border border-outline-variant/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[100px] -z-10" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight text-on-surface mb-6">NEVER MISS A <span className="text-primary">SPEC DROP</span>.</h2>
            <p className="font-body text-on-surface-variant text-lg">Join 50k+ tech enthusiasts receiving weekly hardware insights and exclusive early-access deals.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input className="bg-surface-container-lowest border border-outline-variant/20 rounded-md px-6 py-4 focus:ring-primary focus:border-primary text-on-surface min-w-[300px]" placeholder="Your engineering email" type="email" />
            <button className="bg-primary-container text-white px-8 py-4 rounded-md font-headline font-bold text-sm tracking-tight transition-all active:scale-95">SUBSCRIBE</button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-6 py-4 bg-[#1a1a2e]/80 backdrop-blur-md border-t border-[#b3c5ff]/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] md:hidden">
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[#d2bbff]">compare_arrows</span>
          <span className="font-label uppercase text-[10px] tracking-widest text-[#e2e0fc]">Compare</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[#d2bbff]">delete_sweep</span>
          <span className="font-label uppercase text-[10px] tracking-widest text-[#e2e0fc]">Clear All</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-white rounded-md px-4 py-2 transition-transform duration-200">
          <span className="material-symbols-outlined">memory</span>
          <span className="font-label uppercase text-[10px] tracking-widest">GPU Specs</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[#d2bbff]">processing_cluster</span>
          <span className="font-label uppercase text-[10px] tracking-widest text-[#e2e0fc]">CPU Specs</span>
        </div>
      </div>

      <footer className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 px-12 py-20 bg-[#0c0c1f] font-inter text-xs leading-relaxed">
        <div>
          <div className="text-lg font-black text-[#e2e0fc] mb-4">SpecNest</div>
          <p className="text-[#e2e0fc]/50 mb-6 max-w-[200px]">The definitive editorial source for precision-grade computer hardware.</p>
          <p className="text-[#e2e0fc]/50">© 2024 SPECNEST PRECISION TECH EDITORIAL</p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-[#b3c5ff] font-label font-bold uppercase tracking-widest mb-2">Shop</h5>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Workstations</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Displays</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Accessories</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Refurbished</a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-[#b3c5ff] font-label font-bold uppercase tracking-widest mb-2">Support</h5>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Manuals</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Driver Vault</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Order Status</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Warranty</a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-[#b3c5ff] font-label font-bold uppercase tracking-widest mb-2">Social</h5>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Discord</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5c5ff] hover:translate-x-1 transition-transform" href="#">Twitter</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Twitch</a>
          <a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform" href="#">Instagram</a>
        </div>
      </footer>
    </main>
    </>
  );
}
