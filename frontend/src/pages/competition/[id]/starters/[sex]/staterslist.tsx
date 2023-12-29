import { useParams } from "react-router-dom";
import { CompetitionLayout } from "../../../../../layouts/competitionlayout";

export function StartersList() {
  const {sex, id} = useParams()

  return (
    <CompetitionLayout>

    </CompetitionLayout>
  );
}
