import React from 'react';
import { Search, Bell, User, Settings2, Sun, Moon, Menu } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { TemplateSettingsDrawer } from './TemplateSettingsDrawer';

export const Navbar: React.FC = () => {
  const { theme, topbarColor, sidenavSize, setTheme, toggleSettings, setSidenavSize } = useThemeStore();

  const getNavbarBgClass = () => {
    if (topbarColor === 'dark') return 'bg-[#1e3a5f] border-slate-700 text-white';
    if (topbarColor === 'gray') return 'bg-slate-800 border-slate-700 text-white';
    return 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100';
  };

  return (
    <>
      <header className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors ${getNavbarBgClass()}`}>
        {/* Left Section: Menu Toggle & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidenavSize(sidenavSize === 'compact' ? 'default' : 'compact')}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            title="Toggle Sidebar Compact Mode"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative w-64 sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students, classes, exams..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Template Settings Gear Icon */}
          <button
            onClick={toggleSettings}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-xl transition-all relative animate-pulse"
            title="Paces Template Customizer"
          >
            <Settings2 className="w-5 h-5" />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Notification Badge */}
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-all">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-slate-900" />
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center border border-blue-500 shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold leading-tight">Admin User</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Academic Manager</p>
            </div>
          </div>
        </div>
      </header>

      {/* Template Settings Offcanvas Drawer */}
      <TemplateSettingsDrawer />
    </>
  );
};
