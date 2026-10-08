import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Sparkles, Gem, Shield, Lightbulb, Activity, Wind } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'crystal-bowl': <Gem className="w-5 h-5 text-cyan-400" />,
  'acrylic-body': <Shield className="w-5 h-5 text-cyan-400" />,
  'led-lighting': <Lightbulb className="w-5 h-5 text-cyan-400" />,
  'spring-diffuser': <Activity className="w-5 h-5 text-cyan-400" />,
  'smooth-airflow': <Wind className="w-5 h-5 text-cyan-400" />,
};

export const FeaturesSection: React.FC = () => {
  const { features, websiteContent } = useData();
  const [activeFeatureId, setActiveFeatureId] = useState<string>(features[0]?.id || 'crystal-bowl');

  const activeFeature = features.find((f) => f.id === activeFeatureId) || features[0];

  return (
    <section id="features" className="relative py-28 px-6 bg-[#07090E] overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header in Mongolian */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{websiteContent.featuresSubtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
            {websiteContent.featuresTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {websiteContent.featuresDescription}
          </p>
        </div>

        {/* Feature Selector Tabs in Mongolian */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {features.map((feat) => {
            const isActive = feat.id === activeFeatureId;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureId(feat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {ICON_MAP[feat.id] || <Sparkles className="w-4 h-4 text-cyan-400" />}
                <span>{feat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Spotlight Stage */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/15 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl shadow-black/60">
          {/* Left Text & Metrics */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                <span>0{features.findIndex((f) => f.id === activeFeature.id) + 1}</span>
                <span>·</span>
                <span>{activeFeature.highlight}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {activeFeature.title}
              </h3>

              <p className="text-cyan-300 text-sm font-mono mt-1 mb-4">
                {activeFeature.tagline}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                {activeFeature.description}
              </p>
            </div>

            {/* Performance Stat Callout in Mongolian */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Хэмжсэн үзүүлэлт
                </span>
                <span className="text-xs text-slate-200 mt-0.5 block">
                  {activeFeature.statLabel}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-cyan-400 tabular-nums">
                {activeFeature.statNumber}
              </div>
            </div>
          </div>

          {/* Right Visual Image Slot */}
          <div className="md:col-span-5 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/20 flex items-center justify-center group">
            {activeFeature.image ? (
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/20">
                {activeFeature.title}
              </span>
              <span className="text-slate-400 text-[10px]">AURA W СТУДИ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
