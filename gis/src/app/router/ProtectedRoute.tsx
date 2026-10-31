import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { authService } from "@/features/auth/services/authservice";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
export default function ProtectedRoute() {
  const location = useLocation();
const setUser = useAuthStore((state) => state.setUser);

  const { data,isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    retry: false,
  });

useEffect(() => {
  if (data) {
    setUser(data); // Nếu API trả Result<AuthUser> thì dùng data.data
  }
}, [data, setUser]);

  if (isLoading) {
    return (
      <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-white/60 backdrop-blur-sm
      "
    >
      <div
        className="
          flex items-center gap-3 rounded-2xl
          bg-white px-5 py-4
          shadow-[0_16px_40px_rgba(15,23,42,0.12)]
        "
      >
        <LoaderCircle
          className="
            h-5 w-5 animate-spin
            text-(--color-primary)
          "
        />

        <span className="text-sm font-medium text-slate-700">
          Loading...
        </span>
      </div>
    </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}