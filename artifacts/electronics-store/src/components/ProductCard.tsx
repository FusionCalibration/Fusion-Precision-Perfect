import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { Product } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-slate-900 text-white font-bold px-3 py-1 rounded text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-slate-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 flex-1 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-500">({product.reviewsCount})</span>
        </div>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 leading-none mt-1">incl. GST</p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              product.inStock 
                ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}