import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Filter, ChevronDown, Check } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams();
  
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Decode URI component because wouter params might be encoded (e.g., "Robotics%20&%20DIY")
  const activeCategory = category ? decodeURIComponent(category) : null;

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular / newest (mocked by ID)
        break;
    }

    return result;
  }, [activeCategory, inStockOnly, priceRange, sortBy]);

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/products" 
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${!activeCategory ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              All Products
            </Link>
          </li>
          {CATEGORIES.map(c => (
            <li key={c}>
              <Link 
                href={`/category/${c}`} 
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${activeCategory === c ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-slate-200" />

      {/* Filters */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Filters</h3>
        
        <div className="space-y-6">
          {/* Availability */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inStockOnly ? 'bg-amber-500 border-amber-500' : 'border-slate-300 group-hover:border-amber-500'}`}>
              {inStockOnly && <Check className="w-3.5 h-3.5 text-slate-900 font-bold" />}
            </div>
            <input type="checkbox" className="sr-only" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} />
            <span className="text-sm text-slate-700">In Stock Only</span>
          </label>

          {/* Price Range */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>₹0</span>
              <span>₹10,000+</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-amber-500"
            />
            <div className="text-sm font-medium text-slate-700 mt-2">
              Up to ₹{priceRange[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeCategory ? activeCategory : 'All Products'}
            </h1>
            <p className="text-slate-500 mt-2">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium shadow-sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-slate-200 rounded-md py-2 pl-4 pr-10 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
              <Sidebar />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center flex flex-col items-center">
                <Filter className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => {
                    setInStockOnly(false);
                    setPriceRange([0, 10000]);
                  }}
                  className="mt-6 px-6 py-2 bg-amber-100 text-amber-900 rounded-md font-medium hover:bg-amber-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}