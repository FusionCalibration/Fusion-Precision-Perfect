import React from 'react';
import { ShieldCheck, Truck, Clock, FileText } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      title: "10am–9pm Support",
      desc: "Dedicated technical assistance"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-amber-500" />,
      title: "Secure Payments",
      desc: "100% safe & encrypted"
    },
    {
      icon: <Truck className="h-8 w-8 text-amber-500" />,
      title: "Fast Delivery",
      desc: "Shipping across India"
    },
    {
      icon: <FileText className="h-8 w-8 text-amber-500" />,
      title: "GST Invoice",
      desc: "B2B billing available"
    }
  ];

  return (
    <div className="w-full bg-white border-y border-slate-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3 group">
              <div className="p-4 rounded-full bg-slate-50 group-hover:bg-amber-50 transition-colors">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">{badge.title}</h4>
                <p className="text-xs md:text-sm text-slate-500 mt-1">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}