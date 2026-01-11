import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FeatureCard } from "@/components/FeatureCard";
import { StatCard } from "@/components/StatCard";
import { Rocket, Zap, TrendingUp, CheckCircle, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Fallback: If autoplay fails, we could try to play on next user interaction
          const playOnInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('touchstart', playOnInteraction);
          };
          window.addEventListener('click', playOnInteraction);
          window.addEventListener('touchstart', playOnInteraction);
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Rocket,
      title: "AI-Powered Launch",
      description: "We leverage cutting-edge AI to build your site in a fraction of the time, reducing costs without cutting corners."
    },
    {
      icon: TrendingUp,
      title: "Built for Sales",
      description: "Pretty websites are nice. Profitable websites are better. We focus 100% on generating leads and customers."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Don't wait months for an agency. We get your professional presence live and taking orders in days."
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-primary/10">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3" preload="auto" />
      {/* Navigation / Header - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-foreground">
            Houidi<span className="text-primary">.com</span>
          </div>
          <div className="hidden md:block">
             <span className="text-sm font-medium text-muted-foreground">Serious Projects Only.</span>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        
        {/* HERO SECTION */}
        <section className="relative py-20 md:py-32 lg:py-40 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Accepting New Clients
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mb-8">
                We Help <span className="text-primary relative inline-block">
                  Serious
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> Small Businesses Launch Their First Website.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                Helped 33+ businesses generate more leads & sales with AI-powered simplicity. No fluff. Just results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <WhatsAppButton size="xl" />
              </div>
            </motion.div>
          </div>

          {/* Abstract Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-tr from-primary/5 to-purple-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </section>


        {/* SOCIAL PROOF SECTION */}
        <section className="py-16 border-y border-border/40 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/50">
              <StatCard index={0} value="33+" label="Businesses Helped" />
              <StatCard index={1} value="+600k TND" label="Client Revenue Generated" />
              <StatCard index={2} value="100%" label="Satisfaction Guarantee" />
            </div>
          </div>
        </section>


        {/* FEATURES SECTION */}
        <section className="py-24 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 text-foreground">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Serious Owners Choose Us</h2>
              <p className="text-lg text-muted-foreground">
                We don't build "art projects". We build business assets designed to grow your bottom line.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={idx}
                  {...feature}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>


        {/* FILTER SECTION - "Who We Work With" */}
        <section className="py-24 px-6 bg-secondary/20 text-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay grayscale" />
          {/* Office background texture */}
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Is This For You?</h2>
              <p className="text-lg text-muted-foreground">
                We maintain high standards to ensure every client gets our best work.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <CheckCircle className="text-primary w-6 h-6" />
                  We Work With
                </h3>
                <ul className="space-y-4">
                  {[
                    "Business owners ready to invest in growth",
                    "Those who value speed and quality",
                    "Service businesses needing more leads",
                    "Decision makers who respect the process"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-6 md:border-l md:border-border/40 md:pl-12"
              >
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <ShieldCheck className="text-muted-foreground/60 w-6 h-6" />
                  We Do NOT Work With
                </h3>
                <ul className="space-y-4">
                  {[
                    "Micromanagers who want to design it themselves",
                    "Projects with zero budget",
                    "Get-rich-quick schemes",
                    "People who disappear for weeks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-muted-foreground/40 text-sm mb-8 font-medium tracking-wide uppercase">
                Quality over Quantity. Always.
              </p>
            </div>
          </div>
        </section>


        {/* FINAL CTA */}
        <section className="py-24 px-6 text-center bg-background">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to Get Serious?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                Stop losing customers to competitors with better websites. Let's fix your online presence this week.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <WhatsAppButton size="xl" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                  <Clock className="w-4 h-4" />
                  <span>Limited spots available for {new Date().toLocaleString('default', { month: 'long' })}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      {/* FOOTER */}
      <footer className="py-8 bg-background border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Houidi.com. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
