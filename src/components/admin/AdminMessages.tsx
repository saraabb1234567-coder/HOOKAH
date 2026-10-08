import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CustomerMessage, MessageStatus } from '../../types/data';
import { MessageSquare, Phone, Mail, CheckCircle2, Clock, Share2, Bot } from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus } = useData();
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);

  const handleStatusChange = async (msgId: string, status: MessageStatus) => {
    await updateMessageStatus(msgId, status);
    if (selectedMessage && selectedMessage.id === msgId) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Хэрэглэгчийн Зурвасууд & Лавлагаа
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Вэбсайт болон чатаар ирсэн худалдан авагчдын асуулт, санал хүсэлт
          </p>
        </div>

        {/* Integration readiness hint */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-400">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>Meta API & AI Auto-Reply: Модуль бэлэн</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-6 space-y-2">
          {messages.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-500 font-mono text-xs">
              Одоогоор ирсэн зурвас байхгүй байна
            </div>
          ) : (
            messages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#090D16] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-white">
                      {msg.customerName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        msg.status === 'unread'
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : msg.status === 'replied'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {msg.status === 'unread'
                        ? 'Шинэ'
                        : msg.status === 'replied'
                        ? 'Хариулсан'
                        : 'Уншсан'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{msg.phone}</span>
                    <span>{msg.createdDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message View */}
        <div className="lg:col-span-6">
          {selectedMessage ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedMessage.customerName}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Phone className="w-3 h-3" />
                      <span>{selectedMessage.phone}</span>
                    </span>
                    {selectedMessage.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{selectedMessage.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500">
                  {selectedMessage.createdDate}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                  Илгээсэн асуулт / Санал
                </span>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Actions */}
              <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Хариулсан гэж тэмдэглэх</span>
                </button>

                <button
                  onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Уншсан</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border border-white/5 text-center text-slate-500 text-xs font-mono flex flex-col items-center justify-center h-64">
              <MessageSquare className="w-8 h-8 text-slate-600 mb-2" />
              <span>Зүүн жагсаалтаас зурвас сонгож дэлгэрэнгүйг харна уу</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
