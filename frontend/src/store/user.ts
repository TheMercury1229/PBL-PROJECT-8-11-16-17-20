import { create } from "zustand";
import { UserState } from "../types/types";

export const useUserStore = create<UserState>((set) => ({
  id: "",
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  role: "",
  loggedIn: false,
  setId: (id) => set(() => ({ id })),
  setFullName: (name) => set(() => ({ fullName: name })),
  setEmail: (email) => set(() => ({ email })),
  setMobile: (mobile) => set(() => ({ mobile })),
  setPassword: (password) => set(() => ({ password })),
  setRole: (role) => set(() => ({ role })),
  setLoggedIn: (status) => set(() => ({ loggedIn: status })),
}));
