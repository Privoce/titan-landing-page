import { motion } from "framer-motion";
import { ArrowRight, Check, Cpu, Globe2, Shield, Star, Zap, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedBackdrop from "../components/ui/AnimatedBackdrop";
import BackToTopButton from "../components/ui/BackToTopButton";
import CursorSpotlight from "../components/ui/CursorSpotlight";
import FeatureTabs from "../components/ui/FeatureTabs";
import DynamicLogosMarquee from "../components/DynamicLogosMarquee";
import MagneticButton from "../components/ui/MagneticButton";
import ScrollProgressBar from "../components/ui/ScrollProgressBar";
import SectionReveal from "../components/ui/SectionReveal";
import TestimonialsCarousel from "../components/ui/TestimonialsCarousel";
import TitanAIDynamicPreview from "../components/TitanAIDynamicPreview";
import IndustryQuotesCarousel from "../components/ui/IndustryQuotesCarousel";
import ProblemsWeSolve from "../components/ProblemsWesolve";
import AICockpit from "../components/AICockpit";
import ProductFeatures from "../components/ProductFeatures";
import HolographicCockpit from "../components/ui/HolographicCockpit";
import TiltCard from "../components/ui/TiltCard";
import AnimatedRange from "../components/ui/animations/AnimatedRange";
import NumberFlip from "../components/ui/animations/NumberFlip";
import StatCounter from "../components/ui/animations/StatCounter";
import Logo from "../components/shared/Logo";
import Section from "../components/shared/Section";
import { cn } from "../lib/utils";

const content = {
  logos: Array.from({ length: 10 }).map((_, i) => ({ src: "", alt: `Logo ${i + 1}` })),
  testimonials: [
    { name: "Sarah Johnson", role: "VP of Sales, TechCorp", quote: "Titan AI increased our deal win rate by 35% and cut pricing cycle time in half.", logo: "" },
    { name: "Michael Chen", role: "Head of Revenue, DataFlow", quote: "The AI-powered negotiation guidance gave our team confidence in every pricing decision.", avatar: "" },
    { name: "Emily Rodriguez", role: "Chief Revenue Officer, CloudScale", quote: "We've seen immediate margin improvements. The ROI was clear within the first quarter." },
  ],
  industryQuotes: [
    {
      text: "A virtual deal desk operating entirely inside the enterprise cloud represents the future of pricing and commercial execution. Every decision is secure, governed, and aligned with corporate standards, with zero data ever leaving the organization.",
      author: "Head of Global AI Governance",
      title: "Head of Global AI Governance",
      company: "HP"
    },
    {
      text: "With Titan AI Deal Copilot, a single operator can effectively oversee what once required an entire deal-desk team. This is the next frontier of operational efficiency, streamlined, intelligent, and fully automated.",
      author: "VP of Revenue Operations",
      title: "VP of Revenue Operations",
      company: "China Telecom"
    },
    {
      text: "It's like having 500 expert pricing leaders standing beside every seller on every deal, guiding each step with perfect recall, comprehensive market intelligence, and consistently rational, data-driven recommendations. A virtual super-agent army elevating the entire revenue organization.",
      author: "Head of Packaging & Pricing",
      title: "Head of Packaging & Pricing",
      company: "Veza"
    },
    {
      text: "It replicates the capability of your best seller, and amplifies it across your entire sales team. Imagine your top performer multiplied tenfold and operationalized through a virtual agent. This is unquestionably the future.",
      author: "Pricing Leader",
      title: "Pricing Leader",
      company: "Xfactor.io"
    }
  ],
  features: [
    { icon: <Zap className="h-6 w-6" />, title: "AI-Powered Pricing", desc: "Dynamic pricing recommendations based on willingness to pay and competitive intelligence." },
    { icon: <Shield className="h-6 w-6" />, title: "Deal Intelligence", desc: "Real-time guidance on packaging, bundling, and value-based negotiation strategies." },
    { icon: <Cpu className="h-6 w-6" />, title: "Predictive Analytics", desc: "Forecast win rates and revenue outcomes for every deal scenario." },
    { icon: <Globe2 className="h-6 w-6" />, title: "Seller Enablement", desc: "Empower every seller with data-driven talk tracks and pricing authority." },
  ],
  faq: [
    {
      q: "What systems can Titan AI Deal Copilot integrate with?",
      a: "Titan AI integrates seamlessly with mainstream CRM, CPQ, and ERP systems, including Salesforce, HubSpot, DealHub, Conga, SAP, Workday, and NetSuite."
    },
    {
      q: "How long does deployment take?",
      a: "Typical deployment takes 2–3 months, using a 'PoC = Implementation' approach. We select a small region or a few representative accounts, build the full workflow and models, and run it in real business conditions. After measurable results, you decide on the go/no-go before subscription."
    },
    {
      q: "Who will use Titan AI Deal Copilot?",
      a: "Deal Copilot is usually rolled out in two phases:\n\nPhase 1: Deal Desk, Pricing Team, Revenue Operations\n\nPhase 2: Full Sales Team\n\nRollout can be adapted based on your team and organizational readiness."
    },
    {
      q: "What data do you need?",
      a: "We primarily use your internal data—historical quotes, wins/losses, pricing, discounts, product details, customer segmentation, and sales stages. We handle all cleaning, standardization, and feature engineering. You only need to provide raw data."
    },
    {
      q: "How much IT involvement is required?",
      a: "IT involvement depends on integration needs:\n\nNo integration needed → virtually zero IT resources required.\n\nIf deep CRM/ERP integration is desired → only light IT support such as API access, SSO support, or sandbox permissions.\n\nAll engineering and infrastructure work is handled by Titan AI."
    },
    {
      q: "What deployment models do you support?",
      a: "Titan AI offers flexible, enterprise-secure deployment models:\n\nFully Cloud — Run fully on Titan AI's secure cloud or your private cloud.\n\nOn-Prem / Virtual Desktop — Run entirely inside your environment; data never leaves your security boundary.\n\nHybrid — Models run on Titan AI infrastructure; data stays on your side."
    },
    {
      q: "How much does Titan AI cost?",
      a: "Pricing depends on deployment type, data volume, and company size. We can confirm that Titan AI is significantly more accessible than traditional enterprise pricing tools like Vendavo, Zilliant, and Pricefx—while delivering faster time-to-value and lower implementation overhead. For exact pricing, please contact our sales team."
    },
  ],
};

export default function TitanAIPage() {
  const sections = [
    { id: "hero", label: "Mission" },
    { id: "features", label: "Product" },
    { id: "showcase", label: "Industry perspectives" },
    { id: "team", label: "Team" },
    { id: "faq", label: "Q&A" },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="min-h-screen bg-[#070716] text-white relative">
      <AnimatedBackdrop />
      <CursorSpotlight />
      <ScrollProgressBar />
      <BackToTopButton />

      <header className="sticky top-0 z-40 backdrop-blur bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#hero" className="flex items-center">
            <img src="/EBE56E2F-2F79-4B9E-BC91-726C8F192B1E.jpeg" alt="Titan AI" className="h-10" />
          </a>
          <nav className="hidden items-center gap-6 text-base font-semibold md:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn("relative bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all", activeId === section.id && "from-blue-500 to-cyan-500")}
              >
                {section.label}
                {activeId === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <MagneticButton href="https://calendly.com/levytitanai/30min">
              Schedule demo <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </header>

      <Section id="hero" className="pt-12 sm:pt-16 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <HolographicCockpit />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative">
              {/* Semi-transparent dark background panel */}
              <div className="absolute -inset-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl" />

              {/* Content with relative positioning */}
              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Titan AI —{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                    World's 1st B2B Deal Copilot
                  </span>
                </motion.h1>
                <p className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed">
                  Forecast customer willingness to pay and competitor pricing to generate AI guidance for every deal and every seller, across packaging/bundling, value-based negotiation talk tracks, item-level pricing, and win rate
                </p>

                <div className="mt-6">
                  <MagneticButton href="https://calendly.com/levytitanai/30min" className="inline-flex items-center justify-center">
                    Schedule demo <ArrowRight className="h-4 w-4 ml-2" />
                  </MagneticButton>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg backdrop-blur-sm min-h-[100px]">
                      <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline justify-center gap-1 mb-1">
                        <AnimatedRange left={0.5} right={8} leftDecimals={1} rightDecimals={0} suffix="%" />
                      </div>
                      <div className="text-sm text-white/60 whitespace-nowrap text-center">margin uplift</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg backdrop-blur-sm min-h-[100px]">
                      <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline justify-center gap-1 mb-1">
                        <AnimatedRange left={5} right={10} leftDecimals={0} rightDecimals={0} suffix="×" />
                      </div>
                      <div className="text-sm text-white/60 whitespace-nowrap text-center">faster pricing cycle</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg backdrop-blur-sm min-h-[100px]">
                      <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline justify-center gap-1 mb-1">
                        <AnimatedRange left={0.3} right={7.5} leftDecimals={1} rightDecimals={1} suffix="%" />
                      </div>
                      <div className="text-sm text-white/60 whitespace-nowrap text-center">revenue increase</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-lg backdrop-blur-sm min-h-[120px]">
                      <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline justify-center gap-1 mb-1">
                        <AnimatedRange left={30} right={90} leftDecimals={0} rightDecimals={0} suffix="%" />
                      </div>
                      <div className="text-sm text-white/60 whitespace-nowrap text-center">related cost savings </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <TitanAIDynamicPreview />
          </div>
        </div>
      </Section>


      <ProblemsWeSolve />

      <AICockpit />

      <ProductFeatures />

      <Section id="showcase" className="pt-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="w-full px-6">
          <IndustryQuotesCarousel quotes={content.industryQuotes} />
        </div>
      </Section>

      <Section id="team" className="pt-0 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <SectionReveal>
            <div className="text-center mb-10">
              <h2 className="text-5xl font-bold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-700">
                  Our Team
                </span>
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-600 to-transparent rounded-full mb-6"
              />

              <div className="text-xl text-black max-w-6xl mx-auto leading-relaxed font-normal">
                <p>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800">Titan AI is a niche leader in next-generation sales and pricing solutions for the global technology sector.</span> Founded in 2023 and headquartered in New York, Titan AI has supported 20+ companies across the United States, China, and Sweden.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Two Column Content */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Deep pricing understanding */}
            <SectionReveal delay={0.2}>
              <div className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">$</span>
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-600">Deep B2B Sales & Pricing understanding</h3>
                </div>

                {/* Company Logos */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-end justify-start">
                    <img src="/Vendavo.png" alt="Vendavo" className="h-12 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" style={{marginBottom: '30px'}} />
                  </div>
                  <div className="flex items-end justify-end">
                    <img src="/BCG copy.png" alt="BCG" className="h-[120px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" style={{marginBottom: '-5px'}} />
                  </div>
                </div>

              </div>
            </SectionReveal>

            {/* Right Column - Best AI technical expertise */}
            <SectionReveal delay={0.4}>
              <div className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-600">Top AI technical expertise</h3>
                </div>

                {/* Company Logos */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-end justify-start">
                    <img src="/MIT.png" alt="MIT" className="h-[150px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" style={{marginBottom: '-60px'}} />
                  </div>
                  <div className="flex items-end justify-end">
                    <img src="/Google.png" alt="Google" className="h-[68px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" style={{marginBottom: '-20px'}} />
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

          {/* Leadership Team - Executive Cards */}
          <SectionReveal delay={0.6}>
            <div className="max-w-6xl mx-auto mt-12">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Executive Team</h3>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 - CEO */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800 bg-clip-text text-transparent mb-3">
                    Chief Executive Officer
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mb-4">Levy J.</p>
                  <p className="text-slate-700 leading-relaxed">
                    Co-led multiple $500M+ impact AI/ML-driven Sales and Revenue Transformations for F100 enterprises at global top consulting firms
                  </p>
                </div>

                {/* Card 2 - CTO */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800 bg-clip-text text-transparent mb-3">
                    Chief Technology Officer
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mb-4">Han S.</p>
                  <p className="text-slate-700 leading-relaxed">
                    Former Tencent AI engineer and MIT graduate on full scholarship; serial entrepreneur with deep expertise in full-stack productization and end-to-end AI/ML implementation
                  </p>
                </div>

                {/* Card 3 - CRO */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800 bg-clip-text text-transparent mb-3">
                    Chief Research Officer
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mb-4">Yifan X.</p>
                  <p className="text-slate-700 leading-relaxed">
                    Former Google Vertex AI Tech Lead and Apple engineer; specialist in ML model training, structured-data modeling, and LLM fine-tuning
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </Section>

      <Section id="faq" className="pt-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionReveal>
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Frequently Asked Questions
                </span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
              />
            </div>
          </SectionReveal>

          <div className="space-y-2">
            {content.faq.map((item, idx) => (
              <SectionReveal key={idx} delay={0.1 * idx}>
                <details className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-lg font-semibold text-white hover:text-cyan-400 transition-colors">
                    <span className="pr-4">{item.q}</span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-cyan-400" />
                  </summary>
                  <div className="px-6 pb-4 pt-2 text-white/80 leading-relaxed border-t border-white/5">
                    {item.a.split('\n').map((line, i) => (
                      <p key={i} className={line ? "mb-3 last:mb-0" : "mb-2"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.8}>
            <div className="mt-10 text-center">
              <p className="text-white/70 text-lg mb-4">Still have questions?</p>
              <MagneticButton href="https://calendly.com/levytitanai/30min">
                Contact Sales <ArrowRight className="h-4 w-4 ml-2" />
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </Section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/60">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <Logo />
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white">Status</a>
              <a href="#" className="hover:text-white">Security</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-xs">© {new Date().getFullYear()} Titan AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
