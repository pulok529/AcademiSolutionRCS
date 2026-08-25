import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown, 
  Grid, 
  Maximize2, 
  Minimize2, 
  Palette,
  ShoppingBag,
  MessageSquare,
  CheckSquare,
  Mail,
  Calendar,
  LifeBuoy
} from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { AdminCustomizerDrawer } from './AdminCustomizerDrawer';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const { theme, topbarColor, sidenavSize, setTheme, toggleSettings, setSidenavSize } = useThemeStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const getNavbarBgClass = () => {
    if (topbarColor === 'dark') return 'bg-[#182c47] border-slate-700/80 text-white';
    if (topbarColor === 'gray') return 'bg-slate-800 border-slate-700 text-white';
    return 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100';
  };

  return (
    <>
      <header className={`h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors ${getNavbarBgClass()}`}>
        {/* Left Section: Menu Toggle, Quick Search, Mega Menu, Apps */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidenavSize(sidenavSize === 'compact' ? 'default' : 'compact')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Rounded Quick Search Input (Matching Paces Screenshot) */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Quick Search..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-800/60 dark:bg-slate-800/90 border border-slate-700/60 rounded-full text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* Mega Menu Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => { setIsMegaMenuOpen(!isMegaMenuOpen); setIsAppsOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span>Mega Menu</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isMegaMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 z-50 grid grid-cols-3 gap-4 text-slate-800 dark:text-slate-100 font-sans animate-fade-in">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Dashboard & Analytics</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Sales Dashboard</li>
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Academic Analytics</li>
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Finance Overview</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Project Management</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Kanban Workflow</li>
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Task Management</li>
                    <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">Team Members</li>
                  </ul>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider">User Management</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer">User Profiles</li>
                    <li className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer">Access Control</li>
                    <li className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer">Security Settings</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Apps Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => { setIsAppsOpen(!isAppsOpen); setIsMegaMenuOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span>Apps</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isAppsOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-2 gap-2 text-slate-800 dark:text-slate-100 text-xs animate-fade-in">
                <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <div><p className="font-bold">eCommerce</p><p className="text-[10px] text-slate-400">Products & Orders</p></div>
                </div>
                <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <div><p className="font-bold">Chat</p><p className="text-[10px] text-slate-400">Team chat</p></div>
                </div>
                <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-rose-500" />
                  <div><p className="font-bold">Task</p><p className="text-[10px] text-slate-400">Plan work</p></div>
                </div>
                <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <div><p className="font-bold">Email</p><p className="text-[10px] text-slate-400">Messages & Inbox</p></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Icons Matching Exact Screenshot Sequence */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. Moon / Sun Theme Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* 2. Apps Grid Switcher Icon */}
          <button
            onClick={() => toast.info('App Switcher Grid')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hidden sm:block"
            title="Apps Grid"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* 3. Notification Bell Icon with Badge Count 5 */}
          <button
            onClick={() => toast.info('5 New Notifications')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl relative transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center border border-slate-900">
              5
            </span>
          </button>

          {/* 4. Fullscreen Toggle Icon */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hidden md:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* 5. Monochrome Theme Icon */}
          <button
            onClick={() => toast.info('Monochrome Palette Active')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hidden lg:block"
            title="Monochrome Mode"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* 6. Exact Paces Spinning/Fixed Gear Settings Icon (btn-theme-setting) */}
          <button
            onClick={toggleSettings}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all relative group"
            title="Admin Customizer"
          >
            <Settings className="w-4 h-4 text-blue-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute top-1 right-1" />
          </button>

          {/* 7. Language Selector Dropdown (EN + Flag) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <span className="w-4 h-4 rounded-full bg-blue-700 flex items-center justify-center text-[9px] font-bold text-white overflow-hidden border border-blue-400/40">
                🇺🇸
              </span>
              <span>EN</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 text-xs text-slate-800 dark:text-slate-100 font-sans space-y-1">
                <div onClick={() => setIsLangOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex items-center gap-2">
                  <span>🇺🇸</span><span>English</span>
                </div>
                <div onClick={() => setIsLangOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex items-center gap-2">
                  <span>🇩🇪</span><span>Deutsch</span>
                </div>
                <div onClick={() => setIsLangOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex items-center gap-2">
                  <span>🇪🇸</span><span>Español</span>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-slate-700/60 mx-1 hidden sm:block" />

          {/* 8. User Profile (David Dev / Admin Head) */}
          <div className="flex items-center gap-2.5 cursor-pointer p-1 hover:bg-white/10 rounded-xl transition-all">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs border border-blue-400/40 shadow-sm overflow-hidden">
              <span className="font-extrabold text-[11px]">DD</span>
            </div>
            <div className="hidden xl:block text-left leading-tight">
              <p className="text-xs font-bold text-white">David Dev</p>
              <p className="text-[10px] text-slate-400">Admin Head</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </div>
        </div>
      </header>

      {/* Admin Customizer Offcanvas Drawer */}
      <AdminCustomizerDrawer />
    </>
  );
};
