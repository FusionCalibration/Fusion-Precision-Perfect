import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Star, Truck, Shield, ChevronRight, Check, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products" className="text-amber-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]
    });
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
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
                <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-4" />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-md">
                    -{discount}%
                  </div>
                )}
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
            <div className="p-8 md:p-12">
              <div className="mb-2 text-sm text-slate-500 font-medium">SKU: {product.sku}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-amber-600 font-medium hover:underline cursor-pointer">
                  {product.reviewsCount} Reviews
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-slate-400 line-through mb-1">₹{product.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">Inclusive of all taxes (GST 18%)</p>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.inStock ? <Check className="w-4 h-4" /> : null}
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
                <div className="text-sm text-slate-500">
                  Ready to ship
                </div>
              </div>

              {product.inStock && (
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-slate-300 rounded-md h-12 w-32 bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 flex items-center justify-center font-semibold text-slate-900">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-md flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Fast Delivery</div>
                    Ships in 24 hrs
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Buyer Protection</div>
                    7-day return policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold text-sm capitalize whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-amber-500 text-amber-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab}
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

            {activeTab === 'reviews' && (
              <div className="text-center py-12 text-slate-500">
                <Star className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No written reviews yet</h3>
                <p>Be the first to review this product after purchase.</p>
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