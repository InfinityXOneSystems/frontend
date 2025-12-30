import React from 'react';
import { Helmet } from 'react-helmet';
import { Check, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PricingPage = () => {
  const plans = [
    {
      name: "Node",
      price: "$0",
      period: "/month",
      desc: "Perfect for individual researchers and developers exploring the network.",
      features: [
        "Access to public datasets",
        "Basic query rate limits",
        "Community support",
        "1 Autonomous Agent"
      ],
      cta: "Initialize Node",
      featured: false
    },
    {
      name: "Nexus",
      price: "$299",
      period: "/month",
      desc: "For startups and data-driven teams needing real-time intelligence.",
      features: [
        "Real-time market vectors",
        "100k API calls / month",
        "Priority neural processing",
        "5 Autonomous Agents",
        "24/7 Dedicated Support"
      ],
      cta: "Upgrade to Nexus",
      featured: true
    },
    {
      name: "Sovereign",
      price: "Custom",
      period: "",
      desc: "Full enterprise infrastructure with dedicated private neural networks.",
      features: [
        "Unlimited API volume",
        "Private Neural Core deployment",
        "Custom model training",
        "Unlimited Agents",
        "White-glove integration"
      ],
      cta: "Contact Sales",
      featured: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Access Plans - Infinity X AI</title>
      </Helmet>

      <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#0066FF]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[rgb(var(--foreground))]">
              Secure Your <span className="text-[#0066FF]">Access</span>
            </h1>
            <p className="text-xl text-[rgb(var(--light-gray-text))] font-light">
              Choose the processing power that matches your ambition. All plans include military-grade encryption.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                  plan.featured 
                    ? 'bg-[#0066FF]/10 border-[#0066FF] shadow-[0_0_30px_rgba(0,102,255,0.2)]' 
                    : 'glass-panel border-[rgb(var(--foreground))]/10 hover:border-[#0066FF]/50'
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0066FF] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[rgb(var(--foreground))] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[rgb(var(--foreground))]">{plan.price}</span>
                    <span className="text-[rgb(var(--light-gray-text))] text-sm">{plan.period}</span>
                  </div>
                  <p className="text-[rgb(var(--light-gray-text))] text-sm mt-4 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feat, k) => (
                      <li key={k} className="flex items-start gap-3 text-sm text-[rgb(var(--light-gray-text))]">
                        <Check className="w-5 h-5 text-[#0066FF] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full py-6 text-sm font-bold uppercase tracking-widest ${
                    plan.featured 
                      ? 'bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-lg shadow-blue-900/20' 
                      : 'bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-[rgb(var(--foreground))]">System Protocol FAQ</h2>
            <div className="grid gap-6">
              {[
                { q: "How secure is the Titan Protocol?", a: "We utilize post-quantum cryptography (Kyber-1024) for all data transmission. Your data is mathematically secure against future quantum decryption threats." },
                { q: "Can I host my own node?", a: "Yes. Enterprise Sovereign plans allow for on-premise node deployment with air-gapped security options." },
                { q: "What data sources do you aggregate?", a: "We ingest over 40 petabytes of daily public and proprietary data across financial, supply chain, and geopolitical vectors." }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-6 rounded-xl border border-[rgb(var(--foreground))]/10">
                  <h3 className="font-bold text-[rgb(var(--foreground))] mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#0066FF]" /> {item.q}
                  </h3>
                  <p className="text-[rgb(var(--light-gray-text))] text-sm pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PricingPage;