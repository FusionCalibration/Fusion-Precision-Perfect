
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'wouter';
import { MOCK_PRODUCTS, type Product } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Youtube } from 'lucide-react';

const YT_VIDEOS = [
  {
    id: 'e5K-EQZZntw',
    title: 'Fusion Precision Perfect – Product Demo',
  },
];

const CHANNEL_URL = 'https://www.youtube.com/@FusionPrecisionPerfect';

interface ApiProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

export default function CategoryPage() {
  const { category } = useParams();
  const activeCategory = category ? decodeURIComponent(category) : null;

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
            images: product.imageUrl ? [product.imageUrl] : ['/products/f1000.jpg'],
            tags: [],
          }));

        if (!cancelled) setApiProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to load public products:', error);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const allProducts = useMemo(
    () => [...MOCK_PRODUCTS, ...apiProducts],
    [apiProducts],
  );

  const filteredProducts = useMemo(() => {
    if (activeCategory) {
      return allProducts.filter((product) => product.category === activeCategory);
    }
    return allProducts;
  }, [activeCategory, allProducts]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {activeCategory ? activeCategory : 'All Products'}
          </h1>
          <p className="text-slate-500 mt-2">
            {filteredProducts.length} instrument{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center mb-20">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 mb-6">Check back soon for new instruments in this category.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 text-slate-900 font-bold rounded-md hover:bg-amber-400 transition-colors">
              View All Products
            </Link>
          </div>
        )}

        <div className="border-t border-slate-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Fusion Precision Perfect – Videos</h2>
                <p className="text-sm text-slate-500">Watch our product demonstrations and tutorials</p>
              </div>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-md hover:bg-red-700 transition-colors"
            >
              <Youtube className="w-4 h-4" /> Visit Channel
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {YT_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{video.title}</p>
                  <p className="text-xs text-slate-400 mt-1">Fusion Precision Perfect</p>
                </div>
              </div>
            ))}

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center p-8 gap-4 group min-h-[240px]"
            >
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base">View Full Channel</p>
                <p className="text-slate-400 text-sm mt-1">All videos & playlists</p>
              </div>
              <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                Open YouTube <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          <div className="mt-6 text-center sm:hidden">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              <Youtube className="w-5 h-5" /> Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
