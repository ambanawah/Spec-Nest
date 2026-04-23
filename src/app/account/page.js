import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AccountPage() {
  return (
    <>
      <Header activePage="account" />
      <main className="pt-32 pb-24 px-8 md:px-12 max-w-6xl mx-auto">
        <section className="text-center py-24">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4">Member Hub</p>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
            Your Account
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg">
            Sign in to save builds, track orders, and manage your precision hardware preferences.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
