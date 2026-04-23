import ComparisonTray from '../components/ComparisonTray';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function CatalogPage() {
  return (
    <>
      <Header activePage="laptops" />
      <main className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-label text-xs uppercase tracking-widest text-primary">Refine Specs</h2>
            <button className="text-[10px] uppercase font-label text-on-surface-variant hover:text-primary transition-colors">Reset All</button>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Price Range</label>
            <div className="h-1 bg-surface-container-highest rounded-full relative">
              <div className="absolute left-1/4 right-1/4 h-full bg-primary-container"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
            </div>
            <div className="flex justify-between font-label text-[10px] text-on-surface-variant">
              <span>$500</span>
              <span>$4500</span>
            </div>
          </div>

          {/* Brand Selection */}
          <div className="space-y-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Brand</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-[12px] text-primary opacity-100" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">ASUS ROG</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">Razer Blade</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">MSI Stealth</span>
              </label>
            </div>
          </div>

          {/* CPU Type */}
          <div className="space-y-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Architecture</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-primary-container text-on-primary-container font-label text-[10px] py-2 rounded-sm tracking-widest uppercase">Intel Core</button>
              <button className="bg-surface-container-highest text-on-surface-variant font-label text-[10px] py-2 rounded-sm tracking-widest uppercase hover:bg-surface-bright transition-colors">AMD Ryzen</button>
            </div>
          </div>

          {/* RAM & Storage */}
          <div className="space-y-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Capacity</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded-sm font-label text-[10px] text-on-surface-variant hover:border-primary transition-all">16GB</button>
              <button className="px-3 py-1 bg-surface-container-highest border border-primary/40 rounded-sm font-label text-[10px] text-primary tracking-widest">32GB+</button>
              <button className="px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded-sm font-label text-[10px] text-on-surface-variant hover:border-primary transition-all">1TB NVMe</button>
              <button className="px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded-sm font-label text-[10px] text-on-surface-variant hover:border-primary transition-all">2TB+ SSD</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Product Grid */}
      <section className="flex-1 space-y-8">
        {/* Grid Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">Precision Laptops</h1>
            <p className="text-on-surface-variant text-sm font-body">Found 42 flagship machines matching your profile</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Sort By:</span>
            <select className="bg-surface-container-low border-none text-primary font-label text-[10px] uppercase tracking-widest focus:ring-0 cursor-pointer">
              <option>Performance Score</option>
              <option>Featured</option>
              <option>Price (Low-High)</option>
            </select>
          </div>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="ultra-thin premium gaming laptop with glowing blue keyboard lighting on dark desk background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlimzS7zV8UOqNTEu9Bc0d-joKLh5uEPwCyPxz6vCaygKQPdEryRvB1dguOwijx2xx14UxPq85U4YDsLyqMdjregZHIUJqNZ3Wu4C22gphJtgly1l-t5z40zJQs6GrMAk4fno9NjVnCeiSALCTMrFWHrc655pm7jF72rJbt0ixrUy4EtX9NXfOPdzMIOva_BAORwKg6fXusQNgNF92V5ICIw3kRXOI0GZK4D_pVFvFIwPPMsgKlTlxJxWawYdwg-P5mAmcO45LutJn"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-primary-container text-on-primary-container text-[10px] font-label font-bold px-2 py-1 uppercase tracking-widest rounded-sm">Elite Performance</span>
              </div>
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">Titan SCAR-18 Pro</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Next-gen architecture with liquid metal cooling and Nebula HDR display.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX 4090</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">i9-14900HX</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">64GB DDR5</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">Base Spec</span>
                  <span className="text-lg font-bold font-headline text-primary">$3,499.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>

          {/* Product Card 2 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="sleek professional workstation laptop with minimalist design on dark wooden texture table"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkq_yDepZhpDOaLGISsvKIsEswz4F6GNl0Hw8_Lw6GmwqDYzmnmbrVxJx6fGQswFaQfSABeFMkTLFcuvpH6rhlnKNiA6M-vHu34IHoKQMyI2kYCxqOKtXKDqzVnioDhVJcE18AHBo4R2taAcJxvL9LmWS4-zEa8xcsdKeBunYU8BS1JYuaRd7CLs1jxFm1_TpRvU0Z2cxYgVWqbzs5W8JX8VEwegG1SduJADHgfKsKFYLf8e-N7MjiOgeccx-HYhPzHfxq_aEmtUvt"
              />
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">Blade Phantom 14</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Ultra-portable powerhouse crafted from aerospace-grade aluminum.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX 4070</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">Ryzen 9</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">32GB LPX</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">In Stock</span>
                  <span className="text-lg font-bold font-headline text-primary">$2,199.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>

          {/* Product Card 3 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="close-up of a high-resolution laptop screen showing technical code and 3d renders in a dark environment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP6MGvAY9DE-rK58pG1CC411wbviTXCY9bxb7smIXcrsGMGA0PCIDaxPwM7EdwkPqJWk1-X63tMrKwZg3sGYiIUviDzIMV5epRHG77VClzMpOnHSCp-rJg0_5fEhI-etyvNiJX85rLJCN_rif1qrlHOppPTYf_Z5ud7Mod9pLVrV9L085Vxs_7BLdpiH7d0VyMkcqCDbZ1WX2pdXGsJsUQF6MUWYl6kA8kWKJBmYgBNlfuZmkEg6M-f3aDwzeCAOwhJNiWMrEEgwUs"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-secondary-container text-white text-[10px] font-label font-bold px-2 py-1 uppercase tracking-widest rounded-sm">Workstation</span>
              </div>
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">Vector Studio X</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Certified for 3D modeling and scientific computing workloads.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX A5000</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">i7-Work</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">128GB ECC</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">Enterprise</span>
                  <span className="text-lg font-bold font-headline text-primary">$4,299.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>

          {/* Product Card 4 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="premium gaming laptop with vibrant RGB lighting accents in a dark studio setting with soft purple highlights"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOoSyFSHP3_Rh296h5TPruenYLlZB7wZ88Q-4xsEUfKrMnqLd0WhNmUjglNMrjIq6TjLXgbFo8r91ovC6UBB4wGS3-TM5vYdsKZPA0PDs1oY_0EmgfJOuZfwcZhL7Y9RBi-DFVQbn3KPxHnu69UL0O_Iv2fwXEiwJ_eqRo53rlmBW5u_cBi0ltj8RT-IBa63Mx08xZx7OOP9tmAqwfsdFdWX42hNhfoX95YkFvE_lqYgGBUfKHTwsfriQnzDroQw3__6oOzWW-p4NX"
              />
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">MSI Raider GE78</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Flagship gaming DNA with extreme thermal overhead for overclocking.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX 4080</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">i9-14900</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">32GB DDR5</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">Special Order</span>
                  <span className="text-lg font-bold font-headline text-primary">$2,899.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>

          {/* Product Card 5 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="professional workspace featuring a modern silver laptop on a clean white desk with soft natural light"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCITeIqdXUKxOMaMcAzpUjJhg187-stI1e6ElHno63sXvr7jeB2PxPm3ZWMnjHawr7SEfnMS-gFPclR4Ph92WRDzYzQ1sYv_JHn6MoBy6EGmlJnLv9hEl5vEa4iKKNMk1RzyGp-2Jy1YrYprvJHMZ9znMjRqHLCtWu8wRNDVBsVir6HZt50HeLM56s_pkhqj26GZP_87Gsx2Oc_uSOw4hPklb5ga3rgxDKL2R6B9m35diXVpSdkjju4K_8Sqq-7BqhsGdDgpZyChp85"
              />
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">Aero Creator 16</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Calibrated OLED displays designed for color-accurate visual editing.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX 4060</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">i7-H</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">32GB RAM</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">In Stock</span>
                  <span className="text-lg font-bold font-headline text-primary">$1,849.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>

          {/* Product Card 6 */}
          <article className="bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high group flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="minimalist overhead view of a premium laptop and smartphone on a dark grey surface with soft geometric shadows"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSBJGp0fBP1hCduBD7YmN3GKasvjwGLm6ikP7lz-vgrjUVQQZiaKSmPOygAauCsPmj3qlvkMkKK_zZ2uABdNqpugZRpzMrelY4pXoahrJTgVhcFOvL04BJcQEdwJmlZBocm79Vaf01KtzfkHBXmlPfngA7ZWYGL847O2zE85Lg0b4pqaVNCQ2o43u_1mqfDxflxfENBPvSsH3BGxzKaGBxS6gldiAVrM5jO2QR0m36qX6LJmZbrKJ_6vNCiwS8-nGXGZH4fjnJHX_G"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label font-bold px-2 py-1 uppercase tracking-widest rounded-sm">Value King</span>
              </div>
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">TUF Vanguard G15</h3>
                <p className="text-on-surface-variant text-xs font-body line-clamp-2">Military-grade durability paired with impressive price-to-performance.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">RTX 4050</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">Ryzen 7</span>
                <span className="bg-surface-container-highest text-on-surface text-[10px] font-label uppercase px-2 py-1 tracking-wider rounded-sm border border-outline-variant/10">16GB DDR5</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-label text-on-surface-variant tracking-widest">Deal Alert</span>
                  <span className="text-lg font-bold font-headline text-primary">$1,099.00</span>
                </div>
                <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">Configure</button>
              </div>
            </div>
          </article>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-12">
          <button className="w-10 h-10 flex items-center justify-center bg-surface-container-high text-on-surface hover:bg-primary-container transition-colors rounded-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">2</button>
          <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">3</button>
          <span className="w-10 h-10 flex items-center justify-center text-on-surface-variant">...</span>
          <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">12</button>
        </div>
      </section>
    </main>
    <ComparisonTray />
    <Footer />
    </>
  );
}