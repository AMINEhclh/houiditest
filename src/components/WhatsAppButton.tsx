import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
  text?: string;
}

export function WhatsAppButton({ 
  className, 
  size = "default", 
  text = "Get a Free Website Consultation",
  ...props 
}: WhatsAppButtonProps) {
  const phoneNumber = "21658444315";
  const message = encodeURIComponent("Hi Houidi, I'm interested in launching my website with AI. Can we talk?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl w-full sm:w-auto",
  };

  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDot(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-300 relative",
        "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20",
        "hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1",
        "active:translate-y-0 active:shadow-md",
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <MessageCircle className={cn(
        "fill-current", 
        size === "xl" ? "w-7 h-7" : "w-5 h-5"
      )} />
      <span>{text}</span>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={showDot ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20
        }}
        className={cn(
          "absolute bg-red-600 rounded-full flex items-center justify-center border-2 border-background ring-1 ring-red-600/20 shadow-lg",
          size === "sm" && "-top-0.5 -right-0.5 w-4 h-4",
          size === "default" && "-top-1 -right-1 w-5 h-5",
          size === "lg" && "-top-1.5 -right-1.5 w-6 h-6",
          size === "xl" && "-top-2 -right-2 w-8 h-8"
        )}
      >
        <span className={cn(
          "font-bold text-white leading-none",
          size === "sm" && "text-[8px]",
          size === "default" && "text-[10px]",
          size === "lg" && "text-[11px]",
          size === "xl" && "text-sm"
        )}>1</span>
      </motion.div>
    </motion.a>
  );
}
