import React, { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
 

 




 

  

 

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any components yet.</p>
        <Link href="/products" className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-md hover:bg-amber-400 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Selected Products for Enquiry
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items List */}
          <div className="flex-1 space-y-4">



            {/* Items */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-8">Product</div>
                <div className="col-span-4 text-center">Quantity</div>
              </div>

              <ul className="divide-y divide-slate-100">
                {items.map((item) => (
                  <li key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4">

                    <div className="col-span-6 flex items-center gap-4">
                      <Link href={`/products/${item.productId}`} className="w-20 h-20 bg-slate-50 rounded-md border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                      </Link>
                      <div>
                        <Link href={`/products/${item.productId}`} className="font-semibold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm font-medium mt-1 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>



                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-slate-200 rounded-md h-9 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-8 text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>


                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">

              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Ready to Enquire?
              </h2>

              <p className="text-slate-600 text-sm mb-6">
                Pricing depends on calibration range, quantity,
                specifications and delivery location.
                Send your enquiry and our team will contact you.
              </p>

              <button
                onClick={() => {
                  const ids = items.map(item => item.productId).join(",");
                  window.location.href = `/contact?products=${encodeURIComponent(ids)}`;
                }}
                className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-md hover:bg-amber-400 transition-colors"
              >
                Send Enquiry
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}