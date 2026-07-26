import React from 'react';
import { Clock, Shield, Truck, FileText } from 'lucide-react';

const badges = [
  {
    icon: <Clock className="w-6 h-6 text-amber-500" />,
    label: "10am – 9pm Support",
    sub: "Mon–Sat, IST",
  },
  {
    icon: <Shield className="w-6 h-6 text-amber-500" />,
    label: "Best-in-Class Accuracy",
    sub: "±0.005% frequency | ±0.02% resistance",
  },
  {
    icon: <Truck className="w-6 h-6 text-amber-500" />,
    label: "Nationwide Delivery",
    sub: "Shipped across India",
  },
  {
    icon: <FileText className="w-6 h-6 text-amber-500" />,
    label: "GST Invoice Available",
    sub: "Suitable for institutional procurement",
  },
];

export function TrustBadges() {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0">{badge.icon}</div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{badge.label}</div>
                <div className="text-xs text-slate-500">{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
