import React, { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = getCartTotal();
  const gstAmount = Math.round(subtotal * 0.18); // 18% GST calculation display only (already included in price per requirements, but we break it down for show)
  const baseAmount = subtotal - gstAmount;
  
  const freeShippingThreshold = 999;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 50;
  const total = subtotal + shipping;

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setShowSuccessModal(true);
      clearCart();
    }, 1500);
  };

  if (showSuccessModal) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          Thank you for shopping at MakerStore. Your mock order has been placed successfully.
        </p>
        <Link href="/" className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-md hover:bg-amber-400 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {/* Free Shipping Progress */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between text-sm font-medium text-slate-900 mb-2">
                <span>Free Shipping</span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-green-600">Unlocked!</span>
                ) : (
                  <span>Add ₹{freeShippingThreshold - subtotal} more</span>
                )}
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${subtotal >= freeShippingThreshold ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
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

                    <div className="col-span-2 text-center hidden sm:block font-medium text-slate-700">
                      ₹{item.price}
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

                    <div className="col-span-2 text-right font-bold text-slate-900 sm:text-base text-lg flex justify-between sm:block">
                      <span className="sm:hidden text-slate-500 font-normal">Total:</span>
                      ₹{item.price * item.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{baseAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">₹{total}</span>
                </div>
                <p className="text-xs text-slate-500 text-right">Prices are inclusive of all taxes</p>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-amber-500 text-slate-900 font-bold py-3.5 rounded-md hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>Proceed to Checkout <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Safe & Secure Payments
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}