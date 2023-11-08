import { create } from "zustand";

type ConfirmState = {
  isConfirmVisible: boolean;
  onConfirm: (() => void) | null;
  showConfirm: (onConfirmCallback: () => void) => void;
  hideConfirm: () => void;
};

export const useConfirmStore = create<ConfirmState>((set) => ({
  isConfirmVisible: false,
  onConfirm: null,
  showConfirm: (onConfirmCallback) =>
    set({ isConfirmVisible: true, onConfirm: onConfirmCallback }),
  hideConfirm: () => set({ isConfirmVisible: false, onConfirm: null }),
}));
