import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer,
} from "recharts";
import { 
  ArrowRight, 
  Star, 
  Globe, 
  TrendingUp,
  Sparkles,
  Users,
  Shield,
  ChevronLeft,
  Check,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuizData = {
  businessName: string;
  monthlyClients: string;
  monthlyRevenue: string;
  businessType: string;
  otherBusinessType: string;
  biggestProblem: string;
  email: string;
};

const slideVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center gap-2 text-[#1DB954] font-black py-2">
      <Timer className="w-5 h-5 animate-pulse" />
      <span className="text-lg md:text-xl tracking-widest">
        OFFER EXPIRES IN: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}

function TrustBadge({ count = "300+" }: { count?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-3">
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=User+${i}&background=random`;
                }}
              />
            </div>
          ))}
        </div>
        <span className="text-[10px] md:text-xs font-bold text-muted-foreground whitespace-nowrap uppercase tracking-wider">Trusted by {count} businesses</span>
      </div>
    </div>
  );
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    businessName: "",
    monthlyClients: "",
    monthlyRevenue: "",
    businessType: "",
    otherBusinessType: "",
    biggestProblem: "",
    email: "",
  });

  const totalSteps = 11;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleDataChange = (key: keyof QuizData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const chartData = useMemo(() => {
    return [
      { name: "0", value: 30 },
      { name: "1", value: 35 },
      { name: "2", value: 45 },
      { name: "3", value: 65 },
      { name: "4", value: 85 },
      { name: "5", value: 95 },
    ];
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="text-center space-y-8 py-6"
          >
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
                <span className="text-[#1DB954]">In 60 Seconds,</span><br />
                See how much revenue you're<br />
                leaving on the table
              </h1>
              <TrustBadge count="300+" />
            </div>
            <div className="flex flex-col items-center gap-4 pt-4">
              <p className="text-sm md:text-base font-bold text-muted-foreground">Answer 5 quick questions to unlock your custom growth roadmap.</p>
              <Button 
                onClick={nextStep} 
                className="rounded-full h-16 md:h-20 px-8 md:px-10 text-lg md:text-xl font-bold bg-[#1DB954] hover:bg-[#1ed760] text-white gap-3 shadow-[0_0_30px_rgba(29,185,84,0.25)] transition-all hover:scale-105 active:scale-95 border-none"
              >
                Get My Free Report <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <p className="text-[10px] md:text-xs text-muted-foreground opacity-60">
                We value your privacy. No spam, ever.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center shadow-[0_0_15px_rgba(29,185,84,0.15)]">
                  <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.5)]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/90">Free Analysis</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center shadow-[0_0_15px_rgba(29,185,84,0.15)]">
                  <Check className="w-7 h-7 md:w-8 md:h-8 text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.5)]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/90">Instant Results</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center shadow-[0_0_15px_rgba(29,185,84,0.15)]">
                  <ArrowRight className="w-7 h-7 md:w-8 md:h-8 text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.5)]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/90">No Obligation</span>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            key="step2"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="space-y-8 py-6 text-center"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                What is your business<br />name?
              </h2>
              <p className="text-lg text-muted-foreground">So we can customize your report.</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <Input 
                placeholder="e.g. Acme Plumbing" 
                value={data.businessName}
                onChange={(e) => handleDataChange("businessName", e.target.value)}
                className="h-16 text-lg px-6 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#1DB954] transition-all text-white placeholder:text-muted-foreground/30"
                autoFocus
              />
              <Button 
                onClick={nextStep} 
                disabled={!data.businessName} 
                className="w-full h-16 rounded-xl text-lg font-bold bg-[#155e3b] text-white/50 hover:bg-[#1DB954] hover:text-white transition-all disabled:opacity-50"
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        );

      case 3:
      case 4:
      case 5:
      case 6:
        const options = step === 3 
          ? ["0 – 20", "21 – 50", "51 – 100", "100+"]
          : step === 4 
          ? ["Less than $1,000", "$1,000 – $3,000", "$3,000 – $7,000", "$7,000+"]
          : step === 5
          ? ["Local services", "Online services", "Coaching / consulting", "E-commerce", "Other"]
          : ["Getting more leads/customers", "Professional online image", "Automating business tasks", "Scaling existing operations", "Other"];
        
        const titles = {
          3: "How many clients do you usually get per month?",
          4: "What is your average monthly revenue?",
          5: "What type of business do you run?",
          6: "What is the biggest problem you face now on your business?"
        };

        const field = step === 3 ? "monthlyClients" : step === 4 ? "monthlyRevenue" : step === 5 ? "businessType" : "biggestProblem";

        return (
          <motion.div 
            key={`step${step}`}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="space-y-8 py-6 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
              {titles[step as keyof typeof titles]}
            </h2>
            <div className="flex flex-col gap-3 max-w-lg mx-auto">
              {options.map((option) => (
                <Card 
                  key={option}
                  className={cn(
                    "cursor-pointer transition-all border-2 bg-white/5 hover:bg-white/10 rounded-xl",
                    data[field as keyof QuizData] === option 
                      ? "border-[#1DB954] bg-[#1DB954]/10" 
                      : "border-white/10"
                  )}
                  onClick={() => {
                    handleDataChange(field as keyof QuizData, option);
                    if (option !== "Other") setTimeout(nextStep, 200);
                  }}
                >
                  <CardContent className="p-4 md:p-5 text-center">
                    <span className="font-bold text-base md:text-lg text-white">{option}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            {(step === 5 && data.businessType === "Other") || (step === 6 && data.biggestProblem === "Other") ? (
              <div className="max-w-lg mx-auto space-y-3">
                <Input 
                  placeholder={step === 5 ? "Specify business type" : "Specify your challenge"} 
                  value={step === 5 ? data.otherBusinessType : data.biggestProblem === "Other" ? "" : data.biggestProblem}
                  onChange={(e) => {
                    if (step === 5) {
                      handleDataChange("otherBusinessType", e.target.value);
                    } else {
                      handleDataChange("biggestProblem", e.target.value);
                    }
                  }}
                  className="h-14 rounded-xl bg-white/5 border-white/10 text-white"
                />
                <Button 
                  onClick={nextStep} 
                  disabled={step === 5 ? !data.otherBusinessType : !data.biggestProblem} 
                  className="w-full h-14 rounded-xl bg-[#1DB954]"
                >
                  Continue
                </Button>
              </div>
            ) : null}
          </motion.div>
        );

      case 7:
        return (
          <motion.div 
            key="step7"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="text-center space-y-10 py-6"
          >
            <div className="space-y-3">
              <p className="text-[#1DB954] font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Personalized Results</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Here’s what's possible for <span className="text-[#1DB954]">{data.businessName}</span>'s growth over the next 12 months.
              </h2>
            </div>
            <div className="max-w-lg mx-auto grid grid-cols-1 gap-3 text-left">
              {[
                { text: "Generate +25% to +45% More Qualified Leads", icon: TrendingUp },
                { text: "Establish Market Authority & Trust Instantly", icon: Shield },
                { text: "Convert 2x More Visitors into High-Value Clients", icon: Users }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-5 bg-white/5 p-4 md:p-5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1DB954]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(29,185,84,0.1)]">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#1DB954] drop-shadow-[0_0_5px_rgba(29,185,84,0.5)]" />
                  </div>
                  <span className="font-bold text-base md:text-lg text-white">{item.text}</span>
                </div>
              ))}
              <p className="text-[10px] md:text-xs text-center text-muted-foreground opacity-60 mt-2 italic">
                Results based on data from 300+ similar businesses.
              </p>
            </div>
            <Button onClick={nextStep} className="w-full max-w-lg h-16 rounded-xl text-lg font-bold bg-[#1DB954] text-white">Unlock Full Analysis</Button>
          </motion.div>
        );

      case 8:
        return (
          <motion.div 
            key="step8"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="space-y-10 py-6 text-center"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">This Is How Customers<br />See Your Business Online</h2>
              <p className="text-lg text-muted-foreground">Without a proper website, 7 out of 10 local customers skip your business.</p>
            </div>
            <div className="relative pt-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/20 text-white/40 px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest z-10 shadow-sm border border-white/5 backdrop-blur-[2px]">
                Before
              </div>
              <div className="max-w-xs md:max-w-sm mx-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white p-0.5 md:p-1 opacity-85 grayscale-[0.2]">
                <div className="bg-[#f0f0f0] px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 rounded-t-[1.3rem] md:rounded-t-[1.8rem]">
                  <div className="flex gap-1">
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#28c940]" />
                  </div>
                  <div className="flex-1 bg-white rounded text-[7px] md:text-[8px] py-0.5 md:py-1 px-2 md:px-3 text-muted-foreground/50 flex items-center gap-1">
                    google.com/search?q={data.businessName.toLowerCase()}
                  </div>
                </div>
                <div className="p-6 md:p-8 text-left space-y-4 md:space-y-6 text-black">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{data.businessName.toLowerCase()}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
                        <span className="text-xs md:text-sm font-bold text-[#e67e22] flex items-center gap-1">
                          3.6
                        </span>
                        <div className="flex text-[#e67e22]">
                          {[1,2,3].map(i => <Star key={i} className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" />)}
                          <Star className="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-300" />
                          <Star className="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-300" />
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                          (7 reviews) <span className="text-red-500 text-[10px] md:text-xs">❌</span>
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1 flex items-center gap-1">
                        Unclaimed Profile <span className="text-red-500">❌</span>
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg md:rounded-xl flex items-center justify-center text-gray-300 font-bold text-lg md:text-xl">G</div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {['Website', 'Call', 'Directions', 'Save'].map(label => (
                      <div key={label} className="flex flex-col items-center gap-1 md:gap-1.5 opacity-20">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200" />
                        <span className="text-[8px] md:text-[9px] font-medium text-gray-400">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 md:space-y-3 pt-2 border-t border-gray-100">
                    <p className="text-[9px] md:text-[10px] text-gray-400 flex items-center gap-2">📍 123 Business Way, ST 12345</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 flex items-center gap-2">🕒 Open now: 9 AM - 5 PM</p>
                    <p className="text-[9px] md:text-[10px] text-red-500/80 font-bold flex items-center gap-2 italic">
                      🌐 No website linked <span className="text-[10px]">❌</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={nextStep} className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-9 px-4 py-2 w-full max-w-lg h-16 rounded-xl text-lg bg-[#1DB954] text-white font-bold">See the Professional Version</Button>
          </motion.div>
        );

      case 9:
        return (
          <motion.div 
            key="step9"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="space-y-10 py-6 text-center"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">This Is What Wins Customers</h2>
              <p className="text-lg text-muted-foreground">Customers trust you, click your website, and choose you.</p>
            </div>
            <div className="relative pt-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1DB954] text-white px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest z-10 shadow-[0_0_15px_rgba(29,185,84,0.4)]">
                After
              </div>
              <div className="max-w-xs md:max-w-sm mx-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-[#1DB954]/30 shadow-[0_0_30px_rgba(29,185,84,0.15)] bg-white p-0.5 md:p-1">
                <div className="bg-[#f0f0f0] px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 rounded-t-[1.3rem] md:rounded-t-[1.8rem]">
                  <div className="flex gap-1">
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#28c940]" />
                  </div>
                  <div className="flex-1 bg-white rounded text-[7px] md:text-[8px] py-0.5 md:py-1 px-2 md:px-3 text-muted-foreground/50 flex items-center gap-1">
                    google.com/search?q={data.businessName.toLowerCase()}
                  </div>
                </div>
                <div className="p-6 md:p-8 text-left space-y-4 md:space-y-6 text-black">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{data.businessName.toLowerCase()}</h3>
                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[7px] md:text-[8px]">✓</div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
                        <span className="text-xs md:text-sm font-bold text-[#e67e22] flex items-center gap-1">
                          4.7
                        </span>
                        <div className="flex text-[#e67e22]">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" />)}
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                          (124 reviews) <span className="text-[#1DB954] text-[10px] md:text-xs">✔</span>
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-blue-600 font-medium mt-0.5 md:mt-1 flex items-center gap-1">
                        Verified Business <span className="text-[#1DB954] text-[10px] md:text-xs">✔</span>
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1DB954] rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl">G</div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {[
                      { label: 'Website', icon: Globe },
                      { label: 'Call', icon: Users },
                      { label: 'Directions', icon: Shield },
                      { label: 'Save', icon: TrendingUp }
                    ].map(item => (
                      <div key={item.label} className="flex flex-col items-center gap-1 md:gap-1.5">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center relative">
                          <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                          {item.label === 'Website' && (
                            <span className="absolute -top-1 -right-1 text-[#1DB954] text-[8px] md:text-[10px] font-bold">✔</span>
                          )}
                        </div>
                        <span className="text-[8px] md:text-[9px] font-bold text-blue-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 md:space-y-3 pt-2 border-t border-gray-100">
                    <p className="text-[9px] md:text-[10px] text-gray-500 flex items-center gap-2">📍 123 Business Way, ST 12345</p>
                    <p className="text-[9px] md:text-[10px] text-gray-500 flex items-center gap-2">🕒 Open now: 9 AM - 5 PM</p>
                    <p className="md:text-[10px] text-blue-600 font-bold flex items-center gap-2 text-center text-[15px]">🌐 www.{data.businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                  <Button 
                    onClick={nextStep}
                    className="w-full h-11 md:h-12 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold rounded-lg md:rounded-xl text-sm md:text-base shadow-[0_4px_15px_rgba(29,185,84,0.3)] transition-all hover:scale-[1.02]"
                  >
                    Get This for My Business
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-w-lg mx-auto bg-[#1DB954]/10 border border-[#1DB954]/20 p-4 md:p-6 rounded-xl text-left flex items-start gap-3 md:gap-4">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1DB954] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm md:text-base">Trust & Authority</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Professional websites + strong Google presence = more calls, more trust, more sales.</p>
              </div>
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div 
            key="step10"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="space-y-10 py-6 text-center"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">Your Untapped Potential</h2>
              <p className="text-lg text-muted-foreground">Our AI-powered optimization can bridge the gap.</p>
            </div>

            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] space-y-6 md:space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-[#1DB954]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Live Potential Analysis</span>
                </div>
              </div>
              
              <div className="h-[180px] md:h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1DB954" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-end pt-4">
                <div className="text-left space-y-0.5">
                  <div className="text-3xl md:text-4xl font-black text-white opacity-40">30%</div>
                  <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground">Current</div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="text-5xl md:text-6xl font-black text-[#1DB954] drop-shadow-[0_0_15px_rgba(29,185,84,0.4)]">95%</div>
                  <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#1DB954]">Potential</div>
                </div>
              </div>
            </div>

            <Button onClick={nextStep} className="w-full max-w-lg h-16 rounded-xl text-lg font-bold bg-[#1DB954] text-white">
              See How to Achieve This
            </Button>
          </motion.div>
        );

      case 11:
        return (
          <motion.div 
            key="step11"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="text-center space-y-10 py-6"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">Last Chance to <span className="text-[#1DB954]">Save 20%</span> on Your<br />New High-Converting Website</h2>
              <p className="text-lg text-muted-foreground">We help serious business owners dominate their local market.</p>
            </div>

            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] space-y-6 md:space-y-8 relative">
              <div className="space-y-4">
                <div className="inline-block px-5 py-1.5 bg-[#1DB954] text-white rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                  Limited Time Offer
                </div>
                <div className="space-y-1 relative">
                  <motion.div 
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(29,185,84,0)",
                        "0 0 20px rgba(29,185,84,0.6)",
                        "0 0 0px rgba(29,185,84,0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-5xl md:text-7xl font-black text-white"
                  >
                    20% OFF
                  </motion.div>
                  <div className="text-lg md:text-xl font-black text-white pt-2 uppercase tracking-tight">Your First Website Build</div>
                  <div className="flex flex-col items-center gap-1 py-2">
                    <div className="flex items-center justify-center gap-2 text-[#1DB954] font-black">
                      <Users className="w-5 h-5 animate-pulse" />
                      <span className="text-sm md:text-base tracking-tight uppercase">
                        Only 3 spots left for January builds at this price
                      </span>
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      {[...Array(7)].map((_, i) => (
                        <div key={`off-${i}`} className="w-2 h-2 rounded-full bg-white/10" />
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <div key={`on-${i}`} className="w-2 h-2 rounded-full bg-[#1DB954] shadow-[0_0_8px_rgba(29,185,84,0.6)] animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                  <Input 
                    type="email"
                    placeholder="name@company.com" 
                    value={data.email}
                    onChange={(e) => handleDataChange("email", e.target.value)}
                    className="h-14 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/30"
                  />
                  <p className="text-[10px] md:text-xs text-center text-white/30 font-medium pt-1">
                    We'll email your coupon code instantly. No spam.
                  </p>
                </div>
                
                <TrustBadge count="300+" />

                <Button 
                  onClick={async () => {
                    // Send data in background without blocking
                    try {
                      fetch("/api/quiz-submission", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                      });
                    } catch (e) {
                      console.error("Submission failed", e);
                    }
                    setLocation("/lastchance");
                  }} 
                  disabled={!data.email.includes("@")}
                  className="w-full h-18 md:h-22 rounded-xl text-xl md:text-2xl font-black bg-[#1DB954] text-white shadow-[0_0_30px_rgba(29,185,84,0.25)] transition-all hover:scale-[1.02]"
                >
                  Claim My 20% Discount <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#1DB954]/30">
      {/* Progress Bar */}
      {step > 1 && step < 11 && (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-[60]">
          <motion.div 
            className="h-full bg-[#1DB954]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-20 md:pt-12 md:pb-24">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {step > 1 && step < 11 && (
        <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 flex justify-center pointer-events-none">
          <div className="max-w-3xl w-full flex justify-start pointer-events-auto">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg md:rounded-xl gap-2 h-10 md:h-12 px-4 md:px-6 text-sm md:text-base"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
