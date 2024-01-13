import { TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";

export function EGTStartersReviewHeaders() {
  const { t } = useTranslation();
  return (
    <>
      <TableCell>{t("egt.category")}</TableCell>
      <TableCell>{t("egt.divisionNumber")}</TableCell>
    </>
  );
}
