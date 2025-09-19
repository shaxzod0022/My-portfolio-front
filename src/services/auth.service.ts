// src/services/AuthService.ts
export const AuthService = {
  getToken(): string | null {
    return sessionStorage.getItem("token");
  },

  setToken(token: string) {
    sessionStorage.setItem("token", token);
  },

  clearToken() {
    sessionStorage.removeItem("token");
  },
};
