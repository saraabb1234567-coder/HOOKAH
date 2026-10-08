/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScrollAssemblyStage } from './components/ScrollAssemblyStage';
import { ActivationSection } from './components/ActivationSection';
import { ExplodedViewSection } from './components/ExplodedViewSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FinalProductSection } from './components/FinalProductSection';
import { ProductDrawer } from './components/ProductDrawer';
import { Footer } from './components/Footer';

// Admin CMS Components
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProduct } from './components/admin/AdminProduct';
import { AdminAssemblySteps } from './components/admin/AdminAssemblySteps';
import { AdminFeatures } from './components/admin/AdminFeatures';
import { AdminGallery } from './components/admin/AdminGallery';
import { AdminWebsiteContent } from './components/admin/AdminWebsiteContent';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSettings } from './components/admin/AdminSettings';
import { Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

function AppContent() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Check URL pathname or hash for /admin on initial load & popstate
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdmin = path === '/admin' || path.startsWith('/admin/') || hash === '#admin';
      setIsAdminRoute(isAdmin);

      // Check session auth
      const savedAuth = sessionStorage.getItem('aura_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToAdmin = () => {
    setIsAdminRoute(true);
    window.history.pushState(null, '', '/admin');
  };

  const navigateToStore = () => {
    setIsAdminRoute(false);
    window.history.pushState(null, '', '/');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcode for admin protection: 'admin' or 'aura'
    if (passcode.trim() === 'admin' || passcode.trim() === 'aura' || passcode.trim() === 'aura2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('aura_admin_auth', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('Нууц үг буруу байна. (Анхдагч: admin)');
    }
  };

  const handleScrollToAssembly = () => {
    const el = document.getElementById('assembly');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin Route
  if (isAdminRoute) {
    if (!isAuthenticated) {
      // Protected Admin Gate
      return (
        <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center justify-center p-6 select-none">
          <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/25 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white">
                AURA W Админ Нэвтрэх
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Системийн удирдлагад нэвтрэхийн тулд нууц үгээ оруулна уу
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Админ Нууц Үг
                </label>
                <input
                  type="password"
                  placeholder="Нууц үг оруулна уу..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-rose-400 text-[11px] font-mono mt-1.5">{passcodeError}</p>
                )}
                <p className="text-slate-500 text-[10px] font-mono mt-1">
                  Туршилтын нууц үг: <span className="text-cyan-400 font-bold">admin</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95"
              >
                <span>Нэвтрэх</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <button
                onClick={navigateToStore}
                className="text-xs text-slate-400 hover:text-cyan-300 transition-colors font-mono cursor-pointer"
              >
                ← Дэлгүүрийн нүүр хуудас руу буцах
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Authenticated Admin Dashboard
    return (
      <AdminLayout
        activeTab={activeAdminTab}
        onSelectTab={setActiveAdminTab}
        onExitAdmin={navigateToStore}
      >
        {activeAdminTab === 'dashboard' && <AdminDashboard onNavigate={setActiveAdminTab} />}
        {activeAdminTab === 'product' && <AdminProduct />}
        {activeAdminTab === 'assembly' && <AdminAssemblySteps />}
        {activeAdminTab === 'features' && <AdminFeatures />}
        {activeAdminTab === 'gallery' && <AdminGallery />}
        {activeAdminTab === 'content' && <AdminWebsiteContent />}
        {activeAdminTab === 'orders' && <AdminOrders />}
        {activeAdminTab === 'messages' && <AdminMessages />}
        {activeAdminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Render 100% Mongolian Customer Landing Website
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <HeroSection
          onScrollToAssembly={handleScrollToAssembly}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* 2 & 3. Scroll Assembly Experience & Water Animation */}
        <ScrollAssemblyStage />

        {/* 4 & 5. Heat Activation & Volumetric Smoke Section */}
        <ActivationSection />

        {/* 6. Exploded Technical View Section */}
        <ExplodedViewSection />

        {/* 7. Premium Feature Cards */}
        <FeaturesSection />

        {/* 8. Six-Step Operating Manual */}
        <HowItWorksSection />

        {/* 9. Final Product Showcase & Collection CTA */}
        <FinalProductSection onOpenDrawer={() => setIsDrawerOpen(true)} />
      </main>

      {/* Slide-over Specification & Inclusions Drawer */}
      <ProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenAdmin={navigateToAdmin} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
