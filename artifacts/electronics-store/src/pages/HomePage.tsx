
import React, { useEffect, useState } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, type Product } from '../data/mockData';
import { ArrowRight, Zap, Gauge, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

const categoryIcons: Record<string, React.ReactNode> = {
  "Frequency Calibrators": <Zap className="w-8 h-8" />,
  "Resistance Calibrators": <Gauge className="w-8 h-8" />,
};

interface ApiProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

export default function HomePage() {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Unable to load products');

        const data = await response.json();
        const products: ApiProduct[] = data.products ?? [];

        const mappedProducts: Product[] = products
          .filter((product) => product.isActive)
          .map((product) => ({
            id: String(product.id),
            name: product.name,
            category: product.category,
            subcategory: '',
            price: product.price ? Number(product.price) : 0,
            originalPrice: 0,
            rating: 0,
            reviewsCount: 0,
            inStock: true,
            sku: `FPP-${product.id}`,
            description: product.description ?? '',
            specs: {},
            images: product.imageUrl
              ? [product.imageUrl]
              : ['/products/f1000.jpg'],
            tags: [],
          }));

        if (!cancelled) setApiProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to load homepage products:', error);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const allProducts = [...MOCK_PRODUCTS, ...apiProducts];

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroCarousel />
      <TrustBadges />

      {/* YouTube Video Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Most Demanding Temperature Calibration Software Basedon ITS_90</h2>
            <p className="text-slate-400">Watch our latest demonstrations and product overviews</p>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/e5K-EQZZntw?autoplay=1&mute=1&loop=1&playlist=e5K-EQZZntw&modestbranding=1&rel=0"
                title="Fusion Precision Perfect – Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://www.youtube.com/@FusionPrecisionPerfect"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Visit our YouTube Channel <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Product Categories</h2>
            <Link href="/products" className="text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {['Frequency Calibrators', 'Resistance Calibrators'].map(category => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all group"
              >
                <div className="text-slate-600 group-hover:text-amber-500 transition-colors mb-3">
                  {categoryIcons[category] || <Zap className="w-8 h-8" />}
                </div>
                <span className="font-semibold text-base text-center text-slate-900">{category}</span>
              </Link>
            ))}

            <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden cursor-default select-none">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 animate-pulse" />
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>
              <span className="font-black text-lg tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 animate-pulse">
                Coming Soon
              </span>
              <span className="text-xs text-slate-500 mt-2 text-center" style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>
                Multiproduct Calibrator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Our Instruments</h2>
            <p className="text-slate-500">Precision calibration tools built for professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Fusion Precision Perfect?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Best-in-Class Accuracy",
                desc: "Definitive precision for the world's most demanding labs.",
              },
              {
                title: "Portable & Lab-Grade",
                desc: "Designed for permanent, site & mobile testing calibration.",
              },
              {
                title: "Expert Technical Support",
                desc: "Our engineering team provides dedicated pre-sales and after-sales technical assistance.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-amber-400 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-amber-500">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get a Quote or Technical Consultation</h2>
          <p className="text-slate-800 mb-8">Contact our team for pricing, custom orders, or expert guidance on selecting the right calibrator for your application.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:admin@fusionprecisionperfect.com"
              className="bg-slate-900 text-white font-bold px-8 py-3 rounded-md hover:bg-slate-800 transition-colors"
            >
              Email Us
            </a>
            <Link
              href="/contact"
              className="bg-white text-slate-900 font-bold px-8 py-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
