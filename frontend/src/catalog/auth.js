import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  // Login function
  login: async (credentials) => {
    try {
      const res = await fetch("/api/accounts/login", { // Updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok && data.token) { // Expecting a token from the backend
        // Optionally store token in localStorage/sessionStorage
        // localStorage.setItem("token", data.token);

        set({ user: data.user, isAuthenticated: true });
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred while logging in." };
    }
  },

  // Register function
  register: async (newUser) => {
    try {
      const res = await fetch("/api/accounts", { // Updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (res.ok) {
        return { success: true, message: "Registration successful" };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "An error occurred while registering." };
    }
  },

  // Logout function
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" }); // Ensure backend logout endpoint exists
      // Optionally remove token from localStorage/sessionStorage
      // localStorage.removeItem("token");

      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  // Fetch authenticated user
  fetchUser: async () => {
    try {
      const res = await fetch("/api/accounts/user", { // Updated endpoint
        headers: {
          // Include token if authentication requires it
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (res.ok && data.user) {
        set({ user: data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
