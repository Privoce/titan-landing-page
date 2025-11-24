import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3, DollarSign, Target, Trophy, PiggyBank, Zap, Shield } from 'lucide-react';

const personas = [
  {
    title: 'Sales Teams',
    description: (
      <>
        Lack consistent guidance on pricing, competitive context, and negotiation. This leads to slow responses, inconsistent discounts, and lower win rates
      </>
    ),
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    accentColor: 'bg-blue-500',
    floatingCards: [
      { icon: DollarSign, label: 'Revenue Increase', value: '0.3%–7.5%', position: 'top-left' },
      { icon: Target, label: 'Win Rate Increase', value: '3%–5%', position: 'top-right' },
      { icon: Trophy, label: 'Customer Satisfaction', value: '10%–20%', position: 'bottom-left' },
    ]
  },
  {
    title: 'Pricing / Deal Desk / Revenue Operations Teams',
    description: (
      <>
        Operate with fragmented data and manual checks (margins, bundles, exceptions). High effort, repetitive analysis, and limited ability to enforce guardrails at scale
      </>
    ),
    gradient: 'from-cyan-500 via-blue-400 to-blue-500',
    accentColor: 'bg-cyan-500',
    floatingCards: [
      { icon: Target, label: 'Margin Increase', value: '0.5%–8%', position: 'top-left' },
      { icon: Zap, label: 'Efficiency Boost', value: '5×–10×', position: 'top-right' },
      { icon: Shield, label: 'Manual Analysis', value: '80% reduction', position: 'bottom-right' },
    ]
  },
  {
    title: 'Deal Approvers',
    description: (
      <>
        Lack real-time visibility into deal economics and policy compliance. High-volume manual approvals slow throughput and weaken pricing discipline
      </>
    ),
    gradient: 'from-blue-400 via-cyan-500 to-teal-400',
    accentColor: 'bg-teal-500',
    floatingCards: [
      { icon: PiggyBank, label: 'Costs Saved', value: '$100K–$1M', position: 'top-left' },
      { icon: TrendingUp, label: 'Revenue Increase', value: '$500K–$10M+', position: 'top-right' },
      { icon: Zap, label: 'Manual Approvals', value: '80% reduction', position: 'bottom-left' },
    ]
  }
];

const FloatingCard = ({ card, index }: { card: typeof personas[0]['floatingCards'][0], index: number }) => {
  const positions = {
    'top-left': '-left-4 -top-4',
    'top-right': '-right-4 -top-4',
    'bottom-left': '-left-4 -bottom-4',
    'bottom-right': '-right-4 -bottom-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      className={`absolute ${positions[card.position as keyof typeof positions]} z-10 hidden lg:block`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-3 min-w-[160px]"
      >
        <div className="flex items-center gap-2 mb-1">
          <card.icon className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-black font-medium">{card.label}</span>
        </div>
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">{card.value}</div>
      </motion.div>
    </motion.div>
  );
};

const PersonaIllustration = ({ persona, index }: { persona: typeof personas[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="relative w-full h-[280px] flex items-center justify-center">
        {persona.floatingCards.map((card, cardIndex) => (
          <FloatingCard key={cardIndex} card={card} index={cardIndex} />
        ))}

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-20 blur-3xl rounded-full`} />

          <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${persona.gradient} p-1 shadow-2xl`}>
            <div className="w-full h-full rounded-full bg-[#070716] border-2 border-white/10 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${persona.gradient} flex items-center justify-center`}
              >
                {index === 0 && <Users className="w-16 h-16 text-white drop-shadow-lg" />}
                {index === 1 && <BarChart3 className="w-16 h-16 text-white drop-shadow-lg" />}
                {index === 2 && <TrendingUp className="w-16 h-16 text-white drop-shadow-lg" />}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProblemsWeSolve() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.08),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-700">
              Who We Enable
            </span>
            <span className="text-slate-400 mx-3">&</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-blue-700 to-slate-900">
              What We Address
            </span>
          </h2>
          <div className="mx-auto max-w-7xl">
            <p className="text-xl text-black leading-relaxed text-justify">
              Most B2B organizations either lack a systematic deal operations system or maintain oversized Sales Operations,
              Deal Desk, and Pricing analyst teams that still need to manually analyze every deal — pricing, bundling,
              competitive benchmarking, negotiation strategy, and approvals
            </p>
            <p className="text-xl text-black leading-relaxed mt-3 text-justify">
              This reliance on gut-feel pricing and manual governance creates{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">0.5%–8% margin leakage</span>,{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">0.3%–7.5% revenue loss</span>, and{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">tens of thousands of dollars in analyst labor</span>{' '}
              spent on highly repetitive, low-leverage work
            </p>
          </div>
        </motion.div>

        <div className="space-y-12">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <PersonaIllustration persona={persona} index={index} />
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className={`inline-block px-4 py-2 rounded-full bg-blue-500/10 mb-2`}>
                      <span className={`text-sm font-semibold bg-gradient-to-r ${persona.gradient} bg-clip-text text-transparent`}>
                        Persona {index + 1}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{persona.title}</h3>
                    <p className="text-xl text-black leading-relaxed text-justify">
                      {persona.description}
                    </p>

                    <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
                      {persona.floatingCards.map((card, cardIndex) => (
                        <div key={cardIndex} className="bg-white/5 backdrop-blur-sm rounded-lg shadow border border-white/10 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <card.icon className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-black font-medium">{card.label}</span>
                          </div>
                          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">{card.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
