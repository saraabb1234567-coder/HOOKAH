import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Image as ImageIcon,
  FileText,
  ShoppingBag,
  MessageSquare,
  Settings as SettingsIcon,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  RefreshCw,
  Database,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export type AdminTab =
  | 'dashboard'
  | 'product'
  | 'assembly'
  | 'features'
  | 'gallery'
  | 'content'
  | 'orders'
  | 'messages'
  | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onExitAdmin,
  children,
}) => {
  const { orders, messages, resetToDefaults } = useData();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const NAV_ITEMS: Array<{
    id: AdminTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    { id: 'dashboard', label: 'Хяналтын самбар', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'product', label: 'Бүтээгдэхүүн', icon: <Package className="w-4 h-4" /> },
    { id: 'assembly', label: 'Угсралтын үе шат', icon: <Layers className="w-4 h-4" /> },
    { id: 'features', label: 'Онцлог давуу тал', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'gallery', label: 'Зургийн цомог', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'content', label: 'Вэбсайтын текст', icon: <FileText className="w-4 h-4" /> },
    { id: 'orders', label: 'Захиалгууд', icon: <ShoppingBag className="w-4 h-4" />, badge: newOrdersCount },
    { id: 'messages', label: 'Ирсэн зурвасууд', icon: <MessageSquare className="w-4 h-4" />, badge: unreadMessagesCount },
    { id: 'settings', label: 'Тохиргоо', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const handleReset = async () => {
    if (confirm('Анхны өгөгдлийг сэргээх үү? Таны оруулсан өөрчлөлтүүд анхны төлөвт шилжинэ.')) {
      setResetting(true);
      await resetToDefaults();
      setTimeout(() => setResetting(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col justify-between bg-[#0A0D15] border-r border-cyan-500/10 p-5 shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-display text-white">AURA</span>
              <span className="text-xl font-bold font-display text-cyan-400">W</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase ml-1">
                CMS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-cyan-400 text-slate-950">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom utility */}
        <div className="pt-6 border-t border-white/5 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-white/5 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Вэбсайт харах</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={handleReset}
            disabled={resetting}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[11px] font-mono text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Бүх өгөгдлийг анхны утганд оруулах"
          >
            <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
            <span>Анхны өгөгдөл сэргээх</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0A0D15] border-b border-cyan-500/10">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold font-display text-white">AURA W</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">CMS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 border border-cyan-500/20"
          >
            Вэбсайт
          </button>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5"
            aria-label="Цэс нээх"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#0B0F18] border-b border-cyan-500/20 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileNavOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium ${
                activeTab === item.id ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-400 text-slate-950 font-bold">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header info bar */}
        <header className="h-16 border-b border-white/5 px-6 sm:px-8 flex items-center justify-between bg-[#080B12]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Админ систем</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <h1 className="text-sm font-semibold text-white">
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Өгөгдөл: Идэвхтэй (Local / Supabase Ready)</span>
            </div>
            <button
              onClick={onExitAdmin}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Дэлгүүр харах</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* Body Viewport */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
