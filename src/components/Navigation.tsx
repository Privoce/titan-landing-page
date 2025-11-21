import { Zap, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Titan AI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#mission" className="text-gray-200 hover:text-white transition-colors">
              Mission
            </a>
            <a href="#product" className="text-gray-200 hover:text-white transition-colors">
              Product
            </a>
            <a href="#Industry perspectives" className="text-gray-200 hover:text-white transition-colors">
              Industry perspectives
            </a>
            <a href="#pricing" className="text-gray-200 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-200 hover:text-white transition-colors">
              Q&A
            </a>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg font-semibold">
              Schedule demo
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-800/30">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#mission"
              className="block text-gray-200 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Mission
            </a>
            <a
              href="#product"
              className="block text-gray-200 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </a>
            <a
              href="Industry perspectives"
              className="block text-gray-200 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Industry perspectives
            </a>
            <a
              href="#pricing"
              className="block text-gray-200 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block text-gray-200 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Q&A
            </a>
            <button className="w-full px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg font-semibold">
              Schedule demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
