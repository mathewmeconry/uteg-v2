import { useTranslation } from "react-i18next";

export function Error() {
  const { t } = useTranslation();

  return <>{t("Something went wrong")}</>;
}
