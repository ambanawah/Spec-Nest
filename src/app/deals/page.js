import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DealsPage() {
  return (
    <>
      <Header activePage="deals" />
      <main className="pt-32 pb-24 px-8 md:px-12 max-w-6xl mx-auto">
        <section className="text-center py-24">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4">Exclusive Offers</p>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
            Deals & Limited Releases
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg">
            Explore our latest curated discounts on high-performance systems and precision components.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
