import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ArrowRight, Zap, Gauge } from 'lucide-react';
import { Link } from 'wouter';

const categoryIcons: Record<string, React.ReactNode> = {
  "Frequency Calibrators": <Zap className="w-8 h-8" />,
  "Resistance Calibrators": <Gauge className="w-8 h-8" />,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroCarousel />
      <TrustBadges />

      {/* YouTube Video Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">See Our Instruments in Action</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
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
            {MOCK_PRODUCTS.map(product => (
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
