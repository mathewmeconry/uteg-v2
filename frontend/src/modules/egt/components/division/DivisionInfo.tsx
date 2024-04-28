import { List, Skeleton, ListItemText } from "@mui/material";
import { t } from "i18next";
import { useEgtDivisionQuery } from "../../../../__generated__/graphql";

export type DivisionInfoProps = {
  id: string;
};

export default function DivisionInfo(props: DivisionInfoProps) {
  const { data: division, loading } = useEgtDivisionQuery({
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return (
      <List>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </List>
    );
  }

  return (
    <List sx={{ display: "flex", flexDirection: "column" }}>
      <ListItemText
        primary={t("category", { ns: "egt" })}
        secondary={division?.egtDivision?.category}
      />
      <ListItemText
        primary={t("number", { ns: "common" })}
        secondary={division?.egtDivision?.number}
      />
      <ListItemText
        primary={t("sex", { ns: "common" })}
        secondary={t(division?.egtDivision?.sex!)}
      />
      <ListItemText
        primary={t("ground", { ns: "common" })}
        secondary={division?.egtDivision?.ground}
      />
      <ListItemText
        primary={t("totalRounds", { ns: "egt" })}
        secondary={division?.egtDivision?.totalRounds}
      />
    </List>
  );
}
