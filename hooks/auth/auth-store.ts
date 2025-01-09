import { create } from "zustand";
import Cookies from "js-cookie";
import { UserCreateDTO } from "hooks/user/user-schema";

const API_BASE_URL = process.env.NEXT_API_BASE_URL || "http://localhost:7777";

interface AuthProps {
  auth: { username: string; password: string } | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (user: UserCreateDTO) => Promise<void>;
  logout: () => void;
}

// Zustand Auth Store
export const useAuth = create<AuthProps>((set, get) => ({
  auth: null,

  signup: async (user: UserCreateDTO) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to create user");

    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
    }
  },

  login: async (username: string, password: string) => {
    const base64Credentials = btoa(`${username}:${password}`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Store auth details in Zustand
      set({ auth: { username, password } });

      // Set token in cookies
      Cookies.set("authToken", base64Credentials, { expires: 1 }); // Expires in 1 day

      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: () => {
    set({ auth: null });
    Cookies.remove("authToken"); // Remove the token
  },
}));
