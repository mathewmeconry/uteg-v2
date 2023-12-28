import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./auth";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export function ProtectedRoute() {
  const { t } = useTranslation();
  if (!isTokenValid()) {
    enqueueSnackbar(t("Permission Denied!"), { variant: "error", key: 'permissionDenied' });
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <Outlet />;
}
