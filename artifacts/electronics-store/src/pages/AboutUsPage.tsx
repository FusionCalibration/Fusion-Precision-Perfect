import React from 'react';
import { Target, Zap, Award, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex flex-col items-center mb-6">
            <span className="text-[#C0392B] font-black text-4xl tracking-tight">FUSION</span>
            <span className="text-amber-400 font-semibold text-sm tracking-[0.25em] uppercase">Precision Perfect</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">High-Precision Calibration Instruments</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Fusion Precision Perfect is an Indian manufacturer of professional-grade calibration instruments. We engineer frequency and resistance calibrators built to the highest accuracy standards, trusted by laboratories, service centres, and quality professionals across industries.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  At Fusion Precision Perfect, we believe that accuracy is not a luxury — it is the foundation of reliable measurement. Our calibration instruments are designed to deliver best-in-class specifications, making professional-grade calibration accessible to Indian laboratories, field engineers, and quality control teams.
                </p>
                <p>
                  Our flagship products — the F1000 Digital Frequency Calibrator and the R100X Resistance Calibrator series — are engineered to cover a wide workload, from bench-top lab setups to rugged on-site calibration. We prioritise portability without compromising accuracy.
                </p>
                <p>
                  Every instrument carries our commitment: precise, dependable, and built to uphold the measurement standards that industry depends on.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/products/f1000.jpg"
                alt="F1000 Frequency Calibrator"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
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
                title: "Best-in-Class Accuracy",
                desc: "±0.005% for frequency and ±0.02% for resistance — industry-leading 1-year accuracy specifications.",
              },
              {
                icon: <Zap className="w-10 h-10 text-amber-500" />,
                title: "Versatile Compatibility",
                desc: "Compatible with frequency meters, counters, oscilloscopes, resistance meters, insulation testers, and more.",
              },
              {
                icon: <Target className="w-10 h-10 text-amber-500" />,
                title: "Portable & Lab-Ready",
                desc: "Lightweight instruments supporting permanent, site, and mobile calibration without sacrificing precision.",
              },
              {
                icon: <Shield className="w-10 h-10 text-amber-500" />,
                title: "Technical Support",
                desc: "Dedicated pre-sales consultation and after-sales support from our engineering team.",
              },
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm">{v.desc}</p>
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
