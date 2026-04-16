import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ComponentLibrary() {
  return (
    <div className="min-h-screen bg-background">
      <Header activePage="components" />

      <main className="pt-20 flex min-h-screen blueprint-grid">
        <aside className="h-screen w-72 sticky top-20 left-0 bg-surface-container-low flex flex-col p-6 space-y-8 overflow-y-auto shrink-0 hidden lg:flex">
          <div className="space-y-1">
            <h3 className="font-label uppercase text-[10px] tracking-widest text-primary">Technical Filter</h3>
            <p className="text-[10px] text-on-surface-variant font-label tracking-widest">Precision Architect v2.1</p>
          </div>

          <div className="space-y-6">
            <section>
              <label className="font-label uppercase text-[10px] tracking-widest text-on-surface-variant mb-3 block">Socket Type</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-br from-primary-container to-secondary-container text-white cursor-pointer active:scale-[0.98] duration-200">
                  <span className="font-label text-[10px] uppercase tracking-widest">LGA 1700</span>
                  <span className="material-symbols-outlined text-xs">speed</span>
                </div>
                <div className="flex items-center justify-between p-2 text-on-surface-variant/80 hover:bg-surface-container-high transition-colors cursor-pointer rounded-md">
                  <span className="font-label text-[10px] uppercase tracking-widest">AM5</span>
                  <span className="material-symbols-outlined text-xs">memory</span>
                </div>
              </div>
            </section>

            <section>
              <label className="font-label uppercase text-[10px] tracking-widest text-on-surface-variant mb-3 block">Performance Parameters</label>
              <div className="space-y-2">
                <div className="group flex items-center justify-between p-2 text-on-surface-variant/80 hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer rounded-md">
                  <span className="font-label text-[10px] uppercase tracking-widest">VRAM Capacity</span>
                  <span className="material-symbols-outlined text-xs">bolt</span>
                </div>
                <div className="group flex items-center justify-between p-2 text-on-surface-variant/80 hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer rounded-md">
                  <span className="font-label text-[10px] uppercase tracking-widest">Thermal Design Power</span>
                  <span className="material-symbols-outlined text-xs">thermostat</span>
                </div>
                <div className="group flex items-center justify-between p-2 text-on-surface-variant/80 hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer rounded-md">
                  <span className="font-label text-[10px] uppercase tracking-widest">Bus Interface</span>
                  <span className="material-symbols-outlined text-xs">settings_input_component</span>
                </div>
              </div>
            </section>
          </div>

          <button className="mt-auto py-3 bg-surface-container-high text-primary font-label uppercase text-[10px] tracking-widest hover:bg-surface-container-highest transition-all duration-300 rounded-sm">
            Reset Parameters
          </button>
        </aside>

        <div className="flex-1 p-8 md:p-12">
          <nav className="flex items-center space-x-2 text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-12">
            <a className="hover:text-primary transition-colors" href="#">Home</a>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <a className="hover:text-primary transition-colors" href="#">Components</a>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Graphics Cards</span>
          </nav>

          <header className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-4">
              Hardware Components
            </h1>
            <div className="flex items-center space-x-4">
              <div className="h-[1px] w-12 bg-primary"></div>
              <p className="font-label text-sm uppercase tracking-[0.2em] text-primary">Precision Performance Architecture</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <article className="bg-surface-container-high group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-xl">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  alt="Close-up photograph of a high-end NVIDIA graphics card showing the metal heatsink fins and sleek black housing in dramatic tech lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcQ0xuZDc5jK1V39VbF_hAQSJI0T0ohRdE7BusyrxIMmb9r5TY_nVNpg17w17Ls6CKVNf7EvdZntH7AAt9kYH_Q3qdpyc4STZ4pYT92nll1LhCtSb1AlUBNXHY0lT_NbmoOtDmtQ_-_yS2XgINFJDGRwb-WrGG8zP_w_7vLn_KSz_MHo2VUM5b2wIa1v8Vo6JIqnR5bdwwCGCZpk3Y6McEsGnJ7lKy9Ol5_jlDSGN4WcLlI3LOtEk_6nEeyHvHpUTauKTUcSGE68Zm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-surface-container-highest text-primary font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">16GB GDDR6X</span>
                  <span className="bg-primary-container text-white font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">DLSS 3.5</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-on-surface">NVIDIA RTX 4080 Super</h2>
                  <p className="text-on-surface-variant text-sm mt-2">Founders Edition Architecture</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">Base Clock</p>
                    <p className="text-primary font-label text-lg">2,295 MHz</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">Performance</p>
                    <p className="text-tertiary font-label text-lg">+14% Gen-v-Gen</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-primary-container to-secondary-container py-3 rounded-md font-headline font-bold text-sm tracking-tight text-white active:scale-95 transition-transform">
                  Add to Build
                </button>
              </div>
            </article>

            <article className="bg-surface-container-high group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-xl">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  alt="Macro photo of a computer processor chip showing the golden pin array on a dark textured background with industrial precision"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjdw0kgiwcgpXVgLSjfIl_3rWf_ulzFChBYtsJJf-lTz038SmFik9SGcDVJKHQB-FA7Ak0u3WoFx-uQ8N8_esrzRdV56RR_iJI3NhViSB-_0VHrxjVXYj_Ppek3v884DfxfooYszCB9GH3WOGItsOWrQ-lEvgTWzYzLXJaCdoX-v8PyfKD2bZvORpho2He1qdPJosBj0Y9ZBq_1-YxYKSzoNYYvCAeLa9Q4EhGvLJqrsnCb5V3Mdh0-ScXwQPkx2vA493KGqlnMMJw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-surface-container-highest text-primary font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">6.0 GHz Boost</span>
                  <span className="bg-secondary-container text-white font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">24 Cores</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-on-surface">Intel Core i9-14900K</h2>
                  <p className="text-on-surface-variant text-sm mt-2">Raptor Lake Refresh</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">L3 Cache</p>
                    <p className="text-primary font-label text-lg">36 MB</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">TDP</p>
                    <p className="text-tertiary font-label text-lg">125W - 253W</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-primary-container to-secondary-container py-3 rounded-md font-headline font-bold text-sm tracking-tight text-white active:scale-95 transition-transform">
                  Add to Build
                </button>
              </div>
            </article>

            <article className="bg-surface-container-high group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-xl">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  alt="Close-up of computer RAM modules with RGB lighting glowing in vibrant blue and purple neon on a circuit board"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZJMmbDhIgpeWCjDKLVKZOlep3p9Kc63cYPMRWuTUOV1wqONG6b3ONanLVuU8DXuAVUCJGPneuwRtjxBH3hHvFPZUwKM9Q770KaxBM57Ls2CyYTEVJMqoWsSm_bLoUG0PMrF5Hlh0vQMrkjqwpsoTBeq3MxDO516rjPSwXw9flYFPWKc_JGzdkraKIUxIELPJudYkpANz-VM95iWyAZv6tCIOpl8DjNwgn9bwnuLN--KZD-39wdf_6uXSvzz-KsgdX7tWvQ6INX_cb"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-surface-container-highest text-primary font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">7200 MT/s</span>
                  <span className="bg-tertiary-container text-white font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">XMP 3.0</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-on-surface">Dominator DDR5 64GB</h2>
                  <p className="text-on-surface-variant text-sm mt-2">Precision Memory Module</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">Latency</p>
                    <p className="text-primary font-label text-lg">CL34-45-45</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">Capacity</p>
                    <p className="text-tertiary font-label text-lg">2 x 32GB</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-primary-container to-secondary-container py-3 rounded-md font-headline font-bold text-sm tracking-tight text-white active:scale-95 transition-transform">
                  Add to Build
                </button>
              </div>
            </article>

            <article className="bg-surface-container-high group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-xl">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  alt="Detailed view of a motherboard's silicon paths and electrical components in a cool blue and silver metallic palette"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuMCKq4spuLHEpEj7oecr2F3eUAGES9_WkvrPHyLw_63Ah3W5B2A-oVpBqcwgQrPpbchczJwQfVLV7S3DDcRyBl2CODSPc16z5pYNgix1NnRvx7MsgNYDwxEnlc_ZDWDWx3igaXqUwEg0E9uZigKP1RkUHp9ZCvosTdiUpMB9ttXNJql7MyV16kHPAady93-P6R8rzamIoESTCi22kTEFI5uviD_g_Nuj0E7wrD4aIuMNpC59GF24Ye2t2-jJPCdalBSn6Nw8SAzVW"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-surface-container-highest text-primary font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">PCIe 5.0</span>
                  <span className="bg-primary-container text-white font-label text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">24 Phase VRM</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-on-surface">ROG Maximus Z790</h2>
                  <p className="text-on-surface-variant text-sm mt-2">Extreme Power Delivery</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">I/O Ports</p>
                    <p className="text-primary font-label text-lg">12x USB 3.2</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-label uppercase text-outline tracking-widest">M.2 Slots</p>
                    <p className="text-tertiary font-label text-lg">5x NVMe Gen5</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-primary-container to-secondary-container py-3 rounded-md font-headline font-bold text-sm tracking-tight text-white active:scale-95 transition-transform">
                  Add to Build
                </button>
              </div>
            </article>
          </div>

          <section className="mt-20 mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-label text-sm uppercase tracking-[0.2em] text-primary">04. Layout &amp; Spacing</h2>
              <div className="flex-1 h-[1px] bg-surface-container-highest"></div>
            </div>
            <div className="grid grid-cols-12 gap-6 h-96 bg-surface-container-low p-6 rounded-xl border border-dashed border-outline-variant/30">
              <div className="col-span-1 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-[10px]">1</div>
              <div className="col-span-1 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-[10px]">2</div>
              <div className="col-span-4 bg-primary/20 border border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <span className="block font-headline font-bold text-xl uppercase">Fluid Column</span>
                  <span className="font-mono text-[10px] text-on-surface-variant">Span: 4</span>
                </div>
              </div>
              <div className="col-span-6 flex flex-col gap-4">
                <div className="h-1/2 bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <span className="font-label text-xs uppercase tracking-widest text-secondary">Vertical Spacing Rule: 24px</span>
                </div>
                <div className="h-1/2 flex gap-4">
                  <div className="flex-1 bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-tertiary">Nested A</span>
                  </div>
                  <div className="flex-1 bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-tertiary">Nested B</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-8 text-on-surface-variant font-body text-sm max-w-3xl leading-relaxed">
              The grid system follows a 12-column liquid architecture with fixed 24px gutters. Content hierarchy is maintained through 8px incremental spacing (Base 8). Sections are separated by exactly 128px of vertical whitespace to enforce a premium editorial feel.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
