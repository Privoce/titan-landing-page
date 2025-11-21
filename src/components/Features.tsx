import { Brain, TrendingUp, Zap, Shield, BarChart3, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Models',
    description: 'Each deal can be systematically benchmarked against comparable historical transactions, providing sellers a quantitative baseline and insights into past success methodologies',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Optimization',
    description: 'Prices adjust dynamically based on demand, inventory levels, and market conditions in real-time',
  },
  {
    icon: Zap,
    title: 'Instant Implementation',
    description: 'Deploy pricing changes across all channels instantly with our seamless integration system',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Built-in safeguards and price floors ensure your margins are protected while maximizing revenue',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights and visualizations help you understand pricing performance and trends',
  },
  {
    icon: Globe,
    title: 'Multi-Market Support',
    description: 'Optimize pricing strategies across different regions, currencies, and market segments simultaneously',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smarter Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to implement intelligent, data-driven pricing strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 border border-blue-900/20 rounded-xl p-8 hover:bg-slate-900/80 hover:border-blue-700/40 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
