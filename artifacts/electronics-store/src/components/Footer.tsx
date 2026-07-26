import React from 'react';
import { Link } from 'wouter';
import { Mail, Phone, Globe, Clock, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div>
            <div className="flex flex-col leading-none mb-6">
              <span className="text-[#C0392B] font-black text-2xl tracking-tight">FUSION</span>
              <span className="text-slate-400 font-semibold text-[10px] tracking-[0.15em] uppercase">Precision Perfect</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              High-precision calibration instruments for frequency and resistance measurement. Trusted by professionals across laboratories and industries.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@FusionPrecisionPerfect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
              >
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
              <li><Link href="/cart" className="text-sm hover:text-amber-500 transition-colors">Enquiry Cart</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Products</h3>
            <ul className="space-y-3">
              <li><Link href="/products/f1000" className="text-sm hover:text-amber-500 transition-colors">F1000 Frequency Calibrator</Link></li>
              <li><Link href="/products/r1000" className="text-sm hover:text-amber-500 transition-colors">R1000 Resistance Calibrator</Link></li>
              <li><Link href="/products/r1001" className="text-sm hover:text-amber-500 transition-colors">R1001 High Resistance Standard</Link></li>
              <li><Link href="/category/Frequency Calibrators" className="text-sm hover:text-amber-500 transition-colors">Frequency Calibrators</Link></li>
              <li><Link href="/category/Resistance Calibrators" className="text-sm hover:text-amber-500 transition-colors">Resistance Calibrators</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <a href="tel:+918607620062" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">+91 86076 20062</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="mailto:admin@fusionprecisionperfect.com" className="block text-sm text-slate-400 hover:text-amber-400 transition-colors">admin@fusionprecisionperfect.com</a>
                  <a href="mailto:fusion.precision.perfeect@outlook.com" className="block text-sm text-slate-400 hover:text-amber-400 transition-colors">fusion.precision.perfeect@outlook.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <a href="https://fusionprecisionperfect.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">fusionprecisionperfect.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Mon–Sat: 10:00 AM – 9:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Fusion Precision Perfect. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>GST Invoice Available</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <a href="https://fusionprecisionperfect.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">fusionprecisionperfect.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
