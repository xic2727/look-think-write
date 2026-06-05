import React from "react";

interface SVGProps {
  className?: string;
}

export const SnowmanSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/svg">
      {/* Background - Winter sky */}
      <rect width="400" height="280" rx="16" fill="url(#winterSkyGrad)" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="winterSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="60%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="snowmanGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="woodenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Snow Hills in Background */}
      <path d="M-20 280 Q80 180 200 240 T420 200 L420 280 Z" fill="#f8fafc" />
      <path d="M120 280 Q240 190 320 230 T440 210 L440 280 Z" fill="#ffffff" opacity="0.85" />
      
      {/* Snowy Tree Branch */}
      <path d="M0 60 Q60 50 120 80 Q90 100 0 80 Z" fill="#475569" />
      <path d="M10 58 Q60 48 110 77 Q85 88 10 75 Z" fill="#ffffff" />
      
      {/* Snowy House in Background */}
      <rect x="20" y="160" width="60" height="50" rx="4" fill="#cbd5e1" />
      <polygon points="15,160 50,130 85,160" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
      <rect x="35" y="180" width="15" height="30" fill="#94a3b8" />

      {/* SNOWMAN */}
      {/* Bottom snow globe */}
      <circle cx="200" cy="210" r="50" fill="url(#snowmanGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Middle snow globe */}
      <circle cx="200" cy="140" r="35" fill="url(#snowmanGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="200" cy="90" r="24" fill="url(#snowmanGrad)" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Buttons */}
      <circle cx="200" cy="130" r="4" fill="#1e293b" />
      <circle cx="200" cy="145" r="4" fill="#1e293b" />
      <circle cx="200" cy="190" r="5" fill="#1e293b" />
      <circle cx="200" cy="210" r="5" fill="#1e293b" />

      {/* Eyes */}
      <circle cx="192" cy="85" r="2.5" fill="#1e293b" />
      <circle cx="208" cy="85" r="2.5" fill="#1e293b" />

      {/* Carrot Nose */}
      <polygon points="200,88 230,94 200,96" fill="#f97316" stroke="#ea580c" strokeWidth="1" />

      {/* Chili Smile嘴巴 */}
      <path d="M190 98 Q200 108 210 98" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

      {/* Purple Hat bucket */}
      <path d="M178 72 L222 72 L212 40 L188 40 Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
      <ellipse cx="200" cy="72" rx="25" ry="5" fill="#7c3aed" />

      {/* Branch Hands / Candies (冰糖葫芦) */}
      {/* Left arm */}
      <line x1="168" y1="130" x2="120" y2="100" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      {/* Right arm - Candies */}
      <line x1="232" y1="130" x2="278" y2="105" stroke="#78350f" strokeWidth="3" />
      <circle cx="250" cy="120" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <circle cx="264" cy="112" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <circle cx="278" cy="104" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      {/* Honey shine on candies */}
      <circle cx="248" cy="118" r="2" fill="#ffffff" opacity="0.6" />
      <circle cx="262" cy="110" r="2" fill="#ffffff" opacity="0.6" />

      {/* Children elements (Decorations around) */}
      {/* Yellow coat kid rolling snowball - bottom right */}
      <g transform="translate(280, 180)">
        {/* Kid body */}
        <ellipse cx="40" cy="40" rx="16" ry="24" fill="#eab308" />
        <ellipse cx="40" cy="12" rx="10" ry="10" fill="#fde047" />
        {/* Legs */}
        <rect x="28" y="58" width="8" height="15" fill="#2563eb" rx="2" />
        <rect x="44" y="58" width="8" height="15" fill="#2563eb" rx="2" />
        {/* Giant snowball */}
        <circle cx="0" cy="45" r="32" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M-15 30 Q-5 45 15 35" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      </g>

      {/* Pink coat girl inserting nose */}
      <g transform="translate(110, 80)">
        {/* Coat */}
        <path d="M30 40 L50 90 L10 90 Z" fill="#ec4899" />
        {/* Head */}
        <circle cx="30" cy="28" r="12" fill="#fed7aa" />
        {/* Wool hat */}
        <path d="M18 28 A12 12 0 0 1 42 28 Z" fill="#ebf8ff" />
        <circle cx="30" cy="12" r="4" fill="#ebf8ff" />
        {/* Boots */}
        <rect x="18" y="90" width="10" height="10" fill="#9333ea" />
        <rect x="32" y="90" width="10" height="10" fill="#9333ea" />
      </g>

      {/* Flying snowballs */}
      <circle cx="110" cy="130" r="5" fill="#ffffff" />
      <circle cx="280" cy="70" r="5" fill="#ffffff" />
      <circle cx="160" cy="40" r="4" fill="#ffffff" />
    </svg>
  );
};

export const CartSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/svg">
      {/* Background - Afternoon Golden Road */}
      <rect width="400" height="280" rx="16" fill="url(#autumnSkyGrad)" />

      <defs>
        <linearGradient id="autumnSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#fef08a" opacity="0.5" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <linearGradient id="cartBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Ground road line */}
      <path d="M-10 230 Q150 220 410 230 L410 280 L-10 280 Z" fill="#e2e8f0" />
      <path d="M-10 230 Q150 220 410 230" fill="none" stroke="#cbd5e1" strokeWidth="4" />

      {/* Distant trees */}
      <path d="M320 220 C310 180 370 160 380 220 Z" fill="#84cc16" opacity="0.6" />
      <path d="M340 220 C330 190 390 170 390 220 Z" fill="#a3e635" opacity="0.4" />

      {/* THE GOODS - Apples / Apples Basket in cart */}
      {/* Basket 1 */}
      <rect x="180" y="110" width="45" height="30" rx="4" fill="#f59e0b" />
      {/* Apples on basket 1 */}
      <circle cx="190" cy="105" r="8" fill="#ef4444" />
      <circle cx="202" cy="102" r="8" fill="#f43f5e" />
      <circle cx="215" cy="106" r="8" fill="#ef4444" />
      <circle cx="196" cy="95" r="8" fill="#dc2626" />
      <circle cx="210" cy="96" r="8" fill="#ef4444" />

      {/* Basket 2 */}
      <rect x="230" y="115" width="45" height="25" rx="4" fill="#d97706" />
      {/* Oranges on basket 2 */}
      <circle cx="238" cy="112" r="8" fill="#f97316" />
      <circle cx="250" cy="110" r="8" fill="#fb923c" />
      <circle cx="264" cy="112" r="8" fill="#f97316" />
      <circle cx="244" cy="103" r="8" fill="#ea580c" />
      <circle cx="258" cy="104" r="8" fill="#f97316" />

      {/* CART BODY */}
      <rect x="160" y="130" width="130" height="55" rx="6" fill="url(#cartBodyGrad)" stroke="#78350f" strokeWidth="2" />
      
      {/* Cart shaft handle bars */}
      <line x1="285" y1="160" x2="340" y2="185" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
      <line x1="285" y1="168" x2="335" y2="192" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />

      {/* Left Kid (丁丁) pushing hard from back */}
      <g transform="translate(70, 120)">
        {/* Legs in push stance */}
        <line x1="25" y1="90" x2="5" y2="110" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
        <line x1="35" y1="90" x2="45" y2="110" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
        {/* Torso tilted */}
        <path d="M15 45 L50 80 L35 90 L8 55 Z" fill="#3b82f6" />
        {/* Red scarf (红领巾) blowing backwards */}
        <path d="M12 40 L-10 32 L2 48 Z" fill="#ef4444" />
        <path d="M12 40 L-6 50 L8 44 Z" fill="#ef4444" />
        <circle cx="12" cy="42" r="3" fill="#dc2626" />
        {/* Head */}
        <circle cx="20" cy="20" r="14" fill="#ffedd5" />
        {/* Hair */}
        <path d="M6 16 C6 4 34 4 34 16 C34 16 30 10 20 10 C10 10 6 16 6 16 Z" fill="#1e293b" />
        {/* Closed eyes of effort */}
        <path d="M15 22 Q20 25 24 22" fill="none" stroke="#1e293b" strokeWidth="1.5" />
        {/* Hands pushing */}
        <line x1="32" y1="52" x2="90" y2="52" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Cart Wheel */}
      <circle cx="225" cy="205" r="30" fill="#475569" stroke="#1e293b" strokeWidth="4" />
      <circle cx="225" cy="205" r="22" fill="#94a3b8" />
      <circle cx="225" cy="205" r="5" fill="#475569" />
      {/* Spokes of wheel */}
      <line x1="225" y1="175" x2="225" y2="235" stroke="#475569" strokeWidth="2" />
      <line x1="195" y1="205" x2="255" y2="205" stroke="#475569" strokeWidth="2" />

      {/* Pulling Uncle in front */}
      <g transform="translate(310, 115)">
        {/* Legs running/pulling */}
        <line x1="30" y1="95" x2="15" y2="115" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <line x1="30" y1="95" x2="50" y2="115" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        {/* Body bending forward */}
        <path d="M15 35 L50 35 L40 95 L10 85 Z" fill="#10b981" />
        {/* Head sweating */}
        <circle cx="25" cy="14" r="14" fill="#fed7aa" />
        <path d="M11 11 C11 2 39 2 39 11 Z" fill="#fdba74" />
        {/* Cap */}
        <ellipse cx="25" cy="4" rx="14" ry="4" fill="#047857" />
        <rect x="25" y="0" width="16" height="5" fill="#047857" rx="1" />
        {/* Sweat drops */}
        <circle cx="3" cy="16" r="2.5" fill="#38bdf8" />
        <circle cx="5" cy="30" r="1.5" fill="#38bdf8" />
        {/* Smile/gasp mouth */}
        <path d="M18 18 Q23 24 28 18" fill="none" stroke="#1e293b" strokeWidth="2" />
        {/* Arms holding the shaft handle */}
        <line x1="15" y1="55" x2="0" y2="70" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const HandkerchiefSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/svg">
      {/* Background - Sunny garden yard */}
      <rect width="400" height="280" rx="16" fill="url(#gardenSkyGrad)" />

      <defs>
        <linearGradient id="gardenSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="60%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="basinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Green grass hill */}
      <path d="M-10 215 Q120 185 240 210 T410 195 L410 280 L-10 280 Z" fill="#4ade80" />
      <path d="M-10 230 Q220 210 410 240 L410 280 L-10 280 Z" fill="#22c55e" opacity="0.6" />

      {/* Sun in upper right corner */}
      <circle cx="350" cy="50" r="25" fill="#f97316" />
      <circle cx="350" cy="50" r="20" fill="#facc15" />

      {/* Little Girl (小丽) sitting on small chair */}
      <g transform="translate(100, 70)">
        {/* Child wooden Chair stool */}
        <rect x="65" y="100" width="8" height="45" fill="#a16207" />
        <rect x="40" y="100" width="8" height="45" fill="#a16207" />
        <rect x="35" y="90" width="45" height="12" fill="#ca8a04" rx="2" />
        {/* Chair Back */}
        <rect x="75" y="55" width="8" height="50" fill="#a16207" />
        <rect x="72" y="50" width="12" height="15" fill="#ca8a04" rx="1" />

        {/* Legs of Girl */}
        <rect x="45" y="95" width="10" height="35" fill="#ffedd5" rx="3" />
        <rect x="42" y="125" width="15" height="8" fill="#ec4899" rx="2" />

        {/* Torso / Clothes (橘黄色裙子) */}
        <path d="M25 60 L65 60 L55 100 L25 100 Z" fill="#f97316" />
        
        {/* Head */}
        <circle cx="45" cy="25" r="16" fill="#ffedd5" />
        {/* Hair */}
        <circle cx="34" cy="20" r="8" fill="#1e293b" />
        <circle cx="56" cy="20" r="8" fill="#1e293b" />
        <path d="M29 20 C29 4 61 4 61 20 C61 20 55 10 45 10 C35 10 29 20 29 20 Z" fill="#1e293b" />
        {/* Big pink ribbon hair decoration */}
        <path d="M28 10 L38 5 L33 13 Z" fill="#f43f5e" />
        <path d="M28 10 L18 5 L23 13 Z" fill="#f43f5e" />
        <circle cx="28" cy="10" r="3" fill="#e11d48" />

        {/* Facial details */}
        <circle cx="39" cy="25" r="1.5" fill="#1e293b" />
        <circle cx="51" cy="25" r="1.5" fill="#1e293b" />
        <path d="M42 30 Q45 34 48 30" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />

        {/* Arm stretching and holding hand-kerchief */}
        <line x1="55" y1="65" x2="105" y2="40" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" />
        <line x1="28" y1="65" x2="-5" y2="72" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* SNOW WHITE HANDKERCHIEF (小手帕) being held up */}
      <g transform="translate(195, 80)">
        {/* Handkerchief body */}
        <path d="M5 10 Q35 0 65 10 L60 65 Q30 75 0 65 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        {/* Scallop edge decoration */}
        <path d="M5 10 Q12 11 20 10 Q28 9 35 10 Q42 11 50 10 Q58 9 65 10 L64 20 Q63 30 62 40 L60 65 Q50 67 40 68 Q30 69 20 68" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,3" />
        {/* Embroidered beautiful pink flower */}
        <circle cx="32" cy="35" r="5" fill="#facc15" />
        <circle cx="24" cy="35" r="5" fill="#ec4899" />
        <circle cx="40" cy="35" r="5" fill="#ec4899" />
        <circle cx="32" cy="27" r="5" fill="#ec4899" />
        <circle cx="32" cy="43" r="5" fill="#ec4899" />
        {/* Green leaf stems */}
        <path d="M32 48 Q28 55 22 58" fill="none" stroke="#22c55e" strokeWidth="2" />
        <ellipse cx="25" cy="55" rx="3" ry="5" transform="rotate(-30, 25, 55)" fill="#4ade80" />
      </g>

      {/* THE BLUE WASH BASIN (大脸盆) with bubbles */}
      <g transform="translate(130, 205)">
        {/* Basin Outer Ellipse rim */}
        <ellipse cx="60" cy="18" rx="60" ry="18" fill="url(#basinGrad)" stroke="#0284c7" strokeWidth="2" />
        {/* Lower Basin base body */}
        <path d="M12 25 C18 45 102 45 108 25" fill="none" stroke="#0284c7" strokeWidth="2" />
        <path d="M10 20 L18 42 C18 42 35 48 60 48 C85 48 102 42 102 42 L110 20 Z" fill="#0284c7" />
        
        {/* Swirling water */}
        <ellipse cx="60" cy="16" rx="52" ry="12" fill="#38bdf8" />
        <path d="M25 15 Q60 22 95 15" fill="none" stroke="#7dd3fc" strokeWidth="2.5" />
        
        {/* Soapy Foam/Bubbles */}
        <circle cx="40" cy="11" r="5" fill="#ffffff" opacity="0.9" />
        <circle cx="46" cy="13" r="4" fill="#ffffff" opacity="0.9" />
        <circle cx="36" cy="15" r="3" fill="#ffffff" opacity="0.9" />
        <circle cx="80" cy="12" r="6" fill="#ffffff" opacity="0.9" />
        <circle cx="74" cy="11" r="4" fill="#ffffff" opacity="0.9" />
      </g>

      {/* Soap Container on the grass */}
      <g transform="translate(265, 230)">
        <rect width="25" height="12" rx="3" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
        <rect x="2" y="-4" width="21" height="8" rx="2" fill="#ffedd5" stroke="#ca8a04" strokeWidth="1" />
      </g>
    </svg>
  );
};

export const RabbitBalloonSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/svg">
      {/* Background - Forest landscape */}
      <rect width="400" height="280" rx="16" fill="url(#forestSkyGrad)" />

      <defs>
        <linearGradient id="forestSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
      </defs>

      {/* Forest back trees */}
      <path d="M-20 220 C20 140 100 130 140 220 Z" fill="#15803d" opacity="0.30" />
      <path d="M60 225 C110 150 190 140 240 225 Z" fill="#166534" opacity="0.25" />
      <path d="M260 230 C300 160 380 150 410 230 Z" fill="#15803d" opacity="0.35" />

      {/* Ground road */}
      <path d="M-10 220 Q200 205 410 220 L410 280 L-10 280 Z" fill="#4ade80" />
      <path d="M-10 235 Q200 220 410 235 L410 280 L-10 280 Z" fill="#22c55e" opacity="0.5" />

      {/* Left panel element: CRYING RABBIT (小白兔) */}
      <g transform="translate(50, 110)">
        {/* Tail */}
        <circle cx="5" cy="85" r="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        {/* Legs */}
        <rect x="15" y="90" width="10" height="12" fill="#ffffff" rx="2" stroke="#cbd5e1" />
        <rect x="28" y="90" width="10" height="12" fill="#ffffff" rx="2" stroke="#cbd5e1" strokeWidth="1" />
        {/* Fat Rabbit Torso (条纹衣服) */}
        <ellipse cx="25" cy="65" rx="18" ry="24" fill="#fb7185" />
        <rect x="10" y="55" width="30" height="6" fill="#fde047" />
        <rect x="8" y="68" width="34" height="6" fill="#fde047" />

        {/* Head */}
        <circle cx="34" cy="35" r="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

        {/* Ears */}
        {/* Left ear */}
        <ellipse cx="28" cy="10" rx="4" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" transform="rotate(-15, 28, 10)" />
        <ellipse cx="28" cy="10" rx="2" ry="10" fill="#fecdd3" transform="rotate(-15, 28, 10)" />
        {/* Right ear */}
        <ellipse cx="40" cy="10" rx="4" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" transform="rotate(15, 40, 10)" />
        <ellipse cx="40" cy="10" rx="2" ry="10" fill="#fecdd3" transform="rotate(15, 40, 10)" />

        {/* Teary eyes */}
        <circle cx="30" cy="31" r="1.5" fill="#1e293b" />
        <circle cx="40" cy="31" r="1.5" fill="#1e293b" />
        {/* Tears 流泪 */}
        <path d="M30 33 L28 42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 33 L42 42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

        {/* Open sad/crying mouth */}
        <circle cx="35" cy="40" r="3" fill="#f43f5e" />

        {/* Hands reaching out desperately to sky */}
        <line x1="42" y1="58" x2="65" y2="35" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <line x1="18" y1="58" x2="-2" y2="45" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* FLYING BALLOON (红色大气球) in Center Sky */}
      <g transform="translate(180, 20)">
        {/* Balloon string line */}
        <path d="M22 62 Q15 90 28 120 Q35 150 18 175" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="1" />
        {/* Balloon Body */}
        <ellipse cx="22" cy="35" rx="22" ry="26" fill="#f43f5e" />
        {/* Highlight on balloon */}
        <ellipse cx="14" cy="24" rx="5" ry="8" transform="rotate(-20, 14, 24)" fill="#ffffff" opacity="0.6" />
        {/* Bottom knot */}
        <polygon points="18,61 26,61 22,65" fill="#f43f5e" />
      </g>

      {/* BLUEBIRD (蓝色小鸟姐姐) flying to carry back balloon thread */}
      <g transform="translate(250, 48)">
        {/* Bird Wings */}
        <path d="M30 25 C15 -5 5 15 25 30 Z" fill="#60a5fa" />
        <path d="M22 28 C5 15 -2 32 18 42 Z" fill="#3b82f6" opacity="0.8" />

        {/* Bird Body */}
        <ellipse cx="30" cy="32" rx="18" ry="12" fill="#60a5fa" />

        {/* Bird Head */}
        <circle cx="44" cy="24" r="9" fill="#60a5fa" />
        <circle cx="46" cy="22" r="1.5" fill="#ffffff" />
        <circle cx="46.5" cy="22.5" r="0.7" fill="#000000" />
        
        {/* Yellow Beak (黄嘴巴) holding the string */}
        <polygon points="52,21 58,25 51,28" fill="#fbbf24" />

        {/* Bird tail */}
        <path d="M14 36 L1 38 L8 44 Z" fill="#3b82f6" />

        {/* Thread in its beak */}
        <path d="M52 25 L-20 85" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Happy Flower buds on field */}
      <circle cx="150" cy="245" r="4" fill="#a855f7" />
      <line x1="150" y1="245" x2="150" y2="255" stroke="#22c55e" strokeWidth="1.5" />
      <circle cx="280" cy="255" r="4" fill="#fb923c" />
      <line x1="280" y1="255" x2="280" y2="265" stroke="#22c55e" strokeWidth="1.5" />
    </svg>
  );
};

export const GrassProtectionSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0fdf4" />
      <path d="M-10 200 Q200 170 410 200 L410 280 L-10 280 Z" fill="#4ade80" />
      <path d="M-10 220 Q200 200 410 220 L410 280 L-10 280 Z" fill="#22c55e" />
      <circle cx="340" cy="50" r="20" fill="#facc15" />
      <circle cx="80" cy="230" r="5" fill="#f43f5e" />
      <circle cx="73" cy="230" r="4" fill="#fb7185" />
      <circle cx="87" cy="230" r="4" fill="#fb7185" />
      <circle cx="80" cy="223" r="4" fill="#fb7185" />
      <circle cx="80" cy="237" r="4" fill="#fb7185" />
      <circle cx="150" cy="245" r="15" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M140 238 Q150 248 160 238 M140 252 Q150 242 160 252" stroke="#1e293b" strokeWidth="1.5" />
      <g transform="translate(240, 130)">
        <rect x="0" y="0" width="10" height="70" fill="#b45309" />
        <rect x="-35" y="-30" width="80" height="40" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="5" y="-6" fill="#854d0e" fontSize="12" fontWeight="black" textAnchor="middle">爱护草坪</text>
      </g>
    </svg>
  );
};

export const FlowerpotIncidentSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f8fafc" />
      <rect x="180" y="40" width="180" height="80" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="170" y="110" width="200" height="15" fill="#94a3b8" />
      <g transform="translate(140, 180) rotate(45)">
        <polygon points="10,0 40,0 35,40 15,40" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
        <rect x="5" y="-5" width="40" height="6" fill="#ca8a04" />
        <ellipse cx="25" cy="10" rx="8" ry="12" fill="#22c55e" />
      </g>
      <path d="M100 130 L115 110 L130 130 L150 135 L130 145 L135 165 L115 150 L95 160 L105 140 Z" fill="#f59e0b" />
      <rect x="0" y="220" width="400" height="60" fill="#94a3b8" />
      <circle cx="80" cy="235" r="18" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="80" cy="235" r="12" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
    </svg>
  );
};

export const RainyWayHomeSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#e0f2fe" />
      <g stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="50" y1="20" x2="40" y2="40" />
        <line x1="150" y1="10" x2="140" y2="30" />
        <line x1="250" y1="30" x2="240" y2="50" />
        <line x1="350" y1="15" x2="340" y2="35" />
        <line x1="90" y1="100" x2="80" y2="120" />
        <line x1="210" y1="80" x2="200" y2="100" />
        <line x1="320" y1="90" x2="310" y2="110" />
      </g>
      <path d="M-10 230 Q200 215 410 230 L410 280 L-10 280 Z" fill="#cbd5e1" />
      <ellipse cx="120" cy="245" rx="30" ry="6" fill="#bae6fd" />
      <ellipse cx="280" cy="255" rx="40" ry="8" fill="#bae6fd" />
      <g transform="translate(140, 80)">
        <path d="M0 50 A 60 60 0 0 1 120 50 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <line x1="60" y1="50" x2="60" y2="130" stroke="#475569" strokeWidth="4" />
        <path d="M60 130 C60 135 50 135 50 130" fill="none" stroke="#475569" strokeWidth="4" />
        <path d="M-10 20 Q-15 10 -20 15 T-10 30 T0 15 Q-5 10 -10 20" fill="#f43f5e" />
      </g>
    </svg>
  );
};

export const PearsOnRoadSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0fdf4" />
      <path d="M-10 210 Q200 195 410 210 L410 280 L-10 280 Z" fill="#4ade80" />
      <path d="M-10 225 Q200 210 410 225 L410 280 L-10 280 Z" fill="#22c55e" opacity="0.6" />
      <circle cx="340" cy="50" r="20" fill="#fb923c" />
      <g transform="translate(180, 220)">
        <ellipse cx="0" cy="0" rx="8" ry="11" fill="#bef264" stroke="#84cc16" strokeWidth="1" />
        <circle cx="0" cy="-5" r="6" fill="#bef264" />
        <line x1="0" y1="-10" x2="3" y2="-15" stroke="#78350f" strokeWidth="1.5" />
      </g>
      <g transform="translate(210, 230)">
        <ellipse cx="0" cy="0" rx="8" ry="11" fill="#bef264" stroke="#84cc16" strokeWidth="1" />
        <circle cx="0" cy="-5" r="6" fill="#bef264" />
        <line x1="0" y1="-10" x2="-2" y2="-15" stroke="#78350f" strokeWidth="1.5" />
      </g>
      <g transform="translate(150, 240)">
        <ellipse cx="0" cy="0" rx="8" ry="11" fill="#bef264" stroke="#84cc16" strokeWidth="1" />
        <circle cx="0" cy="-5" r="6" fill="#bef264" />
        <line x1="0" y1="-10" x2="3" y2="-15" stroke="#78350f" strokeWidth="1.5" />
      </g>
      <g transform="translate(250, 200)">
        <ellipse cx="25" cy="20" rx="25" ry="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M12 18 C12 5 38 5 38 18 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="20" cy="13" r="5" fill="#bef264" />
        <circle cx="30" cy="12" r="5" fill="#bef264" />
      </g>
    </svg>
  );
};

export const MopFloorSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#fafaf9" />
      <path d="M0 160 L400 160" stroke="#e7e5e4" strokeWidth="2" />
      <path d="M0 220 L400 220" stroke="#e7e5e4" strokeWidth="2" />
      <path d="M100 160 L50 280" stroke="#e7e5e4" strokeWidth="2" />
      <path d="M200 160 L180 280" stroke="#e7e5e4" strokeWidth="2" />
      <path d="M300 160 L310 280" stroke="#e7e5e4" strokeWidth="2" />
      <path d="M80 180 L85 170 L90 180 L100 185 L90 190 L85 200 L80 190 L70 185 Z" fill="#38bdf8" />
      <path d="M280 200 L283 192 L286 200 L294 203 L286 206 L283 214 L280 206 L272 203 Z" fill="#38bdf8" />
      <g transform="translate(130, 150)">
        <rect x="0" y="20" width="45" height="35" rx="3" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
        <path d="M5 20 Q22.5 0 40 20" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="15" cy="15" r="5" fill="#f0fdfa" opacity="0.9" stroke="#99f6e4" />
        <circle cx="28" cy="13" r="7" fill="#f0fdfa" opacity="0.9" stroke="#99f6e4" />
        <circle cx="34" cy="18" r="4" fill="#f0fdfa" opacity="0.9" stroke="#99f6e4" />
      </g>
    </svg>
  );
};

export const SwingSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0fdf4" />
      <path d="M-10 220 Q200 195 410 220 L410 280 L-10 280 Z" fill="#22c55e" />
      <path d="M0 240 L40 240 L30 100 L-10 80 Z" fill="#78350f" />
      <ellipse cx="20" cy="50" rx="60" ry="40" fill="#15803d" />
      <line x1="140" y1="40" x2="140" y2="220" stroke="#475569" strokeWidth="6" />
      <line x1="280" y1="40" x2="280" y2="220" stroke="#475569" strokeWidth="6" />
      <line x1="120" y1="45" x2="300" y2="45" stroke="#475569" strokeWidth="8" />
      <g transform="translate(210, 45) rotate(20)">
        <line x1="-15" y1="0" x2="-15" y2="120" stroke="#a1a1aa" strokeWidth="2" />
        <line x1="15" y1="0" x2="15" y2="120" stroke="#a1a1aa" strokeWidth="2" />
        <rect x="-24" y="120" width="48" height="8" fill="#ca8a04" rx="2" />
        <circle cx="0" cy="80" r="14" fill="#fed7aa" />
        <path d="M-10 95 L10 95 L14 120 L-14 120 Z" fill="#f43f5e" />
      </g>
    </svg>
  );
};

export const BackMassageSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#fff7ed" />
      <rect x="0" y="200" width="400" height="80" fill="#fed7aa" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#fdba74" strokeWidth="4" />
      <line x1="120" y1="120" x2="120" y2="220" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
      <line x1="180" y1="120" x2="180" y2="220" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
      <rect x="110" y="140" width="80" height="15" fill="#ca8a04" rx="4" />
      <rect x="165" y="90" width="10" height="60" fill="#a16207" />
      <g transform="translate(280, 140)">
        <rect x="0" y="30" width="50" height="40" fill="#f97316" rx="4" />
        <line x1="-15" y1="30" x2="65" y2="30" stroke="#ca8a04" strokeWidth="3" />
        <line x1="10" y1="70" x2="10" y2="100" stroke="#a16207" strokeWidth="4" />
        <line x1="40" y1="70" x2="40" y2="100" stroke="#a16207" strokeWidth="4" />
        <path d="M45 42 C52 42 52 58 45 58" fill="none" stroke="#1e293b" strokeWidth="2" />
        <path d="M-2 45 Q-10 40 -12 50" fill="none" stroke="#1e293b" strokeWidth="2.5" />
      </g>
    </svg>
  );
};

export const DeliverUmbrellaSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#cbd5e1" opacity="0.8" />
      <g stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <line x1="100" y1="30" x2="85" y2="60" />
        <line x1="200" y1="10" x2="185" y2="40" />
        <line x1="300" y1="40" x2="285" y2="70" />
        <line x1="150" y1="110" x2="135" y2="140" />
        <line x1="250" y1="90" x2="235" y2="120" />
      </g>
      <path d="M-10 220 Q200 210 410 220 L410 280 L-10 280 Z" fill="#94a3b8" />
      <g transform="translate(100, 140) rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="50" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        <line x1="0" y1="50" x2="0" y2="60" stroke="#475569" strokeWidth="2" />
        <path d="M0 60 C0 64 -6 64 -6 60" fill="none" stroke="#475569" strokeWidth="2" />
      </g>
      <g transform="translate(260, 90)">
        <path d="M-40 25 A 40 40 0 0 1 40 25 Z" fill="#3b82f6" />
        <line x1="0" y1="25" x2="0" y2="80" stroke="#475569" strokeWidth="3" />
      </g>
    </svg>
  );
};

export const PourWaterSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#fff1f2" />
      <rect x="0" y="210" width="400" height="70" fill="#fecdd3" />
      <line x1="0" y1="210" x2="400" y2="210" stroke="#fda4af" strokeWidth="3" />
      <g transform="translate(170, 100)">
        <rect x="10" y="20" width="50" height="55" rx="10" fill="#38bdf8" stroke="#0ea8e9" strokeWidth="3" />
        <path d="M60 32 C68 32 68 53 60 53" fill="none" stroke="#0ea8e9" strokeWidth="3" />
        <path d="M22 10 Q26 0 22 -10" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M35 12 Q39 2 35 -8" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M48 9 Q52 -1 48 -11" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M35 48 C30 38 18 38 23 48 T35 58 T47 48 T35 38 Z" fill="#f43f5e" />
      </g>
    </svg>
  );
};

export const SightProtectionSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0fdf4" />
      <g transform="translate(130, 80)">
        <circle cx="35" cy="40" r="30" fill="none" stroke="#4f46e5" strokeWidth="4" />
        <circle cx="105" cy="40" r="30" fill="none" stroke="#4f46e5" strokeWidth="4" />
        <line x1="65" y1="40" x2="75" y2="40" stroke="#4f46e5" strokeWidth="4" />
        <path d="M5 40 Q-15 35 -20 50" fill="none" stroke="#4f46e5" strokeWidth="3" />
        <path d="M135 40 Q155 35 160 50" fill="none" stroke="#4f46e5" strokeWidth="3" />
        <path d="M25 40 L32 47 L45 35" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M95 40 L102 47 L115 35" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <g transform="translate(140, 170)">
        <path d="M10 30 Q60 15 110 30 L110 65 Q60 50 10 65 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M110 30 Q160 15 210 30 L210 65 Q160 50 110 65 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M110 32 L110 66" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="-5" y="28" width="15" height="38" fill="#ec4899" rx="2" />
      </g>
    </svg>
  );
};

export const SpringTripSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0f9ff" />
      <path d="M-20 220 L100 80 L180 160 L320 60 L420 220 Z" fill="#e2f1e5" opacity="0.8" />
      <path d="M-10 200 Q200 170 410 200 L410 280 L-10 280 Z" fill="#4ade80" />
      <circle cx="340" cy="65" r="22" fill="#ef4444" opacity="0.9" />
      <circle cx="340" cy="65" r="16" fill="#facc15" />
      <g transform="translate(230, 110) rotate(-15)">
        <path d="M0 0 C-10 -15 -25 -5 0 10" fill="#eab308" />
        <path d="M0 0 C10 -15 25 -5 0 10" fill="#eab308" />
        <circle cx="0" cy="5" r="2" fill="#1e293b" />
      </g>
      <line x1="120" y1="210" x2="180" y2="150" stroke="#ca8a04" strokeWidth="2.5" />
      <circle cx="180" cy="150" r="14" fill="none" stroke="#22c55e" strokeWidth="2" />
    </svg>
  );
};

export const MiceEggSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#fdf8f6" />
      <rect x="0" y="210" width="400" height="70" fill="#f5ebe6" />
      <line x1="0" y1="210" x2="400" y2="210" stroke="#e8dfd8" strokeWidth="3" />
      <ellipse cx="200" cy="205" rx="70" ry="20" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
      <g transform="translate(200, 170)">
        <ellipse cx="0" cy="15" rx="25" ry="32" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
        <path d="M-22 15 L-5 20 L2 12 L10 22 L24 14" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="0" cy="-10" r="14" fill="#fbbf24" />
        <circle cx="-5" cy="-12" r="1.5" fill="#1e293b" />
        <circle cx="5" cy="-12" r="1.5" fill="#1e293b" />
        <polygon points="-2,-8 2,-8 0,-4" fill="#f97316" />
      </g>
    </svg>
  );
};

export const KeepBallSafeSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#fff1f2" />
      <rect x="0" y="200" width="400" height="80" fill="#e2e8f0" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="4" />
      <rect x="0" y="200" width="400" height="8" fill="#f59e0b" />
      <line x1="40" y1="200" x2="50" y2="208" stroke="#1e293b" strokeWidth="2" />
      <line x1="120" y1="200" x2="130" y2="208" stroke="#1e293b" strokeWidth="2" />
      <line x1="200" y1="200" x2="210" y2="208" stroke="#1e293b" strokeWidth="2" />
      <line x1="280" y1="200" x2="290" y2="208" stroke="#1e293b" strokeWidth="2" />
      <g transform="translate(160, 222) rotate(30)">
        <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#b91c1c" strokeWidth="2" />
        <path d="M-10 -10 Q0 0 10 -10 M-10 10 Q0 0 10 10" stroke="#b91c1c" strokeWidth="1.5" />
      </g>
      <g transform="translate(280, 70)">
        <path d="M12 25 L8 70 L28 70 L24 25 Z" fill="#ef4444" />
        <circle cx="16" cy="85" r="7" fill="#ef4444" />
      </g>
    </svg>
  );
};

export const HappyRecessSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#f0fdff" />
      <path d="M-10 210 Q200 195 410 210 L410 280 L-10 280 Z" fill="#e0f2fe" />
      <path d="M-10 225 Q200 210 410 225 L410 280 L-10 280 Z" fill="#bae6fd" />
      <g transform="translate(130, 130)">
        <rect x="10" y="20" width="120" height="35" fill="#047857" rx="3" />
        <line x1="20" y1="55" x2="20" y2="85" stroke="#475569" strokeWidth="4" />
        <line x1="120" y1="55" x2="120" y2="85" stroke="#475569" strokeWidth="4" />
        <line x1="70" y1="55" x2="70" y2="85" stroke="#475569" strokeWidth="3" />
        <line x1="70" y1="0" x2="70" y2="20" stroke="#ffffff" strokeWidth="3" />
        <circle cx="45" cy="5" r="4.5" fill="#f97316" />
      </g>
    </svg>
  );
};

export const CrossRiverElephantSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#bae6fd" />
      <path d="M-20 280 Q40 180 80 200 T-20 280 Z" fill="#84cc16" />
      <path d="M420 280 Q360 170 320 190 T420 280 Z" fill="#84cc16" />
      <path d="M80 220 Q200 240 320 210" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 250 Q200 270 300 240" fill="none" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
      <g transform="translate(180, 110)">
        <ellipse cx="-15" cy="15" rx="20" ry="24" fill="#94a3b8" />
        <ellipse cx="-15" cy="15" rx="13" ry="16" fill="#cbd5e1" />
        <circle cx="10" cy="20" r="24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <path d="M14 16 Q18 10 22 16" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 28 Q24 30 26 24" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <path d="M26 26 C42 26 50 10 46 -10 C46 -15 38 -15 40 -10 C42 8 36 18 26 18" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <g transform="translate(-10, -22)">
          <circle cx="10" cy="10" r="8" fill="#ffffff" />
          <ellipse cx="7" cy="-2" rx="2.5" ry="7" fill="#ffffff" />
          <ellipse cx="12" cy="-2" rx="2.5" ry="7" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
};

export const AnimalsRainUmbrellaSVG: React.FC<SVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 400 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="280" rx="16" fill="#cbd5e1" opacity="0.8" />
      <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="60" y1="20" x2="45" y2="50" />
        <line x1="160" y1="10" x2="145" y2="40" />
        <line x1="260" y1="30" x2="245" y2="60" />
        <line x1="360" y1="15" x2="345" y2="45" />
      </g>
      <path d="M-10 220 Q200 210 410 220 L410 280 L-10 280 Z" fill="#94a3b8" />
      <circle cx="80" cy="235" r="16" fill="#22c55e" />
      <circle cx="72" cy="222" r="5" fill="#22c55e" />
      <circle cx="88" cy="222" r="5" fill="#22c55e" />
      <g transform="translate(240, 120)">
        <path d="M-25 30 A 25 25 0 0 1 25 30 Z" fill="#ec4899" />
        <line x1="0" y1="30" x2="0" y2="75" stroke="#475569" strokeWidth="2.5" />
        <circle cx="0" cy="90" r="14" fill="#fb923c" />
        <path d="M-4 76 Q0 70 4 76" fill="#ef4444" />
      </g>
    </svg>
  );
};

export const SceneIllustration: React.FC<{ id: string; className?: string }> = ({ id, className = "w-full h-full rounded-2xl" }) => {
  switch (id) {
    case "01":
      return <SnowmanSVG className={className} />;
    case "02":
      return <CartSVG className={className} />;
    case "03":
      return <HandkerchiefSVG className={className} />;
    case "04":
      return <GrassProtectionSVG className={className} />;
    case "05":
      return <FlowerpotIncidentSVG className={className} />;
    case "06":
      return <RainyWayHomeSVG className={className} />;
    case "07":
      return <PearsOnRoadSVG className={className} />;
    case "08":
      return <MopFloorSVG className={className} />;
    case "09":
      return <SwingSVG className={className} />;
    case "10":
      return <BackMassageSVG className={className} />;
    case "11":
      return <DeliverUmbrellaSVG className={className} />;
    case "12":
      return <RabbitBalloonSVG className={className} />;
    case "13":
      return <PourWaterSVG className={className} />;
    case "14":
      return <SightProtectionSVG className={className} />;
    case "15":
      return <SpringTripSVG className={className} />;
    case "16":
      return <MiceEggSVG className={className} />;
    case "17":
      return <KeepBallSafeSVG className={className} />;
    case "18":
      return <HappyRecessSVG className={className} />;
    case "19":
      return <CrossRiverElephantSVG className={className} />;
    case "20":
      return <AnimalsRainUmbrellaSVG className={className} />;
    default:
      return (
        <div className="w-full h-48 bg-slate-100 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">
          <span className="text-slate-400 font-medium">✨ 看图教学插图 {id}</span>
        </div>
      );
  }
};
