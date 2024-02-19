import { create } from "zustand";

interface NotificationsStore {
  notifications: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

const useNotificationList = create<NotificationsStore>((set) => ({
  notifications: [],
  add: (id) =>
    set((state) => ({ notifications: [...state.notifications, id] })),
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notificationId) => notificationId !== id
      ),
    })),
  set: (ids) => set({ notifications: ids }),
}));

export default useNotificationList;
