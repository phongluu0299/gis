
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/authservice";
import axios from "axios";
import type { LoginResponse } from "../types/authtype";
import type { Result } from "@/types/basetype";
export default function LoginPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
const loginMutation = useMutation({
  mutationFn: authService.login,

  onSuccess: async  (data:Result<LoginResponse> ) => {
  
    localStorage.setItem("accessToken", data.data.accessToken);
    await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

    navigate("/",{ replace: true });
   
  },
  onError: (error) => {
    
  let message = "Đăng nhập thất bại";

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ??
      error.message ??
      message;
  }

  toast.error(message);
},  
});
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <div
            className="
              flex h-28 w-28 items-center justify-center
              rounded-full bg-slate-100
            "
          >
            <div
              className="
                flex h-20 w-20 items-center justify-center
                rounded-3xl bg-(--color-primary)
                text-3xl font-bold text-white
                shadow-lg shadow-indigo-200
              "
            >
              LGSP
            </div>
          </div>
        </div>

        <form
  className="mt-10 space-y-6"
  onSubmit={(event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    loginMutation.mutate({
      username: String(formData.get("username")),
      password: String(formData.get("password")),
    });
  }}
>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Tài khoản
            </label>

            <input
              type="text"
              name="username"
                    autoComplete="username"
              placeholder="Nhập tên tài khoản"
              className="
                h-11 w-full rounded-xl border border-slate-200
                bg-white px-4 text-sm text-slate-700 outline-none
                transition placeholder:text-slate-400
                focus:border-(--color-primary)
                focus:ring-4 focus:ring-indigo-50
              "
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Mật khẩu
              </label>

              {/* <button
                type="button"
                className="
                  text-sm font-medium text-(--color-primary)
                  transition hover:opacity-80
                "
              >
                Forgot your password?
              </button> */}
            </div>

            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              className="
                h-11 w-full rounded-xl border border-slate-200
                bg-white px-4 text-sm text-slate-700 outline-none
                transition placeholder:text-slate-400
                focus:border-(--color-primary)
                focus:ring-4 focus:ring-indigo-50
              "
            />
          </div>

          <button
  type="submit"
  disabled={loginMutation.isPending}
  className="
    flex h-11 w-full items-center justify-center
    rounded-xl bg-slate-950 text-sm font-medium
    text-white transition hover:opacity-90
    disabled:cursor-not-allowed disabled:opacity-60
  "
>
  {loginMutation.isPending ? "Đang tải..." : "Đăng nhập"}
</button>


        </form>

        {/* <div className="mt-8 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="
              font-medium text-(--color-primary)
              transition hover:opacity-80
            "
          >
            Sign up
          </Link>
        </div> */}
      </div>
    </div>
  );
}