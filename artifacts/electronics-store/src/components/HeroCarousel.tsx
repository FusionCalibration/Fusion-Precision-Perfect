import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "Arduino & Microcontrollers",
    subtitle: "The brain of your next big project.",
    image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=1200&q=80",
    link: "/category/Arduino"
  },
  {
    id: 2,
    title: "Sensors & Modules",
    subtitle: "Give your creations the ability to see, hear, and feel.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    link: "/category/Sensors"
  },
  {
    id: 3,
    title: "Robotics & DIY",
    subtitle: "Motors, chassis, and everything that moves.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    link: "/category/Robotics & DIY"
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(current === SLIDES.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? SLIDES.length - 1 : current - 1);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-slate-900">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          <img 
            src={SLIDES[current].image} 
            alt={SLIDES[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center md:text-left md:justify-start">
            <div className="container mx-auto px-4 md:px-12 lg:px-24">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  {SLIDES[current].title}
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 mb-8 font-light">
                  {SLIDES[current].subtitle}
                </p>
                <Link 
                  href={SLIDES[current].link}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-slate-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Shop Now
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
            className={`w-2 h-2 rounded-full transition-all ${
              current === idx ? 'bg-amber-500 w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}