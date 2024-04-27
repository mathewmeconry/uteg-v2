import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_DE } from "material-react-table/locales/de";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function useMaterialReactTableLocalization() {
  const { i18n } = useTranslation();

  const language = useMemo(() => {
    let lang = MRT_Localization_EN;
    switch (i18n.language) {
      case "de":
        lang = MRT_Localization_DE;
    }
    return lang;
  }, [i18n.language]);

  return language;
}
