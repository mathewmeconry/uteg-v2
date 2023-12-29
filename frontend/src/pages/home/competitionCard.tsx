import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type CompetitionFields = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
};

export function CompetitionCard(props: { competition: CompetitionFields }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/competition/${props.competition.id}/dashboard`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.competition.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.competition.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(props.competition.startDate).format("L")} -{" "}
            {dayjs(props.competition.endDate).format("L")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
