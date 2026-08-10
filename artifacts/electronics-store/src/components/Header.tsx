import React from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/mockData';

function FusionLogo() {
  return (
    <img
      src="/fusion-logo.png"
      alt="Fusion Precision Perfect"
      className="h-9 w-auto object-contain"
    />
  );
}

export function Header() {
  const [location] = useLocation();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Product Details' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const searchResults = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-slate-50 border-b border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 -ml-2 text-slate-300 hover:text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Brand */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div className="bg-white rounded-md px-3 py-1.5">
            <FusionLogo />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                location === link.href ? 'text-amber-500' : 'text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8 relative hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search calibrators, frequency, resistance..."
              className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 1);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 1)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>

          {/* Search Suggestions */}
          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-50">
              {searchResults.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                >
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                    <p className="text-xs text-slate-500">Contact for pricing</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="flex items-center flex-shrink-0">
          
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="w-64 bg-slate-900 h-full relative z-10 flex flex-col shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div className="bg-white rounded-md px-3 py-1.5">
                <FusionLogo />
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium p-2 rounded-md transition-colors ${
                    location === link.href ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
