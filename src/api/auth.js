import api from "./axios.js";
import { jwtDecode } from "jwt-decode";

// Authentication service
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post("/api/auth/register", userData);
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error(response.data.message || "Registration failed");
    } catch (error) {
      throw (
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/api/auth/login", credentials);
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      throw error.response?.data?.message || error.message || "Login failed";
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get("/api/auth/me");
      return response.data.data.user;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to get user data"
      );
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  },

  // Get stored user data
  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem("token");
  },
};

export default authService;
