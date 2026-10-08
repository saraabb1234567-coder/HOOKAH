import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FeatureData } from '../../types/data';
import { Sparkles, Save, CheckCircle2, ChevronRight, Gem, Shield, Lightbulb, Activity, Wind } from 'lucide-react';

export const AdminFeatures: React.FC = () => {
  const { features, updateFeature } = useData();
  const [selectedId, setSelectedId] = useState<string>(features[0]?.id || 'crystal-bowl');
  const [saved, setSaved] = useState(false);

  const currentFeature = features.find((f) => f.id === selectedId) || features[0];
  const [formValues, setFormValues] = useState<FeatureData>(currentFeature);

  const handleSelect = (feat: FeatureData) => {
    setSelectedId(feat.id);
    setFormValues(feat);
    setSaved(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFeature(selectedId, formValues);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Бүтээгдэхүүний Онцлог & Давуу Талууд
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Болор аяга, акрилик их бие, LED гэрэлтүүлэг, пүршин диффузер зэрэг гол инновациудын тодорхойлолт
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Онцлогийн мэдээлэл хадгалагдлаа!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Features List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block px-1 mb-2">
            Онцлог сонгох ({features.length})
          </span>

          <div className="space-y-1.5">
            {features.map((feat) => {
              const isSelected = feat.id === selectedId;
              return (
                <button
                  key={feat.id}
                  onClick={() => handleSelect(feat)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#090D16] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {feat.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[190px]">
                      {feat.tagline}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {feat.statNumber}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Edit Form */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
            <h3 className="text-base font-bold text-white">{formValues.title}</h3>
            <span className="text-xs font-mono text-slate-500">ID: {formValues.id}</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Гарчиг (Title)
                </label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Айкон Нэр (Lucide Icon)
                </label>
                <input
                  type="text"
                  name="iconName"
                  value={formValues.iconName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Уриа Үг (Tagline)
              </label>
              <input
                type="text"
                name="tagline"
                value={formValues.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Тодруулга (Highlight)
              </label>
              <input
                type="text"
                name="highlight"
                value={formValues.highlight}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Дэлгэрэнгүй тайлбар
              </label>
              <textarea
                name="description"
                rows={3}
                value={formValues.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Хэмжигдэхүүн (Stat Number)
                </label>
                <input
                  type="text"
                  name="statNumber"
                  value={formValues.statNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Үзүүлэлтийн тайлбар (Stat Label)
                </label>
                <input
                  type="text"
                  name="statLabel"
                  value={formValues.statLabel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Зургийн Зам (Image URL / Path)
              </label>
              <input
                type="text"
                name="image"
                value={formValues.image || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Онцлогийг Хадгалах</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
