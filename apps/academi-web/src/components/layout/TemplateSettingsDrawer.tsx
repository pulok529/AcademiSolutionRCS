import React, { useEffect } from 'react';
import { useThemeStore, ThemeMode, SidenavColor, TopbarColor, SidenavSize, SkinPreset } from '../../stores/useThemeStore';
import { X, Sun, Moon, Palette, Layout, Settings2, Sparkles } from 'lucide-react';

export const TemplateSettingsDrawer: React.FC = () => {
  const {
    theme,
    sidenavColor,
    topbarColor,
    sidenavSize,
    skin,
    isSettingsOpen,
    setTheme,
    setSidenavColor,
    setTopbarColor,
    setSidenavSize,
    setSkin,
    setSettingsOpen,
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
          {/* Header */}
          <div className="p-5 bg-[#1e3a5f] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <Settings2 className="w-5 h-5 text-blue-400" />
              <div>
                <h2 className="font-bold text-sm tracking-wide">Paces Template Customizer</h2>
                <p className="text-[11px] text-blue-200">Real-time Layout & Color Theme Customization</p>
              </div>
            </div>
            <button
              onClick={() => setSettingsOpen(false)}
              className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Options */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. Theme Mode */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Color Scheme Mode</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* 2. Sidenav Color Theme */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-500" />
                <span>Sidebar Navigation Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'dark', label: 'Dark Navy', color: 'bg-[#1e3a5f]' },
                  { id: 'light', label: 'Clean Light', color: 'bg-white border' },
                  { id: 'gray', label: 'Slate Gray', color: 'bg-slate-700' },
                  { id: 'gradient', label: 'Vivid Gradient', color: 'bg-gradient-to-b from-blue-700 to-indigo-900' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSidenavColor(item.id as SidenavColor)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      sidenavColor === item.id
                        ? 'border-blue-600 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${item.color} shadow-xs`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Topbar Color */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Layout className="w-4 h-4 text-emerald-500" />
                <span>Topbar Header Theme</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light', label: 'Light' },
                  { id: 'dark', label: 'Dark Navy' },
                  { id: 'gray', label: 'Gray' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTopbarColor(item.id as TopbarColor)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      topbarColor === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sidenav Size / Compact */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Layout className="w-4 h-4 text-violet-500" />
                <span>Sidebar Layout Size</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'default', label: 'Default' },
                  { id: 'compact', label: 'Compact' },
                  { id: 'offcanvas', label: 'Collapsed' },
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

            {/* 5. Skin Presets */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Preset Design Skins</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'default', label: 'Default Paces' },
                  { id: 'minimal', label: 'Minimalist' },
                  { id: 'saas', label: 'SaaS Business' },
                  { id: 'modern', label: 'Modern Clean' },
                  { id: 'galaxy', label: 'Galaxy Dark' },
                  { id: 'soft', label: 'Soft Pastel' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSkin(item.id as SkinPreset);
                      if (item.id === 'galaxy') {
                        setTheme('dark');
                        setSidenavColor('dark');
                        setTopbarColor('dark');
                      } else if (item.id === 'minimal') {
                        setTheme('light');
                        setSidenavColor('gray');
                        setTopbarColor('gray');
                      } else if (item.id === 'saas') {
                        setTheme('light');
                        setSidenavColor('dark');
                        setTopbarColor('light');
                      }
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                      skin === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Reset */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
            <span className="text-[11px] text-slate-500">Paces Theme Engine v1.0</span>
            <button
              onClick={() => {
                setTheme('light');
                setSidenavColor('dark');
                setTopbarColor('light');
                setSidenavSize('default');
                setSkin('default');
              }}
              className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-lg hover:bg-slate-300 transition-colors"
            >
              Reset Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
