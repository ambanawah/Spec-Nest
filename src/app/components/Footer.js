export default function Footer() {
  return (
    <footer className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 px-12 py-20 bg-[#0c0c1f] font-inter text-xs leading-relaxed border-t border-outline-variant/10">
      <div className="col-span-2 md:col-span-1">
        <div className="text-lg font-black text-[#e2e0fc] mb-4">SpecNest</div>
        <p className="text-[#e2e0fc]/50 max-w-xs">Elevating high-performance hardware editorial and precision procurement since 2024.</p>
      </div>
      <div>
        <h4 className="text-primary font-label uppercase tracking-widest mb-6">Shop</h4>
        <ul className="space-y-4">
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Workstations</a></li>
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Components</a></li>
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Peripherals</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-primary font-label uppercase tracking-widest mb-6">Support</h4>
        <ul className="space-y-4">
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Benchmarks</a></li>
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Product Manuals</a></li>
          <li><a className="text-[#e2e0fc]/50 hover:text-[#b3c5ff] hover:translate-x-1 transition-transform inline-block" href="#">Warranties</a></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-4 mt-12 pt-12 border-t border-outline-variant/10 flex justify-between items-center">
        <span className="text-[#e2e0fc]/30">© 2024 SPECNEST PRECISION TECH EDITORIAL</span>
        <div className="flex gap-8">
          <a className="text-[#e2e0fc]/50 hover:text-primary" href="#">Company</a>
          <a className="text-[#e2e0fc]/50 hover:text-primary" href="#">Social</a>
        </div>
      </div>
    </footer>
  );
}