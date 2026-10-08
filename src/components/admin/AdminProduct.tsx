import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, CheckCircle2, Package, Sparkles } from 'lucide-react';

export const AdminProduct: React.FC = () => {
  const { product, updateProduct } = useData();

  const [formData, setFormData] = useState({
    name: product.name,
    title: product.title,
    description: product.description,
    price: product.price,
    currency: product.currency,
    heroImage: product.heroImage,
    status: product.status,
    material: product.material,
    dimensions: product.dimensions,
    weight: product.weight,
    stock: product.stock,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Бүтээгдэхүүний Тохиргоо
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Нэр, үнэ, тодорхойлолт, агуулахын үлдэгдэл болон үндсэн үзүүлэлтүүд
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Амжилттай хадгаллаа! Вэбсайтад шинэчлэгдсэн.</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Бүтээгдэхүүний Нэр (Model)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Борлуулалтын Төлөв
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              >
                <option value="active">Идэвхтэй (Худалдаалж байгаа)</option>
                <option value="draft">Ноорог (Нуусан)</option>
                <option value="out_of_stock">Дууссан (Нөөцгүй)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Дэлгэрэнгүй Гарчиг
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              Бүтээгдэхүүний Тайлбар
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Үнэ ({formData.currency})
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Агуулахын Үлдэгдэл (Ширхэг)
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Өөрчлөлтийг Хадгалах</span>
            </button>
          </div>
        </div>

        {/* Right Column: Physical Specs & Preview */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              <span>Техникийн Үзүүлэлтүүд</span>
            </h3>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Материал
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Хэмжээ
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Жин
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Үндсэн Зургийн Зам (URL / Path)
              </label>
              <input
                type="text"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Photo preview card */}
          <div className="glass-panel p-4 rounded-3xl border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block mb-2">Зургийн Харагдац</span>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
              <img
                src={formData.heroImage}
                alt="Product Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
