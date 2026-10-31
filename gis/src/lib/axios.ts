import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Chỉ tồn tại khi đang có một request refresh chạy
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  // Nếu đã có request refresh đang chạy
  // thì tất cả request khác dùng chung Promise này.
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = axiosRefresh
    .post("/auth/refresh")
    .then((response) => {
      const newAccessToken =
        response.data.data.accessToken;

      if (!newAccessToken) {
        throw new Error(
          "API refresh không trả accessToken"
        );
      }

      localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      return newAccessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

// ================================
// REQUEST INTERCEPTOR
// ================================

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================================
// RESPONSE INTERCEPTOR
// ================================

axiosClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | CustomAxiosRequestConfig
        | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized =
      error.response?.status === 401;

    // Không tự refresh khi chính API login bị 401.
    // Chỉnh path này nếu login endpoint của ông khác.
    const isLoginRequest =
      originalRequest.url === "/auth/login";

    const isRefreshRequest =
      originalRequest.url === "/auth/refresh";

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isLoginRequest &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken =
          await refreshAccessToken();

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry lại request bị 401 ban đầu
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        // Tránh redirect lặp nếu đang ở login
        if (
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);