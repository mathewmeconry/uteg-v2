import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Display() {
  const { t } = useTranslation(["egt", "common"]);
  const { token } = useParams();

  if (!token) {
    return (
      <div>
        <h1>{t("common:error")}</h1>
      </div>
    );
  }

  return (
    <div>
        <h1>{t("egt:displays")}</h1>
    </div>
  );
}
