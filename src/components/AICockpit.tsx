import { motion } from 'framer-motion';
import { Database, FileText, Brain, Network, DollarSign, Package, MessageSquare, Users, Shield } from 'lucide-react';

const inputSources = [
  { label: 'Quoting data', icon: FileText, delay: 0 },
  { label: 'CRM data', icon: Database, delay: 0.2 },
];

const outputModules = [
  { label: 'Pricing recommendations', icon: DollarSign, delay: 0 },
  { label: 'Packaging & bundling recommendations', icon: Package, delay: 0.1 },
  { label: 'Value-based negotiation playbook', icon: MessageSquare, delay: 0.2 },
  { label: 'Customer insights', icon: Users, delay: 0.3 },
  { label: 'Deal approval process', icon: Shield, delay: 0.4 },
];

const InputCard = ({ source, index }: { source: typeof inputSources[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: source.delay + 1, duration: 0.8 }}
      className="relative group"
    >
      <motion.div
        animate={{
          x: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        className="relative bg-gradient-to-r from-blue-950/40 to-cyan-950/20 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5 min-w-[240px] hover:border-cyan-400/50 transition-all"
        style={{
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl" />

        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          className="absolute inset-0 border border-cyan-400/20 rounded-xl blur-sm"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center border border-cyan-400/40">
            <source.icon className="w-5 h-5 text-cyan-300" />
          </div>
          <span className="text-base font-semibold text-white">{source.label}</span>
        </div>

        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-[2px] -mr-6"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4,
          }}
          style={{
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.8), transparent)',
          }}
        />

        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 -mr-7 rounded-full bg-cyan-400"
          animate={{
            x: [0, 20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const AIEngine = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 1.2 }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-600/25 to-cyan-500/30 blur-3xl rounded-full"
      />

      <motion.div
        className="relative w-[420px] rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-950/90 to-blue-950/80 backdrop-blur-xl overflow-hidden"
        style={{
          boxShadow: '0 0 80px rgba(6, 182, 212, 0.4), inset 0 0 80px rgba(6, 182, 212, 0.08)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)]" />

        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'linear-gradient(45deg, rgba(6,182,212,0.1) 25%, transparent 25%, transparent 75%, rgba(6,182,212,0.1) 75%, rgba(6,182,212,0.1))',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative px-6 py-8 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mb-6"
          >
            <h3 className="text-xl font-bold text-white mb-1">
              Titan AI Deal Copilot Engine
            </h3>
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              <span className="text-sm text-cyan-300 font-mono">PROCESSING</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-xl p-5 border border-blue-400/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent" />

            <div className="relative space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-bold text-white tracking-wide">LARGE LANGUAGE MODEL</span>
              </div>

              <div className="space-y-2 text-sm leading-relaxed text-white">
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Processes qualitative signals</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Synthesizes insights & explanations</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Generates plain-English guidance</span>
                </motion.div>
              </div>

              <div className="mt-4 space-y-1.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-gradient-to-r from-blue-400/50 via-cyan-400/30 to-transparent rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scaleX: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    style={{ width: `${95 - i * 8}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="bg-gradient-to-br from-cyan-900/40 to-blue-900/30 rounded-xl p-5 border border-cyan-400/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

            <div className="relative space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-bold text-white tracking-wide">MACHINE LEARNING ENGINE</span>
              </div>

              <div className="space-y-2 text-sm leading-relaxed text-white">
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Decision tree / neural network models</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Matches incoming deals to historical similar deals</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Clusters deals into ML nodes</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Within each node dynamically adjusts pricing predictors to recommend price</span>
                </motion.div>
              </div>

              <div className="mt-4 grid grid-cols-8 gap-1.5">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 bg-cyan-400/50 rounded-sm"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/20 rounded-2xl pointer-events-none"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 35}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-[2px] -ml-6"
          animate={{
            scaleX: [0, 1],
            opacity: [0, 0.8, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            background: 'linear-gradient(to left, rgba(6, 182, 212, 0.8), transparent)',
          }}
        />

        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-[2px] -mr-6"
          animate={{
            scaleX: [0, 1],
            opacity: [0, 0.8, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 0.3,
          }}
          style={{
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.8), transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const OutputCard = ({ module, index }: { module: typeof outputModules[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: module.delay + 2.5, duration: 0.8 }}
      className="relative"
    >
      <motion.div
        animate={{
          x: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        className="relative bg-gradient-to-l from-cyan-950/40 to-blue-950/20 backdrop-blur-md border border-cyan-500/40 rounded-xl p-5 min-w-[280px] hover:border-cyan-400/60 transition-all"
        style={{
          boxShadow: '0 0 35px rgba(6, 182, 212, 0.2)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-xl" />

        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className="absolute inset-0 border border-cyan-400/30 rounded-xl blur-sm"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/40 to-blue-600/40 flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
            <module.icon className="w-5 h-5 text-cyan-200" />
          </div>
          <span className="text-base font-semibold text-white">{module.label}</span>
        </div>

        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-[2px] -ml-6"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
          style={{
            background: 'linear-gradient(to left, rgba(6, 182, 212, 0.8), transparent)',
          }}
        />

        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 -ml-7 rounded-full bg-cyan-400"
          animate={{
            x: [20, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function AICockpit() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center justify-center py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.06),transparent_50%)]" />

      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="absolute inset-0 opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 bg-cyan-500/10 border border-cyan-400/40 rounded-full mb-6"
          >
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Enterprise AI Deal Intelligence Platform
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Titan AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
              Deal Copilot
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Dual-layer AI architecture that transforms enterprise data into intelligent, actionable deal guidance
          </p>
        </motion.div>

        <div className="relative w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-12 items-center min-h-[700px]">
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-2">Input Layer</h3>
                <p className="text-sm text-gray-300">Enterprise data sources</p>
              </motion.div>
              {inputSources.map((source, index) => (
                <InputCard key={index} source={source} index={index} />
              ))}
            </div>

            <div className="flex items-center justify-center">
              <AIEngine />
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-2">Output Layer</h3>
                <p className="text-sm text-gray-300">AI-generated guidance</p>
              </motion.div>
              {outputModules.map((module, index) => (
                <OutputCard key={index} module={module} index={index} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 rounded-full px-8 py-4 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
              <span className="text-base text-white font-medium">Real-time Processing</span>
            </div>
            <div className="w-px h-6 bg-cyan-400/30" />
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-base text-white font-medium">Dual AI Architecture</span>
            </div>
            <div className="w-px h-6 bg-cyan-400/30" />
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                Mission-Critical Enterprise System
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
