import React from 'react';
import { useData } from '../context/DataContext';
import { Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { websiteContent } = useData();

  return (
    <footer className="relative bg-[#040508] border-t border-white/5 py-16 px-6 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <a
            href="#"
            className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-1.5"
          >
            <span>AURA</span>
            <span className="text-cyan-400">W</span>
          </a>
          <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
            {websiteContent.footerDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-xs font-mono uppercase tracking-wider text-slate-400">
          <a href="#assembly" className="hover:text-cyan-400 transition-colors">
            Угсралт
          </a>
          <a href="#activation" className="hover:text-cyan-400 transition-colors">
            Идэвхжүүлэлт
          </a>
          <a href="#exploded" className="hover:text-cyan-400 transition-colors">
            Задалсан харагдац
          </a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Онцлог
          </a>
          <a href="#manual" className="hover:text-cyan-400 transition-colors">
            Заавар
          </a>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1 text-slate-500 hover:text-slate-300"
            >
              <Shield className="w-3 h-3" />
              <span>Админ удирдлага</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 AURA W Hookah Systems. Бүх эрх хуулиар хамгаалагдсан.</p>
        <p className="text-[11px] font-mono text-slate-600">
          Оптик PMMA Акрилик Архитектур · 304 Эмнэлгийн Зэрэглэлийн Ган
        </p>
      </div>
    </footer>
  );
};
