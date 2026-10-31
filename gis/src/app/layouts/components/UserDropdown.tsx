import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/features/auth/services/authservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useAuthStore } from "@/stores/useAuthStore";

export default function UserDropdown() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
      useSidebarStore.getState().clear();
      clearUser();
      navigate("/login", { replace: true });
    },
  });
const user = useAuthStore((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="
              flex items-center gap-3 rounded-xl
              bg-white px-2 py-1 transition hover:bg-slate-50 border-0
            "
        >
          <div
            className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-(--color-primary)
                text-sm font-bold text-white
              "
          >
            Avt
          </div>

          <div className="text-left leading-tight">
            <div className="font-semibold text-slate-950">{user?.fullname}</div>

            {/* <div className="text-sm text-slate-500">Developer</div> */}
          </div>

          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
    w-48 rounded-2xl border-0 bg-white p-2
    shadow-[0_16px_40px_rgba(15,23,42,0.12)]
  "
      >
        {/* <DropdownMenuItem
          className="
              cursor-pointer rounded-xl py-2.5
              focus:bg-slate-100
            "
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem> */}

        {/* <DropdownMenuSeparator className="bg-slate-100" /> */}

        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => {
            logoutMutation.mutate();
          }}
          className="
              cursor-pointer rounded-xl py-2.5
              text-red-500 focus:bg-red-50
              focus:text-red-500
            "
        >
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
