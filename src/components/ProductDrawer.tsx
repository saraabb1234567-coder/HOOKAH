import React, { useState } from 'react';
import { X, Check, Package, Mail, ArrowRight, CheckCircle2, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ isOpen, onClose }) => {
  const { product, assemblySteps, createOrder } = useData();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Та нэрээ оруулна уу.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMsg('Та холбогдох утасны дугаараа зөв оруулна уу.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await createOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        note: note.trim(),
        product: `${product.name} Премиум Hookah Багц`,
        quantity: Number(quantity),
        price: product.price * Number(quantity),
        status: 'new',
      });
      setSubmitted(true);
    } catch {
      setErrorMsg('Захиалга бүртгэхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Content Drawer */}
      <div className="relative w-full max-w-xl bg-[#090D15] border-l border-cyan-500/20 h-full overflow-y-auto z-10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Бүтээгдэхүүний Дэлгэрэнгүй Багц
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                {product.name} · {product.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Цонх хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price & Stock highlight banner */}
          <div className="my-5 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider block">
                Үндсэн Үнэ
              </span>
              <span className="text-2xl font-black font-display text-white">
                {product.price.toLocaleString()} {product.currency}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                ● Худалдаанд бэлэн
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Үлдэгдэл: {product.stock} ш
              </span>
            </div>
          </div>

          {/* Package Inclusions Breakdown in Mongolian */}
          <div className="my-6">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Хайрцаг дахь бүрдэл (9 Иж Бүрэн Хэсэг)</span>
            </h4>

            <div className="space-y-2 text-xs">
              {assemblySteps.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 font-bold">0{idx + 1}</span>
                    <div>
                      <span className="font-semibold text-white block">
                        {item.title || item.componentName}
                      </span>
                      <span className="text-slate-400 text-[11px] block">{item.material}</span>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Core Specifications in Mongolian */}
          <div className="my-6 p-4 rounded-2xl glass-panel border border-cyan-500/15">
            <h4 className="text-xs font-mono uppercase text-cyan-300 tracking-widest mb-3">
              Техникийн Үзүүлэлтүүд
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-mono block">Материал</span>
                <span className="text-slate-200 font-semibold">{product.material}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Хэмжээ</span>
                <span className="text-slate-200 font-semibold">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Жин</span>
                <span className="text-slate-200 font-semibold">{product.weight}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Шүүлтүүр</span>
                <span className="text-slate-200 font-semibold">Хос пүршин диффузер</span>
              </div>
            </div>
          </div>

          {/* Real Order & Reservation Form in Mongolian */}
          <div className="my-6">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Захиалга Өгөх / Хүргэлтээр Авах</span>
            </h4>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-sm text-white">Захиалга Амжилттай Бүртгэгдлээ!</p>
                  <p className="text-emerald-300/90 leading-relaxed">
                    Баярлалаа, {customerName}! Манай менежер таны <span className="font-mono font-bold text-white">{phone}</span> дугаарт холбогдож хүргэлтийг баталгаажуулна.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-cyan-300 hover:underline pt-2 font-mono text-[11px] block cursor-pointer"
                  >
                    Дахин шинэ захиалга өгөх
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="customer-name" className="text-[11px] font-mono text-slate-400 block mb-1">
                    Таны Нэр
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    placeholder="Жишээ: Бат-Эрдэнэ"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="customer-phone" className="text-[11px] font-mono text-slate-400 block mb-1">
                      Утасны Дугаар
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      placeholder="9911-XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-cyan-400 focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="order-quantity" className="text-[11px] font-mono text-slate-400 block mb-1">
                      Тоо Ширхэг
                    </label>
                    <input
                      id="order-quantity"
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customer-address" className="text-[11px] font-mono text-slate-400 block mb-1">
                    Хүргэлтийн Хаяг
                  </label>
                  <input
                    id="customer-address"
                    type="text"
                    placeholder="Хот, дүүрэг, хороо, байрны дугаар..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="customer-note" className="text-[11px] font-mono text-slate-400 block mb-1">
                    Нэмэлт хүсэлт / Тэмдэглэл
                  </label>
                  <input
                    id="customer-note"
                    type="text"
                    placeholder="Хүргэлтийн өмнө утсаар залгах г.м..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {errorMsg && <p className="text-rose-400 text-[11px] font-mono">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95"
                >
                  <span>{isSubmitting ? 'Бүртгэж байна...' : `Захиалга Баталгаажуулах (${(product.price * quantity).toLocaleString()} ₮)`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>2 Жилийн Үйлдвэрийн Баталгаа</span>
          </div>
          <span>Улаанбаатар хот дотор үнэгүй хүргэлт</span>
        </div>
      </div>
    </div>
  );
};
