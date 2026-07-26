import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Check, FileText, Download } from 'lucide-react';

// Map each product to which catalogues apply
const PRODUCT_CATALOGUES: Record<string, { name: string; file: string }[]> = {
  f1000: [
    { name: "F1000 Digital Frequency Calibrator – Product Catalogue", file: "/catalogues/FPP-F1000-Catalogue.pdf" },
  ],
  r1000: [
    { name: "R1000 & R1001 Resistance Calibrators – Product Catalogue", file: "/catalogues/FPP-R1000-R1001-Catalogue.pdf" },
  ],
  r1001: [
    { name: "R1000 & R1001 Resistance Calibrators – Product Catalogue", file: "/catalogues/FPP-R1000-R1001-Catalogue.pdf" },
  ],
};

// Fallback: show both for unknown products
const ALL_CATALOGUES = [
  { name: "F1000 Digital Frequency Calibrator – Product Catalogue", file: "/catalogues/FPP-F1000-Catalogue.pdf" },
  { name: "R1000 & R1001 Resistance Calibrators – Product Catalogue", file: "/catalogues/FPP-R1000-R1001-Catalogue.pdf" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products" className="text-amber-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const catalogues = PRODUCT_CATALOGUES[product.id] ?? ALL_CATALOGUES;

  const handleAddEnquiry = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: 0,
      quantity: 1,
      image: product.images[0],
    });
    toast({
      title: "Added to Enquiry",
      description: `${product.name} has been added. We'll follow up with pricing.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-amber-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/category/${product.category}`} className="hover:text-amber-600">{product.category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-md rounded-xl overflow-hidden bg-white border border-slate-200 mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-md border-2 overflow-hidden bg-white ${activeImage === idx ? 'border-amber-500' : 'border-slate-200'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="mb-2 text-sm text-slate-500 font-medium">SKU: {product.sku}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.inStock && <Check className="w-4 h-4" />}
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Pricing */}
              <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm font-semibold text-amber-700 mb-1">Pricing available on request</p>
                <p className="text-xs text-amber-600">Contact us for institutional quotes, bulk pricing, and GST invoices.</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <button
                  onClick={handleAddEnquiry}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-md flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  Add to Enquiry
                </button>
                <a
                  href="/contact"
                  className="w-full h-12 border-2 border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-700 font-semibold rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  Contact for Pricing
                </a>
              </div>

              {/* Contact Quick Links */}
              <div className="pt-6 border-t border-slate-200 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Get in Touch</p>
                <a
                  href="mailto:admin@fusionprecisionperfect.com"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  admin@fusionprecisionperfect.com
                </a>
                <a
                  href="https://wa.me/918607620062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-green-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  WhatsApp: +91 86076 20062
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Catalogue Downloads */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Product Catalogues</h2>
              <p className="text-sm text-slate-500">Download full technical specifications and data sheets</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {catalogues.map((cat) => (
              <a
                key={cat.file}
                href={cat.file}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 leading-snug">{cat.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">PDF Document</p>
                </div>
                <Download className="w-5 h-5 text-slate-400 group-hover:text-amber-500 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Tabbed Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {(['description', 'specs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold text-sm capitalize whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : 'Description'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-slate-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <th className="px-6 py-4 font-semibold text-slate-900 border-r border-slate-200 w-1/3">{key}</th>
                        <td className="px-6 py-4 text-slate-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
