import React, { useEffect, useRef } from 'react';
import { ColorTheme } from '../types/hookah';

interface HookahVisualizerProps {
  assemblyProgress?: number; // 0 (disassembled) to 1 (fully assembled)
  explodedProgress?: number; // 0 (assembled) to 1 (fully exploded)
  heatActivated?: boolean;
  smokeIntensity?: number; // 0 to 1
  ledTheme?: ColorTheme;
  interactiveTilt?: { x: number; y: number };
  highlightedComponentId?: string | null;
  className?: string;
  waterLevel?: number; // 0 to 1 (default based on progress)
  showLabels?: boolean;
}

export const HookahVisualizer: React.FC<HookahVisualizerProps> = ({
  assemblyProgress = 1,
  explodedProgress = 0,
  heatActivated = false,
  smokeIntensity = 0,
  ledTheme = {
    id: 'cyan',
    name: 'Electric Cyan',
    glowColor: 'rgba(0, 242, 254, 0.6)',
    baseColor: '#00F2FE',
    accentHex: '#00F2FE',
  },
  interactiveTilt = { x: 0, y: 0 },
  highlightedComponentId = null,
  className = '',
  waterLevel,
  showLabels = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
  const getSubProgress = (start: number, end: number) => {
    return clamp((assemblyProgress - start) / (end - start), 0, 1);
  };

  const bodyArrival = getSubProgress(0.0, 0.15);
  const connectorsArrival = getSubProgress(0.12, 0.25);
  const stemArrival = getSubProgress(0.22, 0.35);
  const diffuserArrival = getSubProgress(0.32, 0.45);
  const waterArrival = waterLevel !== undefined ? waterLevel : getSubProgress(0.42, 0.55);
  const plateArrival = getSubProgress(0.52, 0.65);
  const bowlArrival = getSubProgress(0.62, 0.75);
  const hoseArrival = getSubProgress(0.72, 0.85);
  const mouthpieceArrival = getSubProgress(0.82, 0.95);

  const explodeFactor = explodedProgress;

  const bodyY = (1 - bodyArrival) * 120 + explodeFactor * 100;
  const connectorsY = (1 - connectorsArrival) * -80 + explodeFactor * 30;
  const stemY = (1 - stemArrival) * -180 + explodeFactor * -60;
  const diffuserY = (1 - diffuserArrival) * -120 + explodeFactor * -10;
  const plateY = (1 - plateArrival) * -240 + explodeFactor * -130;
  const bowlY = (1 - bowlArrival) * -300 + explodeFactor * -220;
  const hoseY = (1 - hoseArrival) * 150 + explodeFactor * 60;
  const mouthpieceY = (1 - mouthpieceArrival) * 200 + explodeFactor * 110;

  // Render volumetric curling smoke on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
    }> = [];

    const getOrigin = () => {
      const rect = canvas.getBoundingClientRect();
      const originX = rect.width / 2;
      const originY = rect.height * 0.16 + (bowlY * 0.35);
      return { x: originX, y: Math.max(20, originY) };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const effectiveSmoke = Math.max(smokeIntensity, heatActivated ? 0.35 : 0);

      if (effectiveSmoke > 0.05) {
        const origin = getOrigin();

        if (Math.random() < effectiveSmoke * 0.75) {
          particles.push({
            x: origin.x + (Math.random() - 0.5) * 20,
            y: origin.y,
            vx: (Math.random() - 0.5) * 0.4 + (interactiveTilt.x * 0.02),
            vy: - (0.8 + Math.random() * 1.2),
            size: 14 + Math.random() * 16,
            alpha: 0,
            maxAlpha: (0.15 + Math.random() * 0.25) * effectiveSmoke,
            life: 0,
            maxLife: 100 + Math.random() * 80,
          });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx + Math.sin(p.life * 0.04) * 0.5;
          p.y += p.vy;
          p.size += 0.45;

          const progress = p.life / p.maxLife;
          if (progress < 0.2) {
            p.alpha = (progress / 0.2) * p.maxAlpha;
          } else {
            p.alpha = (1 - progress) * p.maxAlpha;
          }

          if (p.life >= p.maxLife || p.y < -50) {
            particles.splice(i, 1);
            continue;
          }

          const grad = ctx.createRadialGradient(p.x, p.y, p.size * 0.1, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(240, 248, 255, ${p.alpha})`);
          grad.addColorStop(0.5, `rgba(200, 230, 255, ${p.alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        particles = [];
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [smokeIntensity, heatActivated, bowlY, interactiveTilt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isHighlighted = (id: string) => highlightedComponentId === id;

  return (
    <div
      className={`relative w-full max-w-[560px] aspect-[4/5] mx-auto select-none transition-transform duration-300 ease-out flex items-center justify-center ${className}`}
      style={{
        transform: `perspective(1000px) rotateY(${interactiveTilt.x * 6}deg) rotateX(${-interactiveTilt.y * 6}deg)`,
      }}
    >
      {/* Base ambient LED glow projector beneath acrylic W */}
      <div
        className="absolute bottom-12 w-64 h-24 rounded-full blur-3xl opacity-75 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${ledTheme.glowColor} 0%, rgba(0,0,0,0) 70%)`,
          transform: `scale(${1 + bodyArrival * 0.4})`,
        }}
      />

      {/* Primary SVG Hookah Composite Vector Stage */}
      <svg
        viewBox="0 0 500 680"
        className="w-full h-full relative z-10 overflow-visible drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="acrylicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="25%" stopColor={ledTheme.baseColor} stopOpacity="0.75" />
            <stop offset="50%" stopColor="#0369A1" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="waterGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="60%" stopColor={ledTheme.baseColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="45%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="chromeBezel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="90%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <radialGradient id="charcoalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7700" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#DC2626" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#7F1D1D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="siliconeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.85" />
          </linearGradient>

          <clipPath id="wBodyInnerClip">
            <path d="M 65 370 L 115 540 L 175 540 L 250 410 L 325 540 L 385 540 L 435 370 L 395 370 L 355 500 L 250 330 L 145 500 L 105 370 Z" />
          </clipPath>
        </defs>

        {/* COMPONENT 1: ACRYLIC W-SHAPED BODY */}
        <g
          id="comp-body"
          style={{
            transform: `translateY(${bodyY}px)`,
            opacity: bodyArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('body') ? 'filter drop-shadow-[0_0_20px_#00F2FE]' : ''}
        >
          <rect
            x="90"
            y="548"
            width="320"
            height="18"
            rx="6"
            fill="#0F172A"
            stroke="rgba(0, 242, 254, 0.3)"
            strokeWidth="1.5"
          />
          <rect
            x="110"
            y="552"
            width="280"
            height="5"
            rx="2.5"
            fill={ledTheme.baseColor}
            className="animate-pulse"
            opacity="0.85"
          />

          <path
            d="M 50 355 L 115 548 L 180 548 L 250 420 L 320 548 L 385 548 L 450 355 L 390 355 L 350 485 L 250 315 L 150 485 L 110 355 Z"
            fill="#0369A1"
            opacity="0.25"
          />

          {/* COMPONENT 5: WATER CHAMBER & ANIMATED BUBBLES */}
          <g
            id="comp-water"
            clipPath="url(#wBodyInnerClip)"
            style={{
              opacity: waterArrival,
              transition: 'opacity 0.5s ease',
            }}
          >
            <rect
              x="50"
              y={560 - waterArrival * 190}
              width="400"
              height={waterArrival * 200}
              fill="url(#waterGrad)"
              opacity="0.88"
            />

            <path
              d={`M 50 ${560 - waterArrival * 190} Q 150 ${556 - waterArrival * 190} 250 ${560 - waterArrival * 190} T 450 ${560 - waterArrival * 190}`}
              stroke="#A5F3FC"
              strokeWidth="2.5"
              fill="none"
              opacity="0.9"
            />

            {waterArrival > 0.4 && (
              <g className="bubbles">
                <circle cx="140" cy="520" r="3" fill="#FFFFFF" opacity="0.6">
                  <animate attributeName="cy" values="530;460" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="155" cy="510" r="4.5" fill="#FFFFFF" opacity="0.7">
                  <animate attributeName="cy" values="520;445" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="165" cy="525" r="2.5" fill="#E0F2FE" opacity="0.8">
                  <animate attributeName="cy" values="535;455" dur="2.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="340" cy="520" r="3.5" fill="#FFFFFF" opacity="0.7">
                  <animate attributeName="cy" values="530;450" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="355" cy="515" r="4.5" fill="#FFFFFF" opacity="0.65">
                  <animate attributeName="cy" values="525;440" dur="1.9s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.9s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </g>

          {/* COMPONENT 4: SPRING DIFFUSERS */}
          <g
            id="comp-diffuser"
            style={{
              transform: `translateY(${diffuserY}px)`,
              opacity: diffuserArrival,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
            }}
            className={isHighlighted('diffuser') ? 'filter drop-shadow-[0_0_15px_#38BDF8]' : ''}
          >
            <g transform="translate(148, 430)">
              <rect x="0" y="0" width="8" height="90" rx="3" fill="url(#metalGrad)" />
              {[...Array(11)].map((_, i) => (
                <ellipse
                  key={`left-coil-${i}`}
                  cx="4"
                  cy={12 + i * 6.5}
                  rx="7"
                  ry="2.5"
                  stroke={ledTheme.baseColor}
                  strokeWidth="1.8"
                  fill="none"
                  opacity="0.95"
                />
              ))}
              <rect x="-2" y="85" width="12" height="12" rx="2" fill="url(#metalGrad)" />
            </g>

            <g transform="translate(344, 430)">
              <rect x="0" y="0" width="8" height="90" rx="3" fill="url(#metalGrad)" />
              {[...Array(11)].map((_, i) => (
                <ellipse
                  key={`right-coil-${i}`}
                  cx="4"
                  cy={12 + i * 6.5}
                  rx="7"
                  ry="2.5"
                  stroke={ledTheme.baseColor}
                  strokeWidth="1.8"
                  fill="none"
                  opacity="0.95"
                />
              ))}
              <rect x="-2" y="85" width="12" height="12" rx="2" fill="url(#metalGrad)" />
            </g>
          </g>

          {/* COMPONENT 3: INTERNAL DOWNSTEM */}
          <g
            id="comp-stem"
            style={{
              transform: `translateY(${stemY}px)`,
              opacity: stemArrival,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
            }}
            className={isHighlighted('stem') ? 'filter drop-shadow-[0_0_15px_#FFFFFF]' : ''}
          >
            <rect x="243" y="270" width="14" height="230" rx="3" fill="url(#metalGrad)" />
            <rect x="240" y="260" width="20" height="22" rx="2" fill="url(#metalGrad)" />
            <circle cx="245" cy="271" r="1.8" fill="#1E293B" />
            <circle cx="255" cy="271" r="1.8" fill="#1E293B" />
          </g>

          {/* Acrylic W-Body Front Facet */}
          <path
            d="M 50 355 L 115 548 L 180 548 L 250 420 L 320 548 L 385 548 L 450 355 L 390 355 L 350 485 L 250 315 L 150 485 L 110 355 Z"
            fill="url(#acrylicGrad)"
            opacity="0.82"
            stroke={ledTheme.baseColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <path
            d="M 54 362 L 114 540 L 176 540 L 250 412 L 324 540 L 386 540 L 446 362"
            stroke="#A5F3FC"
            strokeWidth="1.8"
            fill="none"
            opacity="0.75"
          />

          <rect x="74" y="348" width="22" height="10" rx="3" fill="url(#metalGrad)" />
          <rect x="238" y="338" width="24" height="12" rx="3" fill="url(#metalGrad)" />
          <rect x="404" y="348" width="22" height="10" rx="3" fill="url(#metalGrad)" />
        </g>

        {/* COMPONENT 2: METAL CONNECTORS */}
        <g
          id="comp-connectors"
          style={{
            transform: `translateY(${connectorsY}px)`,
            opacity: connectorsArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('connectors') ? 'filter drop-shadow-[0_0_15px_#E2E8F0]' : ''}
        >
          <g transform="translate(77, 310)">
            <rect x="0" y="0" width="16" height="40" rx="3" fill="url(#metalGrad)" />
            <rect x="4" y="10" width="8" height="3" rx="1" fill="#1E293B" />
            <rect x="4" y="17" width="8" height="3" rx="1" fill="#1E293B" />
            <rect x="4" y="24" width="8" height="3" rx="1" fill="#1E293B" />
          </g>

          <g transform="translate(407, 310)">
            <rect x="0" y="8" width="16" height="32" rx="3" fill="url(#metalGrad)" />
            <path
              d="M 8 16 Q 8 6 18 6 L 36 6 Q 42 6 42 12 L 42 22 Q 42 26 38 26 L 16 26 Z"
              fill="url(#metalGrad)"
            />
          </g>
        </g>

        {/* COMPONENT 6: SMOKED GLASS PLATE */}
        <g
          id="comp-plate"
          style={{
            transform: `translateY(${plateY}px)`,
            opacity: plateArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('plate') ? 'filter drop-shadow-[0_0_15px_#94A3B8]' : ''}
        >
          <ellipse cx="250" cy="235" rx="110" ry="18" fill="url(#chromeBezel)" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="250" cy="235" rx="103" ry="15" fill="#0F172A" opacity="0.92" />
          <path
            d="M 160 232 Q 250 226 340 232"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse cx="250" cy="235" rx="14" ry="4" fill="url(#metalGrad)" />
        </g>

        {/* COMPONENT 7: FACETED CRYSTAL BOWL */}
        <g
          id="comp-bowl"
          style={{
            transform: `translateY(${bowlY}px)`,
            opacity: bowlArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('bowl') ? 'filter drop-shadow-[0_0_20px_#FFFFFF]' : ''}
        >
          <path
            d="M 230 234 L 235 200 L 265 200 L 270 234 Z"
            fill="#CBD5E1"
            opacity="0.8"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          <path
            d="M 235 200 L 210 145 L 290 145 L 265 200 Z"
            fill="url(#acrylicGrad)"
            opacity="0.45"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <polygon points="250,150 230,175 250,195 270,175" stroke="#FFFFFF" strokeWidth="1.2" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="250" cy="145" rx="42" ry="9" fill="#0F172A" stroke="#F1F5F9" strokeWidth="2" />
          <ellipse cx="250" cy="145" rx="34" ry="7" fill="#1E293B" />

          {heatActivated && (
            <g id="heat-coals" className="transition-opacity duration-700">
              <ellipse
                cx="250"
                cy="143"
                rx="48"
                ry="15"
                fill="url(#charcoalGlow)"
                className="animate-pulse"
              />
              <g transform="translate(235, 134)">
                <rect x="0" y="0" width="13" height="11" rx="2" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
                <rect x="2" y="2" width="9" height="7" rx="1" fill="#FF5500" className="animate-pulse" />
                <rect x="14" y="2" width="12" height="10" rx="2" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
                <rect x="16" y="4" width="8" height="6" rx="1" fill="#FF7700" className="animate-pulse" />
              </g>
              <circle cx="242" cy="130" r="1.5" fill="#FBBF24" className="animate-ping" />
              <circle cx="260" cy="126" r="1.2" fill="#F97316" className="animate-ping" />
            </g>
          )}
        </g>

        {/* COMPONENT 8: FROSTED SILICONE HOSE */}
        <g
          id="comp-hose"
          style={{
            transform: `translateY(${hoseY}px)`,
            opacity: hoseArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('hose') ? 'filter drop-shadow-[0_0_15px_#E2E8F0]' : ''}
        >
          <path
            d="M 444 326 C 490 330 495 440 475 510 C 455 580 380 620 280 620 C 180 620 60 590 50 630 C 42 660 100 665 140 665"
            stroke="url(#siliconeGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* COMPONENT 9: MACHINED METAL MOUTHPIECE */}
        <g
          id="comp-mouthpiece"
          style={{
            transform: `translateY(${mouthpieceY}px)`,
            opacity: mouthpieceArrival,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className={isHighlighted('mouthpiece') ? 'filter drop-shadow-[0_0_15px_#FFFFFF]' : ''}
        >
          <g transform="translate(130, 656)">
            <rect x="0" y="2" width="18" height="14" rx="2" fill="url(#metalGrad)" />
            <rect x="16" y="4" width="140" height="10" rx="3" fill="url(#metalGrad)" />
            <g transform="translate(35, 1)">
              <rect x="0" y="0" width="4" height="16" rx="1" fill="#334155" />
              <rect x="7" y="0" width="4" height="16" rx="1" fill="#334155" />
              <rect x="14" y="0" width="4" height="16" rx="1" fill="#334155" />
              <rect x="21" y="0" width="4" height="16" rx="1" fill="#334155" />
              <rect x="28" y="0" width="4" height="16" rx="1" fill="#334155" />
            </g>
            <path d="M 156 4 L 180 6 L 180 12 L 156 14 Z" fill="url(#metalGrad)" stroke="#CBD5E1" strokeWidth="1" />
          </g>
        </g>

        {/* Technical Callout Leader Lines & Labels in NATURAL MONGOLIAN */}
        {showLabels && (
          <g className="labels-layer font-mono text-[11px] select-none">
            {/* BOWL / АЯГА */}
            <g className="transition-opacity duration-300">
              <line x1="290" y1="165" x2="380" y2="150" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="290" cy="165" r="2.5" fill="#00F2FE" />
              <text x="390" y="154" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">BOWL / АЯГА</text>
            </g>

            {/* ТАВАГ */}
            <g className="transition-opacity duration-300">
              <line x1="355" y1="235" x2="410" y2="220" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="355" cy="235" r="2.5" fill="#00F2FE" />
              <text x="420" y="224" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">ТАВАГ</text>
            </g>

            {/* ДОТООД ХООЛОЙ */}
            <g className="transition-opacity duration-300">
              <line x1="257" y1="295" x2="360" y2="295" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="257" cy="295" r="2.5" fill="#00F2FE" />
              <text x="370" y="299" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">ДОТООД ХООЛОЙ</text>
            </g>

            {/* ДИФФУЗЕР */}
            <g className="transition-opacity duration-300">
              <line x1="156" y1="475" x2="70" y2="475" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="156" cy="475" r="2.5" fill="#00F2FE" />
              <text x="8" y="479" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">ДИФФУЗЕР</text>
            </g>

            {/* ИХ БИЕ */}
            <g className="transition-opacity duration-300">
              <line x1="250" y1="420" x2="250" y2="465" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="250" cy="420" r="2.5" fill="#00F2FE" />
              <text x="230" y="482" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">ИХ БИЕ</text>
            </g>

            {/* ХООЛОЙ */}
            <g className="transition-opacity duration-300">
              <line x1="470" y1="480" x2="430" y2="530" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="470" cy="480" r="2.5" fill="#00F2FE" />
              <text x="390" y="546" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">ХООЛОЙ</text>
            </g>

            {/* АМНЫ ХОШУУ */}
            <g className="transition-opacity duration-300">
              <line x1="220" y1="662" x2="220" y2="640" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="220" cy="662" r="2.5" fill="#00F2FE" />
              <text x="175" y="632" fill="#A5F3FC" fontWeight="600" letterSpacing="0.05em">АМНЫ ХОШУУ</text>
            </g>
          </g>
        )}
      </svg>

      {/* Volumetric Smoke Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />
    </div>
  );
};
