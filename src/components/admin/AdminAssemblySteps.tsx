import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AssemblyStepData } from '../../types/data';
import { Layers, Save, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';

export const AdminAssemblySteps: React.FC = () => {
  const { assemblySteps, updateAssemblyStep } = useData();
  const [selectedId, setSelectedId] = useState<string>(assemblySteps[0]?.id || 'body');
  const [saved, setSaved] = useState(false);

  const currentStep = assemblySteps.find((s) => s.id === selectedId) || assemblySteps[0];

  const [formValues, setFormValues] = useState<AssemblyStepData>(currentStep);

  // Sync form when selected step changes
  const handleSelectStep = (step: AssemblyStepData) => {
    setSelectedId(step.id);
    setFormValues(step);
    setSaved(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'stepNumber' || name === 'order' ? Number(value) : value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAssemblyStep(selectedId, formValues);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Угсралтын Үе Шатуудын Удирдлага (9 Алхам)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Скролл хийхэд үзэгдэх 9 бүрдэл хэсгийн нэр, тайлбар, тодорхойлолт болон дарааллыг засах
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Шинэчлэлтийг амжилттай хадгаллаа!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step list selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block px-1 mb-2">
            Алхам сонгох ({assemblySteps.length})
          </span>

          <div className="space-y-1.5">
            {assemblySteps.map((step) => {
              const isSelected = step.id === selectedId;
              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectStep(step)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#090D16] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      0{step.stepNumber}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white truncate max-w-[170px]">
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {step.shortLabel} · {step.animationType}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Step edit form */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-cyan-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                АЛХАМ 0{formValues.stepNumber}
              </span>
              <h3 className="text-base font-bold text-white">{formValues.title}</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">ID: {formValues.id}</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Алхамын Гарчиг
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
                  Бүрдэл Хэсгийн Нэр (Component Name)
                </label>
                <input
                  type="text"
                  name="componentName"
                  value={formValues.componentName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Богино Шошго (Short Label)
                </label>
                <input
                  type="text"
                  name="shortLabel"
                  value={formValues.shortLabel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Анимейшн Төрөл (Animation Type)
                </label>
                <input
                  type="text"
                  name="animationType"
                  value={formValues.animationType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Эрэмбэ (Display Order)
                </label>
                <input
                  type="number"
                  name="order"
                  value={formValues.order}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Дэд гарчиг (Subtitle)
              </label>
              <input
                type="text"
                name="subtitle"
                value={formValues.subtitle}
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
                  Материал (Material)
                </label>
                <input
                  type="text"
                  name="material"
                  value={formValues.material}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Техник үзүүлэлт (Specs / Tolerance)
                </label>
                <input
                  type="text"
                  name="specs"
                  value={formValues.specs}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Алхамын Өөрчлөлтийг Хадгалах</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
