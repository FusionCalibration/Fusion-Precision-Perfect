import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData';
import { Cpu, Zap, Wifi, PenTool, Battery, MonitorPlay, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'wouter';

const categoryIcons: Record<string, React.ReactNode> = {
  "Sensors": <Zap className="w-8 h-8" />,
  "Arduino": <Cpu className="w-8 h-8" />,
  "Raspberry Pi": <MonitorPlay className="w-8 h-8" />,
  "Robotics & DIY": <PenTool className="w-8 h-8" />,
  "3D Printing": <Wifi className="w-8 h-8" />,
  "Modules & ICs": <Battery className="w-8 h-8" />
};

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-amber-500 text-slate-900 text-sm font-medium py-2 text-center">
        ⚡ Free shipping on orders above ₹999 across India
      </div>

      <HeroCarousel />
      <TrustBadges />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Shop by Category</h2>
            <Link href="/products" className="text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(category => (
              <Link 
                key={category} 
                href={`/category/${category}`}
                className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all group"
              >
                <div className="text-slate-600 group-hover:text-amber-500 transition-colors mb-3">
                  {categoryIcons[category] || <Cpu className="w-8 h-8" />}
                </div>
                <span className="font-semibold text-sm text-center text-slate-900">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
            <p className="text-slate-500">Handpicked components for your next project</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Are you a student or educator?</h2>
            <p className="text-slate-300 text-lg mb-6">
              Get special discounts on bulk orders for college projects, hackathons, and lab setups. We provide official GST invoices and technical support.
            </p>
            <Link href="/contact" className="inline-block bg-white text-slate-900 font-bold px-6 py-3 rounded-md hover:bg-slate-100 transition-colors">
              Contact Sales
            </Link>
          </div>
          <div className="w-full md:w-1/3 aspect-video bg-slate-800 rounded-lg overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80" alt="Workspace" className="w-full h-full object-cover opacity-60" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">Trusted by Indian Makers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Got genuine Arduino Uno within 2 days. The packaging was excellent and parts were exactly as described.", author: "Rahul M.", role: "Engineering Student" },
              { text: "Best prices for Raspberry Pi accessories in India. Their customer support even helped me troubleshoot a sensor issue over WhatsApp.", author: "Priya S.", role: "Hobbyist" },
              { text: "We order our lab supplies exclusively from MakerStore now. The GST invoicing is seamless and quality is always top-notch.", author: "Dr. Verma", role: "Robotics Professor" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl relative">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-200" />
                <p className="text-slate-700 relative z-10 mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-amber-500">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Never Miss a Deal</h2>
          <p className="text-slate-800 mb-8">Subscribe to get updates on new arrivals, tutorials, and exclusive discounts.</p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-slate-900"
            />
            <button className="bg-slate-900 text-white font-bold px-8 py-3 rounded-md hover:bg-slate-800 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}