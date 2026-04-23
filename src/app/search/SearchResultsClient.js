'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = [
    {
      id: 1,
      name: 'ROG Strix SCAR 18 (2024)',
      brand: 'ASUS',
      specs: ['RTX 4090 16GB', 'i9-14900HX', 'Liquid Cooling'],
      price: '$3,899.99',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrd4q0KvDDszC-zJtxRa_T69F10rg1Rg8SGVFube03-jOviva9NJ2FJDiAEDPez53FP-1W3CQjg71Jcu66Sg2Lr9ECXlXNeNopraN3rcfI700Qxo75C9lCAOKbqGdbmMSiH3BWABd4HxhayYhhxSTkbyN_lgi1KLzXWi_wWp8bAcu_7QfQo9-mOt_qznGqIwO41fxJMSn9sh-lpmOTLqyaZdA9Zr9SgyJ5MQPxu2QpBW9JI3YCwBM95IGFhtr0Pg5MoyR72AlVZnS4',
      rating: 4.9,
      badges: ['Featured', 'In Stock']
    },
    {
      id: 2,
      name: 'Razer Blade 16 Mercury',
      brand: 'Razer',
      specs: ['RTX 4090', 'Mini-LED', '32GB DDR5'],
      price: '$4,299.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqUugcdjvs4a5KldoXdQ5-2oZW-jiwLv4c_T4_ywiKfY0jToWLujDkVBKIKIPkt3BPjEhZqFF8XE9OTk26eqUTOpR2sEAlxN0FkaEAf-wRn5M4LeJmu7uGDj21EgOaLwdg3zB5hCFKfQ_eSmDBWdG3n_V1TW1MEiM3OEyiml4W0ROd_7yyRaMS5vd3xtDj7vyIETTp3sYqK9rbx5Pd7l1LlfGqEDpZv8OkkGwU6ac87qjHkR7NcLPN40LN6MNWIYnBIZDHQJZA__I-/',
      rating: 4.8,
      badges: ['Ultra Thin']
    },
    {
      id: 3,
      name: 'MSI Titan 18 HX',
      brand: 'MSI',
      specs: ['RTX 4090', 'Mechanical KB', '4TB NVMe'],
      price: '$5,499.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgt7Prar4uljNGFIFili-hmzwr63tA6BeWVGLoy2mMgTDnG6BqjGirYCdf8IEbRjlakNDDaik5YFnC7QfzZnhuH_dK4tXxoM-dcaNBOrMtIy4tj4A0-dpSeny4_DQTktXNNh2cTkfn0NCjlY6Hcca9C8k259yqY0QKSTShnJh_ImN8GlzH37gybF1nt15x3mQ7XDHzlMQAl7asXEENP5axA1Y78_ULLf_K271yT3I8KYz6G0zIai74UdLi5msyZ2OsCtqCbe7-wfTB',
      rating: 5.0,
      badges: ['Top Rated']
    },
    {
      id: 4,
      name: 'Alienware Aurora R16',
      brand: 'Alienware',
      specs: ['RTX 4090', 'i9-14900K', '64GB DDR5'],
      price: '$4,499.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlimzS7zV8UOqNTEu9Bc0d-joKLh5uEPwCyPxz6vCaygKQPdEryRvB1dguOwijx2xx14UxPq85U4YDsLyqMdjregZHIUJqNZ3Wu4C22gphJtgly1l-t5z40zJQs6GrMAk4fno9NjVnCeiSALCTMrFWHrc655pm7jF72rJbt0ixrUy4EtX9NXfOPdzMIOva_BAORwKg6fXusQNgNF92V5ICIw3kRXOI0GZK4D_pVFvFIwPPMsgKlTlxJxWawYdwg-P5mAmcO45LutJn',
      rating: 4.7,
      badges: []
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen px-8 max-w-[1600px] mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-outline text-[10px] font-label uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span>Search</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-primary">{query}</span>
              </nav>
              <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
                Results for '{query}'
              </h1>
              <p className="text-outline mt-2 font-label tracking-wide">
                {searchResults.length} PRECISION INSTRUMENTS FOUND
              </p>
            </div>
            <div className="flex items-center gap-4 bg-surface-container-low p-1 rounded-lg">
              <button className="px-4 py-2 text-xs font-label uppercase tracking-wider text-primary border-b-2 border-primary">
                Highest Performance
              </button>
              <button className="px-4 py-2 text-xs font-label uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
                Price: Low to High
              </button>
              <button className="px-4 py-2 text-xs font-label uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
                Newest Arrivals
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
            <section>
              <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Price Range
              </h3>
              <div className="space-y-6">
                <div className="relative h-1 bg-surface-container-highest rounded-full">
                  <div className="absolute left-1/4 right-0 h-full bg-gradient-to-r from-[#0066ff] to-[#6001d1] rounded-full"></div>
                  <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-on-surface border-2 border-primary rounded-full"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-on-surface border-2 border-primary rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs font-label text-outline-variant">
                  <span>$2,499</span>
                  <span>$5,999+</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Manufacturer
              </h3>
              <div className="space-y-3">
                {['ASUS ROG / TUF', 'MSI Gaming', 'Razer Blade', 'Alienware'].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      checked={searchResults.some(result => result.brand.toLowerCase().includes(brand.split(' ')[0].toLowerCase()))}
                      className="w-4 h-4 bg-surface-container-lowest border-outline-variant rounded-sm checked:bg-primary-container"
                      type="checkbox"
                      readOnly
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Memory (RAM)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['32GB DDR5', '64GB DDR5', '96GB DDR5', '128GB DDR5'].map((ram) => (
                  <button
                    key={ram}
                    className={`py-2 px-4 text-xs font-label hover:bg-primary-container transition-colors rounded-sm text-center ${ram === '64GB DDR5' ? 'bg-primary-container' : 'bg-surface-container-high'}`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Storage Type
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 bg-surface-container-lowest border-outline-variant checked:bg-primary-container" name="storage" type="radio" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface">2TB NVMe Gen4</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="w-4 h-4 bg-surface-container-lowest border-outline-variant checked:bg-primary-container" name="storage" type="radio" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface">4TB NVMe Gen4 (RAID 0)</span>
                </label>
              </div>
            </section>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <div key={product.id} className="group bg-surface-container-high rounded-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="aspect-video relative overflow-hidden bg-surface-container-lowest">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={`High-end ${product.name} laptop with premium build quality`}
                      src={product.image}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.badges.map((badge, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-[9px] font-label font-bold uppercase tracking-widest rounded-sm ${
                            badge === 'Featured' ? 'bg-primary-container text-on-primary-container' :
                            badge === 'In Stock' ? 'bg-secondary-container text-on-secondary-container' :
                            badge === 'Ultra Thin' ? 'bg-tertiary-container text-on-tertiary-container' :
                            'bg-surface-container-highest text-primary'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-lg font-bold font-headline text-on-surface leading-tight">
                        {product.name}
                      </h2>
                      <div className="flex items-center gap-1 text-secondary text-xs">
                        <span className="material-symbols-outlined">star</span>
                        {product.rating}
                      </div>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-6">{product.brand}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold font-headline text-primary">{product.price}</span>
                      <button className="bg-gradient-to-br from-[#0066ff] to-[#6001d1] text-on-primary-container px-4 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-all scale-95 active:scale-90 hover:brightness-110">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
