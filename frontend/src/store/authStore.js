import axios from "axios";
import { create } from "zustand";

const AUTH_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true; // so axios will send cookies along with the request

export const useAuthStore = create(function (set) {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    message: null,
    isVerifyingAuth: true, // if it's false initially then before verifying auth for the routes will be executed
    // error: null,

    signup: async ({ email, password, name }) => {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${AUTH_URL}/signup`, {
          email,
          password,
          name,
        });
        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
        throw {
          message: error.response.data.message || "Error occurred while signing up!",
        };
      }
    },

    verifyEmail: async function (code) {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${AUTH_URL}/verify-email`, { code });
        set({ isLoading: false, user: response.data.user, isAuthenticated: true });
        // return response.data;
      } catch (error) {
        set({ isLoading: false });
        throw {
          message: error.response.data.message || "Error occurred while verifying email",
        };
      }
    },

    verifyAuth: async function () {
      try {
        const response = await axios.get(`${AUTH_URL}/verify-auth`);
        set({ user: response.data.user, isAuthenticated: true, isVerifyingAuth: false });
      } catch (error) {
        set({ isVerifyingAuth: false, isAuthenticated: false });
      }
    },

    login: async function ({ email, password }) {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${AUTH_URL}/login`, { email, password });
        const { user } = response.data;

        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      } catch (error) {
        set({ isLoading: false });
        // setError(`${error.response.data.message} ⚠️⚠️`);
        throw { message: error.response.data.message };
      }
    },

    logout: async function () {
      set({ isLoading: true });
      try {
        await axios.post(`${AUTH_URL}/logout`);
        set({ user: null, isLoading: false, isAuthenticated: false });
      } catch {
        set({ isLoading: false });
        throw { message: "Error occurred while logging out!" };
      }
    },

    forgotPassword: async function (email) {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${AUTH_URL}/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
        console.log(error);
        throw {
          message:
            error.response.data.message || "Error while sending password reset link",
        };
      }
    },

    resetPassword: async function ({ resetToken, password }) {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${AUTH_URL}/reset-password/${resetToken}`, {
          password,
        });
        set({ isLoading: false, user: response.data.user });
      } catch (error) {
        set({ isLoading: false });
        throw {
          message:
            error.response.data.message || "Error occurred while reseting password",
        };
      }
    },
  };
});
