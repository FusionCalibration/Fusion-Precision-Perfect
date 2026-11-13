
import React from 'react';
import { useLocation } from 'wouter';
import { Product } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [, navigate] = useLocation();

  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  return (
    <div
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all duration-200 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative bg-slate-100 aspect-[4/3] overflow-hidden">
        <img
          src={product.images?.[0] || '/products/f1000.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
          {product.category}
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug mb-4 group-hover:text-amber-600 transition-colors flex-1">
          {product.name}
        </h3>

        <div className="mt-auto space-y-2">
          <button
            onClick={handleEnquiry}
            className="w-full bg-amber-500 text-slate-900 font-bold text-sm py-2.5 rounded-md hover:bg-amber-400 transition-colors"
          >
            For Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
