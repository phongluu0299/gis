import { Link, useRouteError } from "react-router-dom";

type ErrorStatus = 403 | 404 | 500;

type ErrorPageProps = {
  status?: ErrorStatus;
};

export default function ErrorPage({ status: statusProp }: ErrorPageProps) {
  const error = useRouteError() as { status?: number } | undefined;

  const status = statusProp ?? (
    error?.status === 403 || error?.status === 404 || error?.status === 500
      ? error.status
      : 500
  );

  const config = {
    403: {
      title: "Forbidden",
      message: "Bạn không có quyền truy cập trang này.",
    },
    404: {
      title: "Page not found",
      message: "Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.",
    },
    500: {
      title: "Internal server error",
      message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    },
  }[status];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="text-7xl font-bold text-[var(--color-primary)]">
          {status}
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-950">
          {config.title}
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          {config.message}
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 text-sm font-medium text-white"
        >
          Về Dashboard
        </Link>
      </div>
    </div>
  );
}