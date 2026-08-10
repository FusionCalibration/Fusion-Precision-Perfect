import React from 'react';
import { Target, Zap, Award, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">High-Precision Calibration Instruments</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Fusion Precision Perfect is an Indian manufacturer of professional-grade calibration instruments. We engineer high precision calibration instruments built to the highest accuracy standards, trusted by laboratories, service centres, and quality professionals across industries.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
         <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  At Fusion Precision Perfect, we believe that accuracy is not a luxury — it is the foundation of reliable measurement, which leads to improvement. Our calibration instruments are designed to deliver best-in-class specifications, making professional-grade calibration accessible to calibration laboratories, field engineers, and quality control teams. We prioritise portability without compromising accuracy.
                </p>
                
              </div>
            </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Choose Us</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-amber-500" />,
                title: "Best-in-Class Accuracy"
              },
              {
                icon: <Zap className="w-10 h-10 text-amber-500" />,
                title: "Versatile Compatibility"
              },
              {
                icon: <Target className="w-10 h-10 text-amber-500" />,
                title: "Portable & Lab-Use"
              },
              {
                icon: <Shield className="w-10 h-10 text-amber-500" />,
                title: "Technical Support"
              },
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Product Range</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/products/f1000.jpg",
                name: "F1000 Digital Frequency Calibrator",
                desc: "10 Hz – 1 MHz | ±0.005% accuracy",
              },
              {
                img: "/products/r1000.jpg",
                name: "R1000 Precision Resistance Calibrator",
                desc: "10 mΩ – 100 MΩ | ±0.02% accuracy",
              },
              {
                img: "/products/r1001.jpg",
                name: "R1001 High Resistance Standard Box",
                desc: "1 MΩ – 20 GΩ at 1 kV | ±0.55% accuracy",
              },
            ].map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-amber-600 font-medium">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
