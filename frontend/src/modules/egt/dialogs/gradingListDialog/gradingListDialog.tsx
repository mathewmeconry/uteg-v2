import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import {
  EgtStarterLink,
  useEgtDeviceGradingLazyQuery,
} from "../../../../__generated__/graphql";
import { useEffect, useState } from "react";
import ForwardIcon from "@mui/icons-material/Forward";

export type GradingListDialogProps = {
  open: boolean;
  onClose: () => void;
  maxRounds: number;
  device: number;
  divisionIds: string[];
  currentStarter?: string;
};

export default function GradingListDialog(props: GradingListDialogProps) {
  const { t } = useTranslation(["egt", "common"]);
  const [
    deviceQuery,
    { loading: deviceDataLoading },
  ] = useEgtDeviceGradingLazyQuery();
  const [starters, setStarters] = useState<EgtStarterLink[][]>([]);
  useEffect(() => {
    load();
    async function load() {
      setStarters([]);
      for (let i = 0; i < props.maxRounds; i++) {
        const data = await deviceQuery({
          variables: {
            device: props.device,
            round: i,
            ids: props.divisionIds,
          },
        });

        if (data.data?.egtJudgingDevice) {
          setStarters((s) => [
            ...s,
            data.data?.egtJudgingDevice.starterslist as EgtStarterLink[],
          ]);
        }
      }
    }
  }, [props.open, props.device, props.divisionIds, props.maxRounds]);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen={true}>
      <DialogTitle>
        <Typography variant="h4">
          {t("starters", { ns: "common" })}
          <IconButton sx={{ float: "right" }} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent>
        {deviceDataLoading &&
          [...Array(10).keys()].map((key) => (
            <Skeleton variant="rectangular" sx={{ mt: 2 }} key={key} />
          ))}

        {starters.map((round, roundIndex) => (
          <>
            <Typography variant="h5" sx={{ ml: 4, mt: 2 }} key={roundIndex}>
              {t("round", { ns: "egt", number: roundIndex + 1 })}
            </Typography>
            <Table sx={{ mb: 4 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "2vw", p: 0 }}></TableCell>
                  <TableCell sx={{ width: "35vw" }}>
                    {t("firstname", { ns: "common" })}
                  </TableCell>
                  <TableCell sx={{ width: "35vw" }}>
                    {t("lastname", { ns: "common" })}
                  </TableCell>
                  <TableCell sx={{ width: "20vw" }}>
                    {t("category", { ns: "egt" })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {round.map((starter) => (
                  <TableRow key={starter.id}>
                    <TableCell sx={{p: 0}}>
                      {starter.id === props.currentStarter ? (
                        <ForwardIcon fontSize="small" />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {starter.starterlink?.starter?.firstname}
                    </TableCell>
                    <TableCell>
                      {starter.starterlink?.starter?.lastname}
                    </TableCell>
                    <TableCell>
                      {t(`category_${starter.category}`, {
                        context: starter.starterlink.starter.sex,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
}
