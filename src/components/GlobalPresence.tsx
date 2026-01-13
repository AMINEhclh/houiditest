import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { 
    name: "UK", 
    fullName: "United Kingdom", 
    coordinates: [-3.436, 55.3781], 
    size: "large",
    flagCode: "gb",
    labelOffset: { x: -60, y: -40 }
  },
  { 
    name: "South Africa", 
    fullName: "South Africa", 
    coordinates: [22.9375, -30.5595], 
    size: "large",
    flagCode: "za",
    labelOffset: { x: 70, y: 40 }
  },
  { 
    name: "Saudi Arabia", 
    fullName: "Saudi Arabia", 
    coordinates: [45.0792, 23.8859], 
    size: "large",
    flagCode: "sa",
    labelOffset: { x: 80, y: -30 }
  },
  { 
    name: "Tunisia", 
    fullName: "Tunisia", 
    coordinates: [9.5375, 33.8869], 
    size: "medium",
    flagCode: "tn",
    labelOffset: { x: 60, y: -45 }
  },
  { 
    name: "Algeria", 
    fullName: "Algeria", 
    coordinates: [1.6596, 28.0339], 
    size: "small", 
    flagCode: "dz",
    labelOffset: { x: -60, y: 55 }
  },
  { 
    name: "Netherlands", 
    fullName: "Netherlands", 
    coordinates: [5.2913, 52.1326], 
    size: "small",
    flagCode: "nl",
    labelOffset: { x: 60, y: -45 }
  },
  { 
    name: "Morocco", 
    fullName: "Morocco", 
    coordinates: [-7.0926, 31.7917], 
    size: "small", 
    flagCode: "ma",
    labelOffset: { x: -115, y: -10 }
  },
];

export function GlobalPresence() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const desktopZoom = 1.5;
  const desktopCenter: [number, number] = [15, 10];
  
  const mobileZoom = 2.2;
  const mobileCenter: [number, number] = [15, 25];

  return (
    <section className="py-16 md:py-24 px-2 md:px-4 relative overflow-hidden bg-[#10182c]">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-primary/10 shadow-2xl shadow-primary/5 bg-[#080c12]/50">
          <div className={`h-[70vh] md:h-auto md:aspect-[21/9] w-full flex items-center justify-center ${isMobile ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}>
            <ComposableMap
              projectionConfig={{
                scale: 160,
                center: [15, 0]
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(29,185,84,0.1)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              <ZoomableGroup 
                center={isMobile ? mobileCenter : desktopCenter} 
                zoom={isMobile ? mobileZoom : desktopZoom}
                minZoom={isMobile ? 1.5 : desktopZoom}
                maxZoom={isMobile ? 4 : desktopZoom}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo) => {
                      const countryName = geo.properties.name;
                      const isCountryHovered = hoveredCountry === countryName;
                      const isMarked = markers.some(m => m.fullName === countryName || m.name === countryName);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isCountryHovered ? "#1a2535" : (isMarked ? "rgba(29, 185, 84, 0.5)" : "#121a24")}
                          stroke="#1DB954"
                          strokeWidth={0.6}
                          strokeOpacity={isCountryHovered ? 0.8 : 0.4}
                          className="transition-all duration-500"
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#1a2535", outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {markers.map(({ name, coordinates, size, flagCode, labelOffset }, index) => {
                  const isHovered = hoveredCountry === name;
                  const dotSize = size === "large" ? 4 : size === "medium" ? 3 : 2;
                  const cardWidth = name.length > 8 ? 110 : 95;
                  const cardHeight = 36;
                  
                  const tx = labelOffset.x * 0.85;
                  const ty = labelOffset.y * 0.85;
                  const path = `M 0 0 Q ${tx * 0.1} ${ty} ${tx} ${ty}`;

                  return (
                    <Marker key={name} coordinates={coordinates as [number, number]}>
                      <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          delay: index * 0.1 
                        }}
                        onMouseEnter={() => setHoveredCountry(name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        className="cursor-pointer"
                      >
                        {/* Triple Pulsing Ripple Effect */}
                        <motion.circle
                          r={dotSize + 4}
                          fill="#1DB954"
                          fillOpacity={0.2}
                          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                          r={dotSize + 4}
                          fill="#1DB954"
                          fillOpacity={0.15}
                          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                        <circle
                          r={dotSize}
                          fill="#1DB954"
                          filter={isHovered ? "url(#glow)" : undefined}
                          className="transition-all duration-300"
                        />

                        <motion.path
                          d={path}
                          fill="none"
                          stroke="#1DB954"
                          strokeWidth={1.5}
                          strokeOpacity={isHovered ? 1 : 0.4}
                          strokeDasharray={isHovered ? "none" : "4 2"}
                          className="transition-all duration-300"
                          animate={isHovered ? { strokeDashoffset: 0 } : { strokeDashoffset: [0, -10] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />

                        <polygon
                          points={`${tx},${ty} ${tx-4},${ty-3} ${tx-4},${ty+3}`}
                          fill="#1DB954"
                          fillOpacity={isHovered ? 1 : 0.6}
                          transform={`rotate(${Math.atan2(ty, tx) * 180 / Math.PI}, ${tx}, ${ty})`}
                        />

                        {/* Floating Label Card */}
                        <motion.g 
                          transform={`translate(${labelOffset.x}, ${labelOffset.y})`}
                          animate={{ 
                            y: isHovered ? labelOffset.y : [labelOffset.y, labelOffset.y - 4, labelOffset.y] 
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                        >
                          <rect
                            x={-cardWidth / 2}
                            y={-cardHeight / 2}
                            width={cardWidth}
                            height={cardHeight}
                            rx="10"
                            fill="#080c12"
                            fillOpacity={isHovered ? 1 : 0.95}
                            stroke="#1DB954"
                            strokeWidth={isHovered ? 2 : 1}
                            strokeOpacity={isHovered ? 1 : 0.6}
                            className="transition-all duration-300"
                            style={{ filter: "drop-shadow(0 4px 12px rgba(29,185,84,0.1))" }}
                          />
                          
                          <image
                            href={`https://flagcdn.com/w80/${flagCode}.png`}
                            x={-cardWidth / 2 + 10}
                            y="-8"
                            width="24"
                            height="16"
                            className="rounded-sm"
                          />
                          
                          <text
                            x={-cardWidth / 2 + 40}
                            y="4"
                            textAnchor="start"
                            fontSize="11"
                            fontWeight="800"
                            fill="#fff"
                            className="transition-all duration-300"
                            style={{ fontFamily: "system-ui, sans-serif" }}
                          >
                            {name}
                          </text>
                        </motion.g>
                      </motion.g>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Floating Badge */}
          <motion.div 
            className="absolute top-4 left-4 md:top-6 md:left-6 z-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              initial: { duration: 0.5 },
              animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="bg-[#0a0f14]/95 backdrop-blur-md border border-primary/40 rounded-lg px-4 py-2 shadow-lg shadow-primary/10">
              <p className="text-[10px] md:text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                373+ Clients Worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
