import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  date: string;
  country: string;
  index: number;
}

const countryFlags: Record<string, string> = {
  "USA": "https://flagcdn.com/us.svg",
  "South Africa": "https://flagcdn.com/za.svg",
  "Tunisia": "https://flagcdn.com/tn.svg",
  "Algeria": "https://flagcdn.com/dz.svg",
  "Morocco": "https://flagcdn.com/ma.svg",
  "Saudi Arabia": "https://flagcdn.com/sa.svg",
  "Netherlands": "https://flagcdn.com/nl.svg"
};

export function TestimonialCard({ name, role, content, avatar, date, country, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[300px] md:w-[350px]"
    >
      <Card className="h-full bg-card border-border/40 hover:border-primary/20 transition-colors">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border border-border/40">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-foreground truncate">{name}</h4>
                <div className="flex items-center">
                  {countryFlags[country] ? (
                    <img 
                      src={countryFlags[country]} 
                      alt={country}
                      className="h-4 w-6 object-cover rounded-sm shadow-sm"
                      title={country}
                    />
                  ) : (
                    <span className="text-xl" title={country}>🌐</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">{role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#f4b400] text-[#f4b400]" />
            ))}
            <span className="text-[10px] text-muted-foreground ml-2 uppercase font-medium tracking-wider">
              {date}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-4">
            "{content}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
