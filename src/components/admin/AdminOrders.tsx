import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OrderItem, OrderStatus } from '../../types/data';
import { ShoppingBag, Search, Filter, Phone, Calendar, CheckCircle2, Clock, XCircle, Truck } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useData();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Захиалгын Удирдлага
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Хэрэглэгчдийн илгээсэн хүсэлт, худалдан авалт болон хүргэлтийн явц
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/5 text-xs font-mono">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Бүгд ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'new' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Шинэ ({orders.filter((o) => o.status === 'new').length})
          </button>
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'confirmed' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Баталгаажсан
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Хүргэгдсэн
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Нэр, утасны дугаар, захиалгын ID хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0A0E18] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Orders Table */}
        <div className={`glass-panel rounded-3xl border border-white/5 overflow-hidden ${selectedOrder ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-slate-900/40 text-slate-500 font-mono">
                  <th className="p-4 font-medium">Дугаар</th>
                  <th className="p-4 font-medium">Захиалагч</th>
                  <th className="p-4 font-medium">Утас</th>
                  <th className="p-4 font-medium">Төлбөр</th>
                  <th className="p-4 font-medium">Төлөв</th>
                  <th className="p-4 font-medium">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500 font-mono">
                      Тохирох захиалга олдсонгүй
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isSelected = selectedOrder?.id === order.id;
                    return (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="p-4 font-mono font-bold text-cyan-300">
                          {order.id}
                        </td>
                        <td className="p-4 font-medium text-white">
                          <div>{order.customerName}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                            {order.product}
                          </div>
                        </td>
                        <td className="p-4 font-mono text-slate-300">
                          {order.phone}
                        </td>
                        <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                          {order.price.toLocaleString()} ₮
                        </td>
                        <td className="p-4">
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
                        <td className="p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="text-cyan-400 hover:underline font-mono text-[11px]"
                          >
                            Харах
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detail Sidebar */}
        {selectedOrder && (
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Захиалгын Деталь
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedOrder.id} · {selectedOrder.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Хаах ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-mono">Утасны дугаар</span>
                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="text-cyan-300 font-mono font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{selectedOrder.phone}</span>
                </a>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-mono">Огноо</span>
                <span className="text-slate-200 font-mono">{selectedOrder.createdDate}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-mono">Бараа</span>
                <span className="text-slate-200 text-right">{selectedOrder.product}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-mono">Тоо ширхэг</span>
                <span className="text-white font-mono font-bold">{selectedOrder.quantity} ширхэг</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-mono">Нийт төлөх дүн</span>
                <span className="text-cyan-300 font-mono font-bold text-sm">
                  {selectedOrder.price.toLocaleString()} ₮
                </span>
              </div>

              {selectedOrder.address && (
                <div className="py-1 border-b border-white/5">
                  <span className="text-slate-400 font-mono block mb-1">Хүргэх хаяг</span>
                  <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                    {selectedOrder.address}
                  </p>
                </div>
              )}

              {selectedOrder.note && (
                <div className="py-1 border-b border-white/5">
                  <span className="text-slate-400 font-mono block mb-1">Тэмдэглэл</span>
                  <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                    {selectedOrder.note}
                  </p>
                </div>
              )}
            </div>

            {/* Change Status Controls */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Төлөв Өөрчлөх
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'confirmed')}
                  className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Баталгаажуулах</span>
                </button>

                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}
                  className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Хүргэгдсэн</span>
                </button>

                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'new')}
                  className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Шинэ төлөвт</span>
                </button>

                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                  className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Цуцлах</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
