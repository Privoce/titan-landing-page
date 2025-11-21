import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Zap,
  TrendingUp,
  Users,
  Package,
  Award,
  BarChart3,
  MessageSquare,
  Handshake,
  ShieldCheck
} from 'lucide-react';

const features = [
  {
    id: '01',
    title: 'AI-powered quoting',
    icon: Zap,
    description: [
      'Uses incoming deal information (products, prices, discounts, customer details)',
      'To place each deal into Aggressive, Balanced, or Premium price ranges and show relevant pricing, bundling, and competitor considerations',
      'Sellers can instantly see indicative pricing and deal demographics to set appropriate tones even for discovery'
    ],
    align: 'left',
  },
  {
    id: '02',
    title: 'Pricing corridor',
    icon: TrendingUp,
    description: [
      'Uses historical CRM and transaction data',
      'To map out and compare a new deal with similar past deals and give tiered pricing recommendations',
      'Each deal can be benchmarked against similar past deals, giving sellers clarity and ability to learn how to optimally price and negotiate'
    ],
    align: 'right',
  },
  {
    id: '03',
    title: 'Customer transaction history',
    icon: Users,
    description: [
      "Uses the customer's past purchases, volumes, timing, and product mix",
      'To identify and analyze buying patterns, renewal behavior, prior discount expectations, and give discount/configuration recommendations',
      'Sellers can offer tailored discounts and deal configurations that connect directly to the customer\'s past purchases, making customers feel understood, strengthening loyalty, and increasing win rates'
    ],
    align: 'left',
  },
  {
    id: '04',
    title: 'Cross-selling & Packaging Simulator',
    icon: Package,
    description: [
      'Uses historical data to group customers with similar needs and behaviors',
      'To match the current deal to the closest-fit group and suggest a product or package configuration based on typical requirements backed with rationale',
      'Sellers can instantly surface optimized configurations for similar customers and requests, and identify cross-sell and upsell opportunities to maximize deal value'
    ],
    align: 'right',
  },
  {
    id: '05',
    title: 'Value-based selling',
    icon: Award,
    description: [
      'Uses statistical models to estimate how much value each product feature delivers to comparable customers',
      'To quantify customer perceived values between features and visualize them, and recommend value statements for each feature during negotiation',
      'Sellers understand which parts of the offer drive the most perceived value for that customer, and how to sell those value points to maximize margin and win rate'
    ],
    align: 'left',
  },
  {
    id: '06',
    title: 'Quantitative competitive analysis',
    icon: BarChart3,
    description: [
      'Uses win–loss records and other structured inputs',
      'To forecast who might be potential competitors for each deal, and how they will price under each scenario',
      'Sellers understand competitor landscape to triangulate their pricing and offering'
    ],
    align: 'right',
  },
  {
    id: '07',
    title: 'Qualitative competitive analysis',
    icon: MessageSquare,
    description: [
      'Uses customer comments and external information',
      'To compare vendors on features, strengths, gaps, and generate probing questions and battle cards',
      'Sellers see what customers are comparing, understand win/loss drivers, and how to reinforce values in negotiations'
    ],
    align: 'left',
  },
  {
    id: '08',
    title: 'Negotiation playbook',
    icon: Handshake,
    description: [
      'Uses prior negotiation outcomes and internal rules',
      'To recommend starting points, expected objections, reasonable concessions, and required conditions for price changes',
      'Every seller becomes a negotiation master in winning more deals and getting more margin'
    ],
    align: 'right',
  },
  {
    id: '09',
    title: 'Deal approval process',
    icon: ShieldCheck,
    description: [
      'Uses deal attributes such as size, discount level, products, and risk flags',
      'To determine which approval levels are required, summarize key information for reviewers, automatically routing, and recommend optimal feedback for approvers',
      'Approvers can review deals quickly with less capacity occupied, and return clear & actionable feedback'
    ],
    align: 'left',
  },
];

const ProgressBar = ({ activeIndex }: { activeIndex: number }) => {
  return null;
};

const FeatureSection = ({
  feature,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const isDark = false;

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: feature.align === 'left' ? -80 : 80 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: feature.align === 'left' ? -80 : 80 }
      }
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-xl rounded-2xl" />
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border flex items-center justify-center backdrop-blur-sm ${
              isDark ? 'border-cyan-400/40' : 'border-cyan-500/50'
            }`}>
              <feature.icon className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <div className={`text-sm font-mono font-bold mb-1 ${
              isDark ? 'text-cyan-400/70' : 'text-cyan-600/80'
            }`}>
              {feature.id}
            </div>
            <h3 className={`text-4xl lg:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              {feature.title}
            </h3>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`h-1 w-24 rounded-full mb-6 ${
            isDark
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent'
              : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-transparent'
          }`}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="space-y-4">
        {feature.description.map((line, i) => {
          const isLastBullet = i === feature.description.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
              className={`flex items-start gap-4 ${
                isLastBullet
                  ? 'relative p-4 rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm'
                  : ''
              }`}
            >
              {isLastBullet && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 pointer-events-none"
                  animate={{
                    borderColor: isDark
                      ? ['rgba(34, 211, 238, 0)', 'rgba(34, 211, 238, 0.4)', 'rgba(34, 211, 238, 0)']
                      : ['rgba(8, 145, 178, 0)', 'rgba(8, 145, 178, 0.4)', 'rgba(8, 145, 178, 0)'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
              <div className={`relative ${isLastBullet ? '' : 'mt-2'}`}>
                <div className={`w-2 h-2 rounded-full ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                }`} />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className={`absolute inset-0 rounded-full ${
                    isDark ? 'bg-cyan-400/50' : 'bg-cyan-600/50'
                  }`}
                />
              </div>
              <p className={`text-xl leading-relaxed flex-1 font-normal ${
                isDark ? 'text-gray-300' : 'text-black'
              }`}>
                {line}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  const screenshotPlaceholder = (
    <motion.div
      initial={{ opacity: 0, x: feature.align === 'left' ? 80 : -80 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: feature.align === 'left' ? 80 : -80 }
      }
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute -top-8 left-0 right-0 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          isDark ? 'bg-red-400/60' : 'bg-red-500/80'
        }`} />
        <div className={`w-3 h-3 rounded-full ${
          isDark ? 'bg-yellow-400/60' : 'bg-yellow-500/80'
        }`} />
        <div className={`w-3 h-3 rounded-full ${
          isDark ? 'bg-green-400/60' : 'bg-green-500/80'
        }`} />
      </div>

      <div className={`relative aspect-[4/3] rounded-3xl border-2 backdrop-blur-xl overflow-hidden shadow-2xl ${
        isDark
          ? 'border-cyan-400/30 bg-gradient-to-br from-blue-950/60 via-slate-950/80 to-blue-950/60'
          : 'border-cyan-500/40 bg-gradient-to-br from-slate-100/80 via-white/90 to-slate-100/80'
      }`}>
        {index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 ? (
          <>
            <img
              src={
                index === 0
                  ? "/image copy copy.png"
                  : index === 1
                  ? "/image copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
                  : index === 2
                  ? "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
                  : index === 3
                  ? "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
                  : index === 4
                  ? "/image copy copy copy copy copy copy copy.png"
                  : index === 5
                  ? "/image copy copy copy copy copy copy copy copy.png"
                  : index === 6
                  ? "/image copy copy copy copy copy copy copy copy copy.png"
                  : index === 7
                  ? "/image copy copy copy copy copy copy copy copy copy copy.png"
                  : "/image copy copy copy copy copy copy copy copy copy copy copy.png"
              }
              alt={
                index === 0
                  ? "AI-powered quoting interface"
                  : index === 1
                  ? "Pricing corridor interface"
                  : index === 2
                  ? "Customer transaction history"
                  : index === 3
                  ? "Cross-selling and packaging simulator"
                  : index === 4
                  ? "Value-based selling"
                  : index === 5
                  ? "Quantitative competitive analysis"
                  : index === 6
                  ? "Qualitative competitive analysis"
                  : index === 7
                  ? "Negotiation playbook"
                  : "Deal approval process"
              }
              className="absolute inset-0 w-full h-full object-cover"
            />

            <motion.div
              className={`absolute inset-0 border-2 border-cyan-400/0 rounded-3xl transition-all duration-500 ${
                isDark ? 'group-hover:border-cyan-400/50' : 'group-hover:border-cyan-600/60'
              }`}
              animate={{
                boxShadow: isDark
                  ? [
                      '0 0 30px rgba(29, 169, 255, 0)',
                      '0 0 50px rgba(29, 169, 255, 0.3)',
                      '0 0 30px rgba(29, 169, 255, 0)',
                    ]
                  : [
                      '0 0 30px rgba(8, 145, 178, 0)',
                      '0 0 50px rgba(8, 145, 178, 0.3)',
                      '0 0 30px rgba(8, 145, 178, 0)',
                    ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(29,169,255,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,91,255,0.12),transparent_50%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(29,169,255,0.05)_50%,transparent_100%)]" />

            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage:
                  'linear-gradient(45deg, rgba(29,169,255,0.15) 25%, transparent 25%, transparent 75%, rgba(29,169,255,0.15) 75%, rgba(29,169,255,0.15))',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-2 flex items-center justify-center backdrop-blur-sm shadow-lg ${
                    isDark
                      ? 'border-cyan-400/50 shadow-cyan-500/30'
                      : 'border-cyan-600/60 shadow-cyan-600/40'
                  }`}
                >
                  <feature.icon className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} strokeWidth={1.5} />
                </motion.div>
                <p className={`text-sm font-mono font-semibold tracking-wider ${
                  isDark ? 'text-cyan-400/60' : 'text-cyan-700/70'
                }`}>
                  PREVIEW INTERFACE
                </p>
              </div>
            </div>

            <motion.div
              className={`absolute inset-0 border-2 border-cyan-400/0 rounded-3xl transition-all duration-500 ${
                isDark ? 'group-hover:border-cyan-400/50' : 'group-hover:border-cyan-600/60'
              }`}
              animate={{
                boxShadow: isDark
                  ? [
                      '0 0 30px rgba(29, 169, 255, 0)',
                      '0 0 50px rgba(29, 169, 255, 0.3)',
                      '0 0 30px rgba(29, 169, 255, 0)',
                    ]
                  : [
                      '0 0 30px rgba(8, 145, 178, 0)',
                      '0 0 50px rgba(8, 145, 178, 0.3)',
                      '0 0 30px rgba(8, 145, 178, 0)',
                    ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}
      </div>

      <div className="absolute -bottom-8 left-0 right-0 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 h-2 rounded-full overflow-hidden ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30'
                : 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30'
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <motion.div
              className={`h-full ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-700'
              }`}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{ width: '50%' }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="py-6 lg:py-8 relative"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            feature.align === 'right' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {feature.align === 'left' ? (
            <>
              <div>{textContent}</div>
              <div>{screenshotPlaceholder}</div>
            </>
          ) : (
            <>
              <div>{screenshotPlaceholder}</div>
              <div>{textContent}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        Math.floor(latest * features.length),
        features.length - 1
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(29,169,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,91,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.04),transparent_70%)]" />

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(29,169,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(29,169,255,0.6)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-600/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <ProgressBar activeIndex={activeIndex} />

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl pt-14 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/40 rounded-full mb-4 backdrop-blur-sm">
              <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600">
                Platform Capabilities
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-3 leading-tight">
              Complete Deal Intelligence{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700">
                Platform
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-600 to-transparent rounded-full mb-4"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-black leading-relaxed font-normal space-y-2 text-justify"
          >
            <p><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">30+ customizable integrated modules</span> built to align with your <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">data</span>, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">workflow</span>, and <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">pricing processes</span></p>
            <p>You decide which <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">insights the AI generates</span>, and each module can be tailored to reflect your <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">specific requirements</span></p>
            <p>Combine any set of modules and introduce new <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">bespoke ones</span> as needed</p>
            <p className="font-semibold mt-3">Below are example modules frequently deployed by enterprise clients</p>
          </motion.div>
        </div>

        {features.map((feature, index) => (
          <FeatureSection key={feature.id} feature={feature} index={index} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-600/40 to-transparent" />
    </section>
  );
}
