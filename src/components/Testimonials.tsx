import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'VP of Sales, TechRetail',
    content: 'PriceAI increased our revenue by 28% in just three months The AI recommendations are incredibly accurate and easy to implement',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CEO, eCommerce Plus',
    content: 'The real-time pricing adjustments have given us a significant competitive advantage Our profit margins have never been better',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Pricing Director, GlobalMart',
    content: 'Implementation was seamless, and the support team is outstanding We now optimize prices for over 50,000 products effortlessly',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience with PriceAI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-blue-900/20 rounded-xl p-10 hover:border-blue-700/40 transition-all"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="border-t border-blue-900/20 pt-6">
                <div className="font-semibold text-xl text-white">{testimonial.name}</div>
                <div className="text-xl text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
