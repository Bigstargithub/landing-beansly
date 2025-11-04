import Hero from './components/Hero';
import Features from './components/Features';
import Proof from './components/Proof';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Proof />
      <CTA />
      
      {/* Footer */}
      <footer className="bg-[#2d1f1a] text-[#c7a17a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl font-bold mb-3 text-white">빈즐리 Beansly</p>
          <p className="text-lg mb-2">원두, 이제 쉽게</p>
          <p className="text-sm opacity-75 mt-4">© 2025 빈즐리(Beansly). All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
