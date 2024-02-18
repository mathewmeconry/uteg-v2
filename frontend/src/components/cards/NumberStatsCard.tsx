import { Card, CardContent, Skeleton, Typography } from "@mui/material";

export type NumberStatsCardProps = {
  title: string;
  value: number;
  loading?: boolean;
};

export function NumberStatsCard(props: NumberStatsCardProps) {
  if (props.loading) {
    return (
      <Skeleton sx={{ width: "100%", height: "100%" }} variant="rectangular" />
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="h3" textAlign="right">
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
}
