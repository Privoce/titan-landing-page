import { Database, Cpu, Target, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Database,
    title: 'Connect Your Data',
    description: 'Integrate your existing systems and data sources with our platform in minutes',
    step: '01',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our AI models analyze your data, market trends, and competitor pricing strategies',
    step: '02',
  },
  {
    icon: Target,
    title: 'Get Recommendations',
    description: 'Receive intelligent pricing recommendations tailored to your business goals',
    step: '03',
  },
  {
    icon: Rocket,
    title: 'Deploy & Optimize',
    description: 'Implement changes and watch as the AI continuously optimizes for maximum profit',
    step: '04',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started with AI-powered pricing in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-slate-900/50 border border-blue-900/20 rounded-xl p-8 hover:border-blue-700/40 transition-all">
                <div className="absolute -top-4 -right-4 text-6xl font-bold text-blue-950/50">
                  {step.step}
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg inline-block mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
