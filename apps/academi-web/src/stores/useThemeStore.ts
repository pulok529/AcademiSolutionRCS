import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type SidenavColor = 'dark' | 'light' | 'gray' | 'gradient';
export type TopbarColor = 'light' | 'dark' | 'gray';
export type SidenavSize = 'default' | 'compact' | 'offcanvas';
export type SkinPreset = 'default' | 'minimal' | 'saas' | 'modern' | 'galaxy' | 'soft';

export interface ThemeState {
  theme: ThemeMode;
  sidenavColor: SidenavColor;
  topbarColor: TopbarColor;
  sidenavSize: SidenavSize;
  skin: SkinPreset;
  isSettingsOpen: boolean;

  setTheme: (theme: ThemeMode) => void;
  setSidenavColor: (color: SidenavColor) => void;
  setTopbarColor: (color: TopbarColor) => void;
  setSidenavSize: (size: SidenavSize) => void;
  setSkin: (skin: SkinPreset) => void;
  toggleSettings: () => void;
  setSettingsOpen: (isOpen: boolean) => void;
  applyThemeAttributes: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      sidenavColor: 'dark',
      topbarColor: 'light',
      sidenavSize: 'default',
      skin: 'default',
      isSettingsOpen: false,

      setTheme: (theme) => {
        set({ theme });
        get().applyThemeAttributes();
      },
      setSidenavColor: (sidenavColor) => {
        set({ sidenavColor });
        get().applyThemeAttributes();
      },
      setTopbarColor: (topbarColor) => {
        set({ topbarColor });
        get().applyThemeAttributes();
      },
      setSidenavSize: (sidenavSize) => {
        set({ sidenavSize });
        get().applyThemeAttributes();
      },
      setSkin: (skin) => {
        set({ skin });
        get().applyThemeAttributes();
      },
      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
      setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),

      applyThemeAttributes: () => {
        const state = get();
        const html = document.documentElement;

        html.setAttribute('data-bs-theme', state.theme);
        html.setAttribute('data-menu-color', state.sidenavColor);
        html.setAttribute('data-topbar-color', state.topbarColor);
        html.setAttribute('data-sidenav-size', state.sidenavSize);
        html.setAttribute('data-skin', state.skin);

        if (state.theme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      },
    }),
    {
      name: '__PACES_THEME_CONFIG__',
    }
  )
);
