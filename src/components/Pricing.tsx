import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '299',
    description: 'Perfect for small businesses getting started with AI pricing',
    features: [
      'Up to 1,000 SKUs',
      'Daily price updates',
      'Basic analytics',
      'Email support',
      'API access',
    ],
  },
  {
    name: 'Professional',
    price: '899',
    description: 'Ideal for growing businesses with complex pricing needs',
    features: [
      'Up to 10,000 SKUs',
      'Real-time price updates',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'Multi-channel support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations requiring maximum flexibility',
    features: [
      'Unlimited SKUs',
      'Real-time price updates',
      'Enterprise analytics',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Multi-channel support',
      'White-label options',
      'SLA guarantee',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-900/50 border rounded-2xl p-10 ${
                plan.popular
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                  : 'border-blue-900/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xl text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 text-xl">$</span>
                  )}
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-xl text-gray-400 ml-2">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-5 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xl text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800 text-white border border-blue-900/30 hover:bg-slate-700'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
