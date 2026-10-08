import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { WebsiteContentData } from '../../types/data';
import { FileText, Save, CheckCircle2 } from 'lucide-react';

export const AdminWebsiteContent: React.FC = () => {
  const { websiteContent, updateWebsiteContent } = useData();
  const [formData, setFormData] = useState<WebsiteContentData>(websiteContent);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateWebsiteContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Вэбсайтын Үндсэн Текст & Гарчгууд
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Нүүр хуудасны гарчиг, уриа үг, хэсгүүдийн нэршил болон холбоо барих мэдээлэл
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Вэбсайтын бүх текстүүд шинэчлэгдэн хадгалагдлаа!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Section Content */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">01</span>
            <h3 className="text-sm font-bold text-white">Hero Нүүр Хэсгийн Текстүүд</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Hero Дээд Түлхүүр Текст (Kicker)
              </label>
              <input
                type="text"
                name="heroKicker"
                value={formData.heroKicker}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Үндсэн Том Гарчиг (Hero Title)
              </label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Дэд Гарчиг (Hero Subtitle)
            </label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Онцлох Бэдж 1
              </label>
              <input
                type="text"
                name="heroBadge1"
                value={formData.heroBadge1}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Онцлох Бэдж 2
              </label>
              <input
                type="text"
                name="heroBadge2"
                value={formData.heroBadge2}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Онцлох Бэдж 3
              </label>
              <input
                type="text"
                name="heroBadge3"
                value={formData.heroBadge3}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Скролл уриа (Scroll Indicator Text)
            </label>
            <input
              type="text"
              name="scrollExploreText"
              value={formData.scrollExploreText}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Activation & Smoke Text */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">02</span>
            <h3 className="text-sm font-bold text-white">Идэвхжүүлэлт & Утааны Хэсгийн Текстүүд</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Идэвхжүүлэлтийн Гарчиг
              </label>
              <input
                type="text"
                name="activationTitle"
                value={formData.activationTitle}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Идэвхжүүлэлтийн Дэд Гарчиг
              </label>
              <input
                type="text"
                name="activationSubtitle"
                value={formData.activationSubtitle}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Final Section & CTA */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">03</span>
            <h3 className="text-sm font-bold text-white">Төгсгөлийн Хэсэг & Үйлдлийн Товч (CTA)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Төгсгөлийн Том Гарчиг
              </label>
              <input
                type="text"
                name="finalTitle"
                value={formData.finalTitle}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Үндсэн Товчны Текст (CTA Button)
              </label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-bold text-cyan-300 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Төгсгөлийн Дэлгэрэнгүй Тайлбар
            </label>
            <textarea
              name="finalDescription"
              rows={2}
              value={formData.finalDescription}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Холбоо Барих Утас
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
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Вэбсайтын Бүх Текстийг Хадгалах</span>
          </button>
        </div>
      </form>
    </div>
  );
};
