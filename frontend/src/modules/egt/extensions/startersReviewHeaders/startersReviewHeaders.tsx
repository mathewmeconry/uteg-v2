import { TableCell, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function EGTStartersReviewHeaders() {
  const { t } = useTranslation("egt");
  return (
    <>
      <TableCell>{t("category")}</TableCell>
      <TableCell>
        {t("division_number")}
        <Typography variant="caption" paragraph>
          {t("invalid_division_ignore")}
        </Typography>
      </TableCell>
    </>
  );
}
