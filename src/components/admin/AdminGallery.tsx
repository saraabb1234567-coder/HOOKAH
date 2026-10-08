import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newOrder, setNewOrder] = useState(gallery.length + 1);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return;

    await addGalleryItem({
      title: newTitle || 'Шинэ Зураг',
      description: newDesc,
      image: newImage,
      displayOrder: Number(newOrder),
    });

    setNewTitle('');
    setNewDesc('');
    setNewImage('');
    setNewOrder(gallery.length + 2);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Энэ зургийг цомгоос устгах уу?')) {
      await deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Зургийн Цомог (Gallery)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Вэбсайтад харагдах бүтээгдэхүүний өндөр нарийвчлалтай зургуудын менежмент
          </p>
        </div>

        {addedNotice && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Шинэ зураг амжилттай нэмэгдлээ!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add new photo form */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Шинэ Зураг Нэмэх</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Зургийн Зам (Image URL / Path)
              </label>
              <input
                type="text"
                placeholder="/src/assets/images/photo.jpg"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Гарчиг (Title)
              </label>
              <input
                type="text"
                placeholder="Жишээ: Акрилик их биеийн деталь"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Тайлбар
              </label>
              <textarea
                rows={2}
                placeholder="Зургийн товч тайлбар..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Дараалал (Display Order)
              </label>
              <input
                type="number"
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <Plus className="w-4 h-4" />
              <span>Цомогт Нэмэх</span>
            </button>
          </form>
        </div>

        {/* Gallery items list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>Одоогийн зургууд ({gallery.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/20">
                      #{item.displayOrder}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-500/80 text-white transition-colors cursor-pointer"
                      title="Устгах"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {item.description || 'Тайлбар байхгүй'}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500 mt-2 block truncate">
                    {item.image}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
