import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type SidenavColor = 'dark' | 'light' | 'gray' | 'gradient';
export type TopbarColor = 'light' | 'dark' | 'gray';
export type SidenavSize = 'default' | 'compact' | 'offcanvas' | 'condensed';
export type LayoutWidth = 'fluid' | 'boxed';

export type SkinPreset =
  | 'default'
  | 'minimal'
  | 'saas'
  | 'modern'
  | 'flat'
  | 'galaxy'
  | 'luxe'
  | 'retro'
  | 'neon'
  | 'pixel'
  | 'vivid'
  | 'soft'
  | 'mono'
  | 'zen'
  | 'silver'
  | 'prism'
  | 'nova'
  | 'elegant'
  | 'matrix'
  | 'neo'
  | 'xenon'
  | 'aurora'
  | 'crystal'
  | 'orbit';

export interface SkinPresetConfig {
  theme?: ThemeMode;
  sidenavColor?: SidenavColor;
  topbarColor?: TopbarColor;
  sidenavUser?: boolean;
}

export const skinPresetConfigs: Record<SkinPreset, SkinPresetConfig> = {
  default: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  minimal: { theme: 'light', sidenavColor: 'gray', topbarColor: 'gray' },
  saas: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  modern: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  flat: { theme: 'light', sidenavColor: 'light', topbarColor: 'light' },
  galaxy: { theme: 'dark', sidenavColor: 'dark', topbarColor: 'dark' },
  luxe: { theme: 'light', sidenavColor: 'light', topbarColor: 'dark' },
  retro: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  neon: { theme: 'light', sidenavColor: 'light', topbarColor: 'light' },
  pixel: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  vivid: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  soft: { theme: 'light', sidenavColor: 'gradient', topbarColor: 'light' },
  mono: { theme: 'light', sidenavColor: 'light', topbarColor: 'dark' },
  zen: { theme: 'light', sidenavColor: 'dark', topbarColor: 'gray' },
  silver: { theme: 'light', sidenavColor: 'light', topbarColor: 'dark' },
  prism: { theme: 'light', sidenavColor: 'light', topbarColor: 'light' },
  nova: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  elegant: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  matrix: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  neo: { theme: 'light', sidenavColor: 'gray', topbarColor: 'light' },
  xenon: { theme: 'light', sidenavColor: 'gradient', topbarColor: 'light' },
  aurora: { theme: 'light', sidenavColor: 'gradient', topbarColor: 'gray' },
  crystal: { theme: 'light', sidenavColor: 'dark', topbarColor: 'light' },
  orbit: { theme: 'light', sidenavColor: 'gradient', topbarColor: 'light' },
};

export interface ThemeState {
  theme: ThemeMode;
  sidenavColor: SidenavColor;
  topbarColor: TopbarColor;
  sidenavSize: SidenavSize;
  layoutWidth: LayoutWidth;
  skin: SkinPreset;
  isPinned: boolean;
  isSettingsOpen: boolean;

  setTheme: (theme: ThemeMode) => void;
  setSidenavColor: (color: SidenavColor) => void;
  setTopbarColor: (color: TopbarColor) => void;
  setSidenavSize: (size: SidenavSize) => void;
  setLayoutWidth: (width: LayoutWidth) => void;
  setSkin: (skin: SkinPreset) => void;
  togglePinned: () => void;
  toggleSettings: () => void;
  setSettingsOpen: (isOpen: boolean) => void;
  resetDefaults: () => void;
  applyThemeAttributes: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      sidenavColor: 'dark',
      topbarColor: 'light',
      sidenavSize: 'default',
      layoutWidth: 'fluid',
      skin: 'default',
      isPinned: true,
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
      setLayoutWidth: (layoutWidth) => {
        set({ layoutWidth });
        get().applyThemeAttributes();
      },
      setSkin: (skin) => {
        const preset = skinPresetConfigs[skin] || {};
        set((state) => ({
          skin,
          theme: preset.theme || state.theme,
          sidenavColor: preset.sidenavColor || state.sidenavColor,
          topbarColor: preset.topbarColor || state.topbarColor,
        }));
        get().applyThemeAttributes();
      },
      togglePinned: () => set((state) => ({ isPinned: !state.isPinned })),
      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
      setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),

      resetDefaults: () => {
        set({
          theme: 'light',
          sidenavColor: 'dark',
          topbarColor: 'light',
          sidenavSize: 'default',
          layoutWidth: 'fluid',
          skin: 'default',
          isPinned: true,
        });
        get().applyThemeAttributes();
      },

      applyThemeAttributes: () => {
        const state = get();
        const html = document.documentElement;

        html.setAttribute('data-bs-theme', state.theme);
        html.setAttribute('data-skin', state.skin);
        html.setAttribute('data-menu-color', state.sidenavColor);
        html.setAttribute('data-topbar-color', state.topbarColor);
        html.setAttribute('data-sidenav-size', state.sidenavSize);
        html.setAttribute('data-layout-width', state.layoutWidth);

        if (state.theme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      },
    }),
    {
      name: '__PACES_THEME_CONFIG_V2__',
    }
  )
);
