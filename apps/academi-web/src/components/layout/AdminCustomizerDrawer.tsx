import React, { useEffect } from 'react';
import { useThemeStore, SkinPreset, ThemeMode, SidenavColor, TopbarColor, SidenavSize, LayoutWidth } from '../../stores/useThemeStore';
import { X, Check, RotateCcw, ShoppingBag, Sun, Moon, Layout, Palette } from 'lucide-react';

export const skinList: { id: SkinPreset; name: string; image: string; dots: string[] }[] = [
  { id: 'pixel', name: 'Pixel', image: '/assets/images/layouts/skin-pixel.png', dots: ['bg-blue-600', 'bg-violet-600', 'bg-amber-500'] },
  { id: 'soft', name: 'Soft', image: '/assets/images/layouts/skin-soft.png', dots: ['bg-emerald-500', 'bg-blue-500', 'bg-pink-500'] },
  { id: 'mono', name: 'Mono', image: '/assets/images/layouts/skin-mono.png', dots: ['bg-slate-900', 'bg-slate-700', 'bg-slate-500'] },
  { id: 'prism', name: 'Prism', image: '/assets/images/layouts/skin-prism.png', dots: ['bg-indigo-600', 'bg-teal-500', 'bg-amber-400'] },
  { id: 'nova', name: 'Nova', image: '/assets/images/layouts/skin-nova.png', dots: ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500'] },
  { id: 'zen', name: 'Zen', image: '/assets/images/layouts/skin-zen.png', dots: ['bg-blue-500', 'bg-slate-600', 'bg-emerald-400'] },
  { id: 'elegant', name: 'Elegant', image: '/assets/images/layouts/skin-elegant.png', dots: ['bg-violet-700', 'bg-amber-600', 'bg-slate-800'] },
  { id: 'vivid', name: 'Vivid', image: '/assets/images/layouts/skin-vivid.png', dots: ['bg-blue-600', 'bg-teal-500', 'bg-cyan-400'] },
  { id: 'aurora', name: 'Aurora', image: '/assets/images/layouts/skin-aurora.png', dots: ['bg-[#1a365d]', 'bg-indigo-600', 'bg-teal-400'] },
  { id: 'crystal', name: 'Crystal', image: '/assets/images/layouts/skin-crystal.png', dots: ['bg-sky-500', 'bg-blue-600', 'bg-indigo-500'] },
  { id: 'default', name: 'Default', image: '/assets/images/layouts/skin-default.png', dots: ['bg-blue-600', 'bg-slate-800', 'bg-emerald-500'] },
  { id: 'minimal', name: 'Minimal', image: '/assets/images/layouts/skin-minimal.png', dots: ['bg-slate-600', 'bg-slate-400', 'bg-slate-300'] },
  { id: 'saas', name: 'SaaS', image: '/assets/images/layouts/skin-saas.png', dots: ['bg-blue-600', 'bg-indigo-600', 'bg-slate-900'] },
  { id: 'modern', name: 'Modern', image: '/assets/images/layouts/skin-modern.png', dots: ['bg-indigo-600', 'bg-blue-500', 'bg-slate-800'] },
  { id: 'galaxy', name: 'Galaxy', image: '/assets/images/layouts/skin-galaxy.png', dots: ['bg-indigo-900', 'bg-purple-900', 'bg-blue-900'] },
  { id: 'flat', name: 'Flat', image: '/assets/images/layouts/skin-flat.png', dots: ['bg-[#1e3a5f]', 'bg-slate-600', 'bg-emerald-500'] },
  { id: 'luxe', name: 'Luxe', image: '/assets/images/layouts/skin-luxe.png', dots: ['bg-amber-600', 'bg-[#1e3a5f]', 'bg-slate-800'] },
  { id: 'retro', name: 'Retro', image: '/assets/images/layouts/skin-retro.png', dots: ['bg-orange-500', 'bg-amber-500', 'bg-[#1e3a5f]'] },
  { id: 'neon', name: 'Neon', image: '/assets/images/layouts/skin-neon.png', dots: ['bg-lime-400', 'bg-cyan-400', 'bg-pink-500'] },
  { id: 'matrix', name: 'Matrix', image: '/assets/images/layouts/skin-matrix.png', dots: ['bg-emerald-500', 'bg-[#1e3a5f]', 'bg-slate-900'] },
  { id: 'neo', name: 'Neo', image: '/assets/images/layouts/skin-neo.png', dots: ['bg-slate-700', 'bg-blue-500', 'bg-emerald-500'] },
  { id: 'xenon', name: 'Xenon', image: '/assets/images/layouts/skin-xenon.png', dots: ['bg-blue-700', 'bg-indigo-800', 'bg-teal-400'] },
  { id: 'silver', name: 'Silver', image: '/assets/images/layouts/skin-silver.png', dots: ['bg-slate-400', 'bg-slate-800', 'bg-blue-500'] },
  { id: 'orbit', name: 'Orbit', image: '/assets/images/layouts/skin-orbit.png', dots: ['bg-blue-600', 'bg-cyan-500', 'bg-indigo-700'] },
];

export const AdminCustomizerDrawer: React.FC = () => {
  const {
    theme,
    sidenavColor,
    topbarColor,
    sidenavSize,
    layoutWidth,
    skin,
    isSettingsOpen,
    setTheme,
    setSidenavColor,
    setTopbarColor,
    setSidenavSize,
    setLayoutWidth,
    setSkin,
    setSettingsOpen,
    resetDefaults,
    applyThemeAttributes,
  } = useThemeStore();

  useEffect(() => {
    applyThemeAttributes();
  }, [applyThemeAttributes]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setSettingsOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl flex flex-col">
          {/* Header Banner - Authentic Paces Customizer Styling */}
          <div className="p-6 bg-gradient-to-r from-[#1c3c6d] to-[#254b85] text-white flex items-start justify-between shadow-md relative">
            <div className="space-y-1">
              <h2 className="text-base font-extrabold uppercase tracking-wide">ADMIN CUSTOMIZER</h2>
              <p className="text-xs text-blue-200/90 max-w-xs leading-relaxed italic">
                Easily configure layout, styles, and preferences for your admin interface.
              </p>
            </div>
            <button
              onClick={() => setSettingsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Skin Presets Grid - Authentic Paces Thumbnail Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Skin Presets
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skinList.map((item) => {
                  const isSelected = skin === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSkin(item.id)}
                      className="group cursor-pointer space-y-1.5"
                    >
                      <div
                        className={`relative rounded-xl border overflow-hidden transition-all shadow-sm group-hover:shadow-md ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500/30'
                            : 'border-slate-200 dark:border-slate-800 group-hover:border-slate-300'
                        }`}
                      >
                        {/* Dot indicator badges */}
                        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
                          {item.dots.map((dot, idx) => (
                            <span key={idx} className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                          ))}
                        </div>

                        {/* Thumbnail Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-24 object-cover object-top transition-transform group-hover:scale-105"
                          onError={(e) => {
                            // Fallback if image path differs
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />

                        {/* Active Selection Checkmark Overlay */}
                        {isSelected && (
                          <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-center text-xs font-semibold ${
                          isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color Scheme Mode */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Color Scheme
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Sidebar Menu Theme */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sidenav Color
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'dark', label: 'Dark Navy', color: 'bg-[#1e3a5f]' },
                  { id: 'light', label: 'Light', color: 'bg-white border border-slate-300' },
                  { id: 'gray', label: 'Slate Gray', color: 'bg-slate-700' },
                  { id: 'gradient', label: 'Vivid Gradient', color: 'bg-gradient-to-b from-blue-700 to-indigo-900' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSidenavColor(item.id as SidenavColor)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      sidenavColor === item.id
                        ? 'border-blue-600 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidenav Size */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sidenav Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'default', label: 'Default' },
                  { id: 'compact', label: 'Compact' },
                  { id: 'offcanvas', label: 'Condensed' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSidenavSize(item.id as SidenavSize)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      sidenavSize === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer - Green Buy/Action & Red Reset Buttons */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open('https://github.com/pulok529/AcademiSolutionRCS', '_blank')}
              className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Project Repo</span>
            </button>

            <button
              onClick={resetDefaults}
              className="py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
