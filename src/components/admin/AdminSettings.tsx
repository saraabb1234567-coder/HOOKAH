import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AppSettings } from '../../types/data';
import { Settings, Save, CheckCircle2, Database, Share2, Bot, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Системийн Тохиргоо & Интеграц
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Дэлгүүрийн үндсэн тохиргоо, валют болон Supabase / Meta API холболтын бэлтгэл
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Тохиргоо амжилттай хадгалагдлаа!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: General Store Settings */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Settings className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Дэлгүүрийн Үндсэн Мэдээлэл</h3>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Дэлгүүрийн Нэр
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Мөнгөн Тэмдэгт (Currency)
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Үндсэн Өнгө (Primary Accent)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 cursor-pointer"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Холбоо барих Утас
              </label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                И-мэйл Хаяг
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Facebook Хуудасны ID / Handle
            </label>
            <input
              type="text"
              name="facebookPageId"
              value={formData.facebookPageId}
              onChange={handleChange}
              placeholder="aurahookah.mongolia"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Future Integrations (Supabase, Meta API, AI auto-reply) */}
        <div className="space-y-6">
          {/* Supabase Architecture Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Supabase Өгөгдлийн Сан</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Модуль Бэлэн
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Архитектур нь одоогоор локал кэш болон мок датагаар найдвартай ажиллаж байгаа бөгөөд та хүссэн үедээ Supabase URL болон Anon Key холбоход UI код өөрчлөгдөхгүй шууд холбогдохоор зохион байгуулагдсан.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
              <div>Хүснэгтүүд: products · assembly_steps · features · orders · messages</div>
              <div className="text-emerald-400">Status: DataService abstraction layer active</div>
            </div>
          </div>

          {/* Meta API & Messenger Readiness Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Meta API & Messenger Bot</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                Дараагийн шат
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Facebook хуудаснаас ирэх Messenger зурвасуудыг шууд Захиргааны самбарт хүлээн авч, захиалга бүртгэх болон AI авто-хариулагч ажиллах дэд бүтцийг нэгтгэхэд бэлэн болсон.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Тохиргоог Хадгалах</span>
          </button>
        </div>
      </form>
    </div>
  );
};
