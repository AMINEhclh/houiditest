import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { StatCard } from "@/components/StatCard";
import { Rocket, Zap, TrendingUp, CheckCircle, ShieldCheck, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import avatar1 from "@assets/stock_images/professional_busines_67f8713f.jpg";
import avatar2 from "@assets/stock_images/professional_busines_f8de6bd0.jpg";
import avatar3 from "@assets/stock_images/professional_busines_c608696a.jpg";
import avatar4 from "@assets/stock_images/professional_busines_266e3653.jpg";
import avatar5 from "@assets/stock_images/professional_busines_bb880468.jpg";
import avatar6 from "@assets/stock_images/professional_busines_507f3839.jpg";
import avatar7 from "@assets/stock_images/professional_busines_9f8987af.jpg";
import avatar8 from "@assets/stock_images/professional_busines_fc187bf4.jpg";
import avatar9 from "@assets/stock_images/professional_busines_081b7ea4.jpg";
import avatar10 from "@assets/stock_images/professional_busines_2be5c3c4.jpg";

export default function LastChance() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasChangedCTA, setHasChangedCTA] = useState(false);
  const [shouldAnimateCTA, setShouldAnimateCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targetSection = document.getElementById('is-this-for-you-section');
      const heroCtaSection = document.getElementById('hero-cta-section');
      
      if (targetSection && !hasChangedCTA) {
        const rect = targetSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
          setHasChangedCTA(true);
          setShouldAnimateCTA(true);
          setTimeout(() => {
            setShouldAnimateCTA(false);
          }, 1500);
        }
      }

      // Logic to hide header CTA on mobile if user scrolls back up to hero CTA
      if (isMobile && hasChangedCTA && heroCtaSection) {
        const rect = heroCtaSection.getBoundingClientRect();
        // If the hero CTA section is visible in the viewport, hide the header one
        if (rect.bottom > 0) {
          setHasChangedCTA(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasChangedCTA, isMobile]);

  const ctaText = hasChangedCTA ? "Let’s Talk" : "Get My Business Plan";

  useEffect(() => {
    const playNotification = () => {
      if (audioRef.current) {
        audioRef.current.muted = true;
        audioRef.current.play().then(() => {
          audioRef.current!.muted = false;
        }).catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current) {
              audioRef.current.muted = false;
              audioRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('touchstart', playOnInteraction);
            window.removeEventListener('scroll', playOnInteraction);
            window.removeEventListener('mousemove', playOnInteraction);
          };
          window.addEventListener('click', playOnInteraction);
          window.addEventListener('touchstart', playOnInteraction);
          window.addEventListener('scroll', playOnInteraction);
          window.addEventListener('mousemove', playOnInteraction);
        });
      }
    };

    const timer = setTimeout(playNotification, 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Rocket,
      title: "AI-Powered Launch",
      description: "Launch faster, spend less, get results sooner"
    },
    {
      icon: TrendingUp,
      title: "Built for Sales",
      description: "Every page designed to convert visitors"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Live in days, not months"
    }
  ];

  const testimonials = [
    {
      name: "Karim Zied",
      role: "Digital Marketing Lead",
      content: "The best partner for rapid web development. They don't just build sites; they build engines for business growth.",
      date: "4 DAYS AGO",
      country: "Algeria",
      avatar: avatar5
    },
    {
      name: "Ahmed Ben Salem",
      role: "E-commerce Store Owner",
      content: "Houidi.com transformed my business. We went from zero online presence to a high-converting store in just 5 days. Highly recommend!",
      date: "2 DAYS AGO",
      country: "Tunisia",
      avatar: avatar1
    },
    {
      name: "Leila Bourguiba",
      role: "Fashion Boutique Owner",
      content: "I love my new website! It's elegant, fast, and most importantly, it's actually bringing in new customers every day.",
      date: "6 DAYS AGO",
      country: "Morocco",
      avatar: avatar6
    },
    {
      name: "Sarah Mansour",
      role: "Local Service Provider",
      content: "The AI-powered approach is a game changer. The speed and quality are unmatched. My website looks professional and generates leads daily.",
      date: "1 WEEK AGO",
      country: "Tunisia",
      avatar: avatar2
    },
    {
      name: "Yassine Ayari",
      role: "Tech Consultant",
      content: "Impressive use of AI. The turnaround time was unbelievable, and the code quality is surprisingly solid for such a fast build.",
      date: "1 MONTH AGO",
      country: "Saudi Arabia",
      avatar: avatar7
    },
    {
      name: "Mohamed Dridi",
      role: "Restaurant Owner",
      content: "I was skeptical about AI, but the results speak for themselves. The conversion focus actually works. Our table bookings have increased significantly.",
      date: "3 DAYS AGO",
      country: "Tunisia",
      avatar: avatar3
    },
    {
      name: "Amel Gharbi",
      role: "Health & Wellness Coach",
      content: "Finally, a developer who understands marketing! My site finally reflects my brand and converts visitors into clients.",
      date: "3 WEEKS AGO",
      country: "Netherlands",
      avatar: avatar8
    },
    {
      name: "Ines Belhaj",
      role: "Consultancy Founder",
      content: "Fast, professional, and zero fluff. They understood exactly what my business needed. Best investment for my startup this year.",
      date: "2 WEEKS AGO",
      country: "Tunisia",
      avatar: avatar4
    },
    {
      name: "Omar Ben Ammar",
      role: "Real Estate Agent",
      content: "The lead generation features are incredible. I've seen a 40% increase in inquiries since we launched the new site.",
      date: "5 DAYS AGO",
      country: "South Africa",
      avatar: avatar9
    },
    {
      name: "Sami Kallel",
      role: "SaaS Founder",
      content: "Houidi.com is the secret weapon for any startup. They handle the web presence so we can focus on building the product.",
      date: "1 WEEK AGO",
      country: "USA",
      avatar: avatar10
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-primary/10">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3" preload="auto" />
      {/* Navigation / Header - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className={cn("flex flex-col", isMobile && "hidden")}>
            <div className="text-lg md:text-xl font-bold tracking-tight text-foreground leading-none">
              Houidi<span className="text-primary">.com</span>
            </div>
            <span className="text-[9px] md:text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">
              Websites built to convert
            </span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              initial={false}
              animate={{
                opacity: (hasChangedCTA || !isMobile) ? 1 : 0,
                scale: shouldAnimateCTA ? [1, 1.25, 0.95, 1.25, 1] : 1,
                x: (isMobile && hasChangedCTA) ? "-50%" : "0%",
                left: (isMobile && hasChangedCTA) ? "50%" : "auto",
                position: (isMobile && hasChangedCTA) ? "fixed" : "static",
                top: (isMobile && hasChangedCTA) ? "12px" : "auto",
              }}
              transition={shouldAnimateCTA ? { 
                scale: { duration: 1.2, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
                opacity: { duration: 0.3 }
              } : { 
                duration: 0.5,
                ease: "backOut"
              }}
              className={cn(
                (isMobile && hasChangedCTA) && "z-[60]"
              )}
            >
              <WhatsAppButton size="sm" text={ctaText} className={cn("md:flex", isMobile && "shadow-xl shadow-primary/20")} />
            </motion.div>
          </div>
        </div>
      </nav>
      <main className="pt-16 md:pt-20">
        
        {/* HERO SECTION */}
        <section className="relative py-12 md:py-32 lg:py-40 px-4 md:px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                Accepting New Clients
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mb-6 md:mb-8 leading-[1.1]">
                Based on Your Answers, Your Business Is <span className="text-primary relative inline-block">
                  Missing Online
                  <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> Opportunities.
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 text-balance leading-relaxed">Based on your answers, we identified clear gaps and opportunities. The next step is fixing them the right way.</p>

              <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                  ].map((src, i) => (
                    <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#0a0a0a] overflow-hidden bg-white/10 shrink-0">
                      <img 
                        src={src} 
                        alt="Customer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs md:text-sm font-bold text-muted-foreground whitespace-nowrap uppercase tracking-wider">Trusted by 300+ businesses</span>
              </div>

              <div className="max-w-xl mx-auto mb-10 md:mb-12">
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Quiz completed</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Analysis generated</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Strategy call next</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="hero-cta-section" className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
                  <WhatsAppButton size="xl" text="Get My Business Plan" className="w-full sm:w-auto" />
                  <p className="text-xs md:text-sm text-muted-foreground font-medium bg-secondary/30 px-4 py-1.5 rounded-full">
                    Free · No commitment · 10–15 min chat
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Abstract Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-tr from-primary/5 to-purple-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </section>


        {/* SOCIAL PROOF SECTION */}
        <section className="py-12 md:py-16 border-y border-border/40 bg-secondary/10 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-border/30">
              <StatCard index={0} value="300+" label="Businesses Transformed After Similar Analysis" />
              <div className="pt-6 md:pt-0">
                <StatCard index={1} value="$500k+" label="Revenue Generated Using Our Systems" />
              </div>
              <div className="pt-6 md:pt-0">
                <StatCard index={2} value="100%" label="Satisfaction — Or We Fix It" />
              </div>
            </div>
          </div>
        </section>


        {/* FEATURES SECTION */}
        <section className="py-20 md:py-24 px-4 md:px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 text-foreground">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Businesses Like Yours Need A System That Converts Visitors Into Customers.</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                We don't build "art projects". We build business assets designed to grow your bottom line.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={idx}
                  {...feature}
                  index={idx}
                />
              ))}
            </div>

            {/* TESTIMONIALS SLIDER */}
            <div id="testimonials-section" className="mt-24">
              <div className="relative overflow-hidden group">
                <motion.div 
                  animate={{ 
                    x: [0, -1750] 
                  }}
                  transition={{ 
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    }
                  }}
                  className="flex gap-6 w-max"
                >
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <TestimonialCard 
                      key={`${idx}-${testimonial.name}`} 
                      {...testimonial} 
                      index={idx} 
                    />
                  ))}
                </motion.div>
                
                {/* Gradient Fades for Scroll */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>


        {/* FILTER SECTION - "Who We Work With" */}
        <section id="is-this-for-you-section" className="py-24 px-6 bg-secondary/20 text-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay grayscale" />
          {/* Office background texture */}
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
                We don’t work with everyone
              </p>
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                We maintain high standards to ensure every client gets our best work.
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-[30px] mb-[30px]">Is This For You?</h2>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Fix What’s Holding Your Business Back?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">We already analyzed your business. Now let’s turn that insight into real growth.</p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <WhatsAppButton size="xl" text="Get My Business Plan" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Free · No commitment · 10–15 min chat
                  </p>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground mt-4"
                >
                  <Clock className="w-4 h-4" />
                  <span>Limited spots available for {new Date().toLocaleString('default', { month: 'long' })}</span>
                </motion.div>
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
