import React from 'react';
import { Link } from 'wouter';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-900 text-xl tracking-tighter">
                M
              </div>
              <span className="font-bold text-xl tracking-tight text-white">MakerStore</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              India's premier destination for makers, engineers, and hobbyists. Quality electronics components, sensors, and robotics parts shipped fast across India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm hover:text-amber-500 transition-colors">Product Details</Link></li>
              <li><Link href="/about" className="text-sm hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-amber-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/cart" className="text-sm hover:text-amber-500 transition-colors">Shopping Cart</Link></li>
              <li><Link href="/login" className="text-sm hover:text-amber-500 transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Top Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/Arduino" className="text-sm hover:text-amber-500 transition-colors">Arduino Boards</Link></li>
              <li><Link href="/category/Sensors" className="text-sm hover:text-amber-500 transition-colors">Sensors & Modules</Link></li>
              <li><Link href="/category/Raspberry Pi" className="text-sm hover:text-amber-500 transition-colors">Raspberry Pi</Link></li>
              <li><Link href="/category/Robotics & DIY" className="text-sm hover:text-amber-500 transition-colors">Robotics Parts</Link></li>
              <li><Link href="/category/3D Printing" className="text-sm hover:text-amber-500 transition-colors">3D Printing</Link></li>
              <li><Link href="/category/Modules & ICs" className="text-sm hover:text-amber-500 transition-colors">Power Modules</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Support</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">MakerStore India<br />Bangalore, Karnataka, 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-slate-400">support@makerstore.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Mon-Sat: 10:00 AM – 9:00 PM IST<br />Sun: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} MakerStore India. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>GST Invoice Available</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>All prices incl. GST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}