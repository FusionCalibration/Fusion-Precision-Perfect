import React from 'react';
import { Target, Zap, Users, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Indian Makers</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Since 2018, MakerStore has been the go-to destination for engineers, hobbyists, and students across India. We believe that innovation shouldn't be bottlenecked by access to quality components.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  MakerStore started in a small workshop in Bangalore when a group of engineering students got frustrated with the lack of reliable local suppliers for robotics parts and microcontrollers.
                </p>
                <p>
                  Importing components took weeks and local markets were flooded with counterfeit boards that would fry on the first upload. We decided to fix this by creating a supply chain dedicated solely to authentic, high-quality maker electronics.
                </p>
                <p>
                  Today, we ship thousands of orders monthly to every corner of India, from bustling metro cities to remote engineering colleges.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80" 
                alt="Workshop" 
                className="rounded-2xl shadow-xl w-full"
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
              { icon: <Shield className="w-10 h-10 text-amber-500" />, title: "100% Authentic Parts", desc: "No cheap clones. We source directly from official manufacturers." },
              { icon: <Zap className="w-10 h-10 text-amber-500" />, title: "Technical Expertise", desc: "Our support team is made up of real engineers who build things." },
              { icon: <Target className="w-10 h-10 text-amber-500" />, title: "Fair Pricing", desc: "Honest, transparent pricing with standard GST billing." },
              { icon: <Users className="w-10 h-10 text-amber-500" />, title: "Community First", desc: "We sponsor local hackathons and robotics competitions." }
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}