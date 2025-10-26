import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [], // ✅ Always start as an array
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Fetch all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");

      // ✅ Ensure users is always an array
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.users)
        ? res.data.users
        : [];

      set({ users: data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      const message = error?.response?.data?.message || "Failed to load users";
      toast.error(message);

      // ✅ Prevent .map() crash in Sidebar
      set({ users: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Fetch messages for selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.messages)
        ? res.data.messages
        : [];

      set({ messages: data });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      const message = error?.response?.data?.message || "Failed to load messages";
      toast.error(message);

      // ✅ Prevent downstream errors
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send a new message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Failed to send message:", error);
      const message = error?.response?.data?.message || "Failed to send message";
      toast.error(message);
    }
  },

  // ✅ Socket subscriptions
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },

  // ✅ Set selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
