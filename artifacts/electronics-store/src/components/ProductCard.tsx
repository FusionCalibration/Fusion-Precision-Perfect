import React from 'react';
import { Link, useLocation } from 'wouter';
import { Star, Phone } from 'lucide-react';
import { Product } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: 0,
      quantity: 1,
      image: product.images[0],
    });
    toast({
      title: "Added to Enquiry",
      description: `${product.name} added. Contact us for pricing.`,
    });
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'tel:+918607620062';
  };

  return (
    <div
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all duration-200 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative bg-slate-100 aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.inStock ? (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-slate-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">{product.category}</div>
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-amber-600 transition-colors flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviewsCount} reviews)</span>
        </div>

        {/* Price / CTA */}
        <div className="mt-auto space-y-2">
          <div className="text-sm font-semibold text-slate-700">Contact for Pricing</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleEnquiry}
              className="bg-amber-500 text-slate-900 font-bold text-sm py-2 rounded-md hover:bg-amber-400 transition-colors"
            >
              Add Enquiry
            </button>
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-1 border border-slate-300 text-slate-700 font-semibold text-sm py-2 rounded-md hover:border-amber-500 hover:text-amber-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
