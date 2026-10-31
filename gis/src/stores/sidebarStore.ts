import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarStore = {
  collapsed: boolean;
  openGroup: string | null;

  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;

  toggleGroup: (key: string) => void;
  setOpenGroup: (key: string | null) => void;
  clear: () => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      collapsed: false,
      openGroup: null,

      toggleSidebar: () =>
        set((state) => ({
          collapsed: !state.collapsed,
        })),

      setCollapsed: (value) =>
        set({
          collapsed: value,
        }),

      toggleGroup: (key) =>
        set((state) => ({
          openGroup: state.openGroup === key ? null : key,
        })),

      setOpenGroup: (key) =>
        set({
          openGroup: key,
        }),
      clear: () =>
        set({
          collapsed: false,
          openGroup: null,
        }),
    }),
    {
      name: "base-admin-sidebar",
      partialize: (state) => ({
        collapsed: state.collapsed,
        openGroup: state.openGroup,
      }),
    }
  )
);
