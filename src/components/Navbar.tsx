import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, Shield } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onOpenDrawer: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDrawer, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = audioEngine.toggle();
    setSoundEnabled(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090E]/90 backdrop-blur-md border-b border-cyan-500/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-tight font-display text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5"
        >
          <span>AURA</span>
          <span className="text-cyan-400">W</span>
        </a>

        {/* Zone 2: Clean text navigation links in natural Mongolian */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-slate-300">
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
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          {/* Admin link */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/5 border border-white/5 transition-all text-xs font-mono hidden sm:flex items-center gap-1.5 cursor-pointer"
            title="Админ удирдлага руу шилжих"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">Админ</span>
          </button>

          {/* Sound audio toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={soundEnabled ? 'Чимээ унтраах' : 'Чимээ асаах'}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 border border-white/5 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title={soundEnabled ? 'Дуу асаалттай' : 'Орчны чимээ унтраалттай'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-cyan-400">ДУУ: ИДЭВХТЭЙ</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline text-[11px] text-slate-400">ДУУ</span>
              </>
            )}
          </button>

          {/* Order / Explore button */}
          <button
            onClick={onOpenDrawer}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-500/20 active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Багц үзэх</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            aria-label="Цэс нээх"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu in Mongolian */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0E14] border-b border-cyan-500/20 px-6 py-4 flex flex-col gap-4 text-sm font-medium tracking-wide">
          <a
            href="#assembly"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1"
          >
            01 · Угсралтын үйл явц
          </a>
          <a
            href="#activation"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1"
          >
            02 · Идэвхжүүлэлт ба утаа
          </a>
          <a
            href="#exploded"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1"
          >
            03 · Задалсан техник харагдац
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1"
          >
            04 · Инновацийн онцлог
          </a>
          <a
            href="#manual"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1"
          >
            05 · Хэрэглэх заавар (6 алхам)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="text-left text-cyan-400 font-mono text-xs py-1 flex items-center gap-2 border-t border-white/5 pt-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Админ систем рүү орох</span>
          </button>
        </div>
      )}
    </header>
  );
};
