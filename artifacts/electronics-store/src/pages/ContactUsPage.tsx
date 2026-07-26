import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactUsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-600 text-lg">Get in touch for pricing, technical support, or product enquiries.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone & WhatsApp</h3>
                  <a href="tel:+918607620062" className="text-sm text-slate-600 hover:text-amber-600 transition-colors block mb-2">
                    +91 86076 20062
                  </a>
                  <a
                    href="https://wa.me/918607620062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
                  <a
                    href="mailto:admin@fusionprecisionperfect.com"
                    className="block text-sm text-slate-600 hover:text-amber-600 transition-colors mb-1 break-all"
                  >
                    admin@fusionprecisionperfect.com
                  </a>
                  <a
                    href="mailto:fusion.precision.perfeect@outlook.com"
                    className="block text-sm text-slate-600 hover:text-amber-600 transition-colors break-all"
                  >
                    fusion.precision.perfeect@outlook.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Website</h3>
                  <a
                    href="https://fusionprecisionperfect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    fusionprecisionperfect.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Operating Hours</h3>
                  <p className="text-sm text-slate-600">Monday – Saturday</p>
                  <p className="text-sm text-slate-600">10:00 AM – 9:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send an Enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" placeholder="+91 98765 43210" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white">
                    <option>Product Enquiry / Pricing</option>
                    <option>Technical Support</option>
                    <option>Bulk / Institutional Order</option>
                    <option>After-Sales Service</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none" placeholder="Describe your requirement or question in detail..."></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : <><Send className="w-5 h-5" /> Send Enquiry</>}
                </button>
                <p className="text-xs text-center text-slate-500">We typically respond within 24 hours on working days.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
