import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactUsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
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
          <p className="text-slate-600 text-lg">Need help with an order or technical support? We're here.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Our Office</h3>
                  <p className="text-sm text-slate-600">MakerStore India<br/>123 Innovation Drive, Sector 4<br/>Bangalore, Karnataka, 560001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone & WhatsApp</h3>
                  <p className="text-sm text-slate-600 mb-2">+91 98765 43210</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline">
                    <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                  <p className="text-sm text-slate-600">support@makerstore.in</p>
                  <p className="text-sm text-slate-600">sales@makerstore.in</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Operating Hours</h3>
                  <p className="text-sm text-slate-600">Monday - Saturday</p>
                  <p className="text-sm text-slate-600">10:00 AM – 9:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Technical Support</option>
                    <option>Bulk/B2B Order</option>
                    <option>Returns/Refunds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
                <p className="text-xs text-center text-slate-500">We typically respond within 24 hours.</p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-slate-200 w-full h-64 rounded-xl flex items-center justify-center border border-slate-300">
          <div className="text-center text-slate-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-medium">Map View Unavailable</p>
            <p className="text-sm">We're based in Bangalore, India</p>
          </div>
        </div>

      </div>
    </div>
  );
}