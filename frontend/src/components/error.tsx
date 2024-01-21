import { useTranslation } from "react-i18next";

export function Error() {
  const { t } = useTranslation('common');

  return <>{t("error")}</>;
}
