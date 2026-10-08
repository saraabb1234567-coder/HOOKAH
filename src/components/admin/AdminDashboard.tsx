import React from 'react';
import { useData } from '../../context/DataContext';
import {
  ShoppingBag,
  DollarSign,
  Package,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';
import { AdminTab } from './AdminLayout';

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { product, orders, messages, assemblySteps } = useData();

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.price, 0);

  const newOrders = orders.filter((o) => o.status === 'new').length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AURA W Захиргааны Самбар</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Тавтай морилно уу!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
            Вэбсайтын текст, бүтээгдэхүүний мэдээлэл, 9 үе шаттай угсралтын анимейшн болон ирсэн захиалгуудыг энэ хэсгээс шууд удирдах боломжтой.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs font-mono transition-all cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Захиалга шалгах ({newOrders})</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#0A0E18] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Нийт Борлуулалт</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-display text-white">
            {totalRevenue.toLocaleString()} {product.currency}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>{orders.length} захиалга бүртгэгдсэн</span>
          </div>
        </div>

        {/* New Orders */}
        <div className="p-5 rounded-2xl bg-[#0A0E18] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Шинэ Захиалга</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-display text-cyan-300">
            {newOrders}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {newOrders > 0 ? 'Холбогдож баталгаажуулах шаардлагатай' : 'Бүх захиалга шийдвэрлэгдсэн'}
          </div>
        </div>

        {/* Inventory Stock */}
        <div className="p-5 rounded-2xl bg-[#0A0E18] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Агуулахын Үлдэгдэл</span>
            <Package className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-display text-white">
            {product.stock} ширхэг
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Төлөв: Худалдаанд бэлэн
          </div>
        </div>

        {/* Unread Messages */}
        <div className="p-5 rounded-2xl bg-[#0A0E18] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Ирсэн Зурвас</span>
            <MessageSquare className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black font-display text-white">
            {unreadMessages}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Нийт {messages.length} лавлагаа
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">
          Шуурхай Удирдлага
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('product')}
            className="p-5 rounded-2xl bg-[#0B0F19] hover:bg-[#0E1524] border border-white/5 hover:border-cyan-500/30 text-left transition-all cursor-pointer group flex items-start justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Бүтээгдэхүүн засах
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Үнэ, тодорхойлолт, зураг, үлдэгдэл тохируулах
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            onClick={() => onNavigate('assembly')}
            className="p-5 rounded-2xl bg-[#0B0F19] hover:bg-[#0E1524] border border-white/5 hover:border-cyan-500/30 text-left transition-all cursor-pointer group flex items-start justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                9 Алхамт Угсралт
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Их бие, диффузер, болор аяганы тайлбар засах
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            onClick={() => onNavigate('content')}
            className="p-5 rounded-2xl bg-[#0B0F19] hover:bg-[#0E1524] border border-white/5 hover:border-cyan-500/30 text-left transition-all cursor-pointer group flex items-start justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Вэбсайтын Текст
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Hero гарчиг, уриа үг, товчны бичиг солих
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="glass-panel rounded-3xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Сүүлийн Үеийн Захиалгууд
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Вэбсайтаар ирсэн сүүлийн үеийн хүсэлтүүд
            </p>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
          >
            Бүх захиалгыг харах →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 font-mono">
                <th className="pb-3 font-medium">Дугаар</th>
                <th className="pb-3 font-medium">Захиалагч</th>
                <th className="pb-3 font-medium">Утас</th>
                <th className="pb-3 font-medium">Дүн</th>
                <th className="pb-3 font-medium">Огноо</th>
                <th className="pb-3 font-medium">Төлөв</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-cyan-300 font-semibold">{order.id}</td>
                  <td className="py-3 font-medium text-white">{order.customerName}</td>
                  <td className="py-3 text-slate-300 font-mono">{order.phone}</td>
                  <td className="py-3 font-mono font-bold text-white">
                    {order.price.toLocaleString()} ₮
                  </td>
                  <td className="py-3 text-slate-400 font-mono text-[11px]">{order.createdDate}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        order.status === 'new'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : order.status === 'confirmed'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : order.status === 'delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {order.status === 'new'
                        ? 'Шинэ'
                        : order.status === 'confirmed'
                        ? 'Баталгаажсан'
                        : order.status === 'delivered'
                        ? 'Хүргэгдсэн'
                        : 'Цуцлагдсан'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
