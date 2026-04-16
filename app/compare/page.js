import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-40 px-8 max-w-[1600px] mx-auto">
        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-label text-xs tracking-widest text-primary uppercase">Precision Engine</span>
            <div className="h-px flex-grow bg-surface-container-high"></div>
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">Hardware Benchmarking</h1>
          <p className="text-on-surface-variant mt-4 max-w-2xl text-lg font-light leading-relaxed">
            Analyze the structural integrity and performance metrics of the world's most capable mobile workstations side-by-side.
          </p>
        </header>
        {/* Comparison Table Container */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="grid grid-cols-4 min-w-[1200px]">
            {/* Label Column */}
            <div className="flex flex-col">
              <div className="h-96 flex items-end pb-8 border-b border-outline-variant/15">
                <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60">Metric Matrix</span>
              </div>
              {/* Rows */}
              <div className="space-y-0 text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
                <div className="h-20 flex items-center bg-surface-container-low px-4">Brand</div>
                <div className="h-20 flex items-center px-4">Processor</div>
                <div className="h-20 flex items-center bg-surface-container-low px-4">RAM</div>
                <div className="h-20 flex items-center px-4">Storage</div>
                <div className="h-20 flex items-center bg-surface-container-low px-4">Graphics Card</div>
                <div className="h-20 flex items-center px-4">Screen Size</div>
                <div className="h-20 flex items-center bg-surface-container-low px-4">Resolution</div>
                <div className="h-20 flex items-center px-4">Weight</div>
                <div className="h-24 flex items-center px-4"></div>
              </div>
            </div>
            {/* Product 1: Titan SCAR-18 Pro */}
            <div className="flex flex-col group border-l border-outline-variant/10">
              <div className="h-96 p-6 relative flex flex-col justify-between border-b border-outline-variant/15">
                <button className="self-end p-2 bg-surface-container-highest/50 hover:bg-error-container hover:text-white rounded-md transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container-low">
                  <img
                    alt="titan scar laptop"
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb5qFc6143Sk9UnPtw_otS2PknMLbokMAa26jjQbJTwaEunGrqmcveMFKRQrUxuCYMf-CpPXn4Y_FPaFV2bRvM-DgOEXfeTLXZ07DYUEUWECavynmYli1vOHULAWNQgEKhR1TMQG4WNwwnexTXqy5UfojzXAc3T8YkQw2ncF6pumNRWD2NibFm4CI4UXZg5c2PZPRriNOojyR_wTZagxzXAPebCqFsPwWIK1WKKUCykd26EXZWczVYxMXiGANTdoSTkneFukuTKXe2"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Titan SCAR-18 Pro</h3>
                  <p className="text-primary font-label text-sm mt-1">$3,899.00</p>
                </div>
              </div>
              <div className="space-y-0 text-on-surface font-body text-sm">
                <div className="h-20 flex items-center bg-surface-container-low px-6">TITAN ARCHITECT</div>
                <div className="h-20 flex items-center px-6">Intel® Core™ i9-14900HX</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6 font-semibold">64GB DDR5 5600MHz</div>
                <div className="h-20 flex items-center px-6">4TB NVMe Gen5 RAID 0</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6">
                  <span className="bg-surface-container-highest px-3 py-1 rounded-sm font-label text-[10px] tracking-widest text-secondary">RTX 4090 175W</span>
                </div>
                <div className="h-20 flex items-center px-6">18" Nebula HDR Display</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6">2560 x 1600 (240Hz)</div>
                <div className="h-20 flex items-center px-6">3.10 kg</div>
                <div className="h-24 flex items-center px-6">
                  <button className="w-full py-3 bg-gradient-to-br from-primary-container to-secondary-container rounded-md font-headline font-bold text-sm tracking-tight text-white hover:brightness-110 transition-all scale-95 active:scale-90">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            {/* Product 2: Blade Phantom 14 */}
            <div className="flex flex-col group border-l border-outline-variant/10 bg-surface-container/30">
              <div className="h-96 p-6 relative flex flex-col justify-between border-b border-outline-variant/15">
                <button className="self-end p-2 bg-surface-container-highest/50 hover:bg-error-container hover:text-white rounded-md transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container-low">
                  <img
                    alt="phantom laptop"
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQP63bvgLNrZwysrhAabzNQb9OOcc1FW-9mCISvJ8BGz0UtJIlJc9pWRDOsjSDSkRLk1jGY5wCGb2OcjszYTPVyQhMcj32u5cXCIWzwXNj4ghhcMqHcFrPnhvAcjdDsBYQM6LOcHhy24Q2iolVS-ndqs1Kau_BUMjG2CTKFsaq4ku1xewq9FLzLj07bi-A_dnPU4-sZVQS1HqHwkF_VcIo2guuErf8KvSqOWDW3-aCvwHFgXMqflRDYxJZK7ckxs9A3PzPLlCGylg0"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Blade Phantom 14</h3>
                  <p className="text-primary font-label text-sm mt-1">$2,499.00</p>
                </div>
              </div>
              <div className="space-y-0 text-on-surface font-body text-sm">
                <div className="h-20 flex items-center bg-surface-container/50 px-6">PHANTOM LABS</div>
                <div className="h-20 flex items-center px-6">AMD Ryzen™ 9 8945HS</div>
                <div className="h-20 flex items-center bg-surface-container/50 px-6 font-semibold">32GB LPDDR5x</div>
                <div className="h-20 flex items-center px-6">1TB PCIe 4.0 SSD</div>
                <div className="h-20 flex items-center bg-surface-container/50 px-6">
                  <span className="bg-surface-container-highest px-3 py-1 rounded-sm font-label text-[10px] tracking-widest text-secondary">RTX 4070 95W</span>
                </div>
                <div className="h-20 flex items-center px-6">14" OLED Touch</div>
                <div className="h-20 flex items-center bg-surface-container/50 px-6">2880 x 1800 (120Hz)</div>
                <div className="h-20 flex items-center px-6">1.48 kg</div>
                <div className="h-24 flex items-center px-6">
                  <button className="w-full py-3 bg-gradient-to-br from-primary-container to-secondary-container rounded-md font-headline font-bold text-sm tracking-tight text-white hover:brightness-110 transition-all scale-95 active:scale-90">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            {/* Product 3: Vector Studio X */}
            <div className="flex flex-col group border-l border-outline-variant/10">
              <div className="h-96 p-6 relative flex flex-col justify-between border-b border-outline-variant/15">
                <button className="self-end p-2 bg-surface-container-highest/50 hover:bg-error-container hover:text-white rounded-md transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container-low">
                  <img
                    alt="vector studio laptop"
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPEB1_dmR-v1va112raGmHjXaDog-erVweIRYMGPGC8dn8WsVLj2e3E90gpYJNhxnHhI0Q7rfOK5_ARRO_llPWK-_4KuOnL6AXKHSApUDmpc0iGOZeREWHXNnhLRiz_oYzVcyvtTBVBKm2ZukfBUyDRAukRCh69M6WZVtSVig0RSZfsncSUoQdCl1cVTsowwmzLnJQZadsYp1xUG0zc3GIxvZRRmZuND37bZnQJCxFqw29N0F3-cnV9JzQJ7_J9cRS7x4xmGEa5RbU"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Vector Studio X</h3>
                  <p className="text-primary font-label text-sm mt-1">$3,199.00</p>
                </div>
              </div>
              <div className="space-y-0 text-on-surface font-body text-sm">
                <div className="h-20 flex items-center bg-surface-container-low px-6">VECTOR PRECISION</div>
                <div className="h-20 flex items-center px-6">Intel® Core™ i7-14700HX</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6 font-semibold">64GB DDR5 5200MHz</div>
                <div className="h-20 flex items-center px-6">2TB NVMe Gen4</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6">
                  <span className="bg-surface-container-highest px-3 py-1 rounded-sm font-label text-[10px] tracking-widest text-secondary">RTX 4080 150W</span>
                </div>
                <div className="h-20 flex items-center px-6">16" IPS TrueColor</div>
                <div className="h-20 flex items-center bg-surface-container-low px-6">2560 x 1600 (165Hz)</div>
                <div className="h-20 flex items-center px-6">2.35 kg</div>
                <div className="h-24 flex items-center px-6">
                  <button className="w-full py-3 bg-gradient-to-br from-primary-container to-secondary-container rounded-md font-headline font-bold text-sm tracking-tight text-white hover:brightness-110 transition-all scale-95 active:scale-90">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Comparison Tray */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-6 py-4 bg-[#1a1a2e]/80 backdrop-blur-md border-t border-[#b3c5ff]/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] font-label uppercase text-[10px] tracking-widest">
        <button className="flex flex-col md:flex-row items-center gap-2 bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-white rounded-md px-4 py-2 transition-transform duration-200 ease-in-out">
          <span className="material-symbols-outlined">compare_arrows</span>
          <span>Compare</span>
        </button>
        <button className="flex flex-col md:flex-row items-center gap-2 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] px-4 py-2 rounded-md transition-all">
          <span className="material-symbols-outlined">delete_sweep</span>
          <span>Clear All</span>
        </button>
        <button className="flex flex-col md:flex-row items-center gap-2 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] px-4 py-2 rounded-md transition-all">
          <span className="material-symbols-outlined">memory</span>
          <span>GPU Specs</span>
        </button>
        <button className="flex flex-col md:flex-row items-center gap-2 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] px-4 py-2 rounded-md transition-all">
          <span className="material-symbols-outlined">processing_cluster</span>
          <span>CPU Specs</span>
        </button>
      </div>
      <Footer />
    </>
  );
}