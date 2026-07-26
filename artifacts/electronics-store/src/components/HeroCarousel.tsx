import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "F1000 Digital Frequency Calibrator",
    subtitle: "Up to 1 MHz range. ±0.005% best-in-class accuracy.",
    image: "/products/f1000.jpg",
    link: "/products/f1000",
    overlay: "bg-slate-900/70",
  },
  {
    id: 2,
    title: "R1000 Precision Resistance Calibrator",
    subtitle: "10 mΩ to 100 MΩ range. ±0.02% accuracy. Portable & lab-ready.",
    image: "/products/r1000.jpg",
    link: "/products/r1000",
    overlay: "bg-slate-900/60",
  },
  {
    id: 3,
    title: "R1001 High Resistance Standard Box",
    subtitle: "1 MΩ to 20 GΩ at 1 kV. Ideal for insulation testers and meggers.",
    image: "/products/r1001.jpg",
    link: "/products/r1001",
    overlay: "bg-slate-900/65",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(current === SLIDES.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? SLIDES.length - 1 : current - 1);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden bg-slate-900">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 ${SLIDES[current].overlay} z-10`} />
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="max-w-2xl"
              >
                {/* Fusion Logo */}
                <div className="inline-flex mb-6 bg-white rounded-lg px-4 py-2 shadow-lg">
                  <img
                    src="/fusion-logo.png"
                    alt="Fusion Precision Perfect"
                    className="h-10 object-contain"
                  />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                  {SLIDES[current].title}
                </h1>
                <p className="text-base md:text-xl text-slate-200 mb-8 font-light leading-relaxed">
                  {SLIDES[current].subtitle}
                </p>
                <Link
                  href={SLIDES[current].link}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-slate-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  View Specifications
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              current === idx ? 'bg-amber-500 w-6' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
