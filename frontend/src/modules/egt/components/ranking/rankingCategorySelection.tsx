import { useState } from "react";
import { Sex } from "../../../../__generated__/graphql";
import { Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RankingList } from "./rankingList";

export type RankingCategorySelectionProps = {
  sex: Sex;
};

export function RankingCategorySelection(props: RankingCategorySelectionProps) {
  const [category, setCategory] = useState(1);
  const { t } = useTranslation("egt");

  return (
    <>
      <Tabs
        value={category}
        onChange={(_, v) => setCategory(v)}
        variant="fullWidth"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Tab
            key={i}
            value={i}
            label={t(`category_${i}`, {
              ns: "egt",
              context: props.sex.toLowerCase(),
            })}
          />
        ))}
      </Tabs>
      <RankingList category={category} sex={props.sex} />
    </>
  );
}
