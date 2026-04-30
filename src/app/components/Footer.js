import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-8 sm:px-12 py-16 sm:py-20 bg-surface-container font-inter text-xs leading-relaxed">
      <div className="mb-8 sm:mb-0">
        <div className="text-lg font-black text-on-surface mb-4 font-headline">SpecNest</div>
        <p className="text-on-surface-variant mb-6 max-w-[200px]">The definitive editorial source for precision-grade computer hardware.</p>
        <p className="text-on-surface-variant/50">© 2024 SPECNEST PRECISION TECH EDITORIAL</p>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-primary font-label font-bold uppercase tracking-widest mb-2">Shop</h5>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="/catalog">Laptops</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="/catalog/desktops">Desktops</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="/component-library">Components</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="/deals">Deals</Link>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-primary font-label font-bold uppercase tracking-widest mb-2">Support</h5>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Manuals</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Driver Vault</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Order Status</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Warranty</Link>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-primary font-label font-bold uppercase tracking-widest mb-2">Social</h5>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Discord</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Twitter</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Twitch</Link>
        <Link className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform" href="#">Instagram</Link>
      </div>
    </footer>
  );
}
