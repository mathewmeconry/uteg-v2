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
import { EgtStarterLink } from "../../../../__generated__/graphql";
import { useEffect, useState } from "react";
import ForwardIcon from "@mui/icons-material/Forward";
import { graphql } from "../../../../__new_generated__";
import { useLazyQuery } from "@apollo/client";

export type GradingListDialogProps = {
  open: boolean;
  onClose: () => void;
  maxRounds: number;
  device: number;
  divisionIds: string[];
  currentStarter?: string;
};

const GradingListQueryDocument = graphql(`
  query EGTGradingListQuery($ids: [ID!]!, $round: Int!, $device: Int!) {
    egtJudgingDevice(ids: $ids, round: $round, device: $device) {
      starterslist {
        id
        category
        isDeleted
        starterlink {
          id
          starter {
            id
            firstname
            lastname
          }
          club {
            id
            name
          }
        }
      }
    }
  }
`);

export default function GradingListDialog(props: GradingListDialogProps) {
  const { t } = useTranslation(["egt", "common"]);
  const [deviceQuery] = useLazyQuery(
    GradingListQueryDocument
  );
  const [starters, setStarters] = useState<EgtStarterLink[][]>([]);
  useEffect(() => {
    if (props.open) {
      load();
    }
    async function load() {
      setStarters([]);
      for (let i = 0; i < props.maxRounds; i++) {
        const data = await deviceQuery({
          variables: {
            device: props.device,
            round: i,
            ids: props.divisionIds,
          },
          fetchPolicy: "cache-and-network",
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
        {[...Array(props.maxRounds).keys()].map((index) => (
          <>
            {!starters[index] && (
              <>
                <Skeleton
                  variant="rectangular"
                  sx={{ ml: 4, mt: 2 }}
                  key={index}
                >
                  <Typography variant="h5">
                    {t("round", { ns: "egt", number: 1 })}
                  </Typography>
                </Skeleton>
                {[...Array(5).keys()].map((key) => (
                  <Skeleton
                    variant="rectangular"
                    sx={{ mt: 2 }}
                    key={`${index}_${key}`}
                  />
                ))}
              </>
            )}
            {starters[index] && (
              <>
                <Typography variant="h5" sx={{ ml: 4, mt: 2 }} key={index}>
                  {t("round", { ns: "egt", number: index + 1 })}
                </Typography>
                <Table sx={{ mb: 4 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "2vw", p: 0 }}></TableCell>
                      <TableCell sx={{ width: "20vw" }}>
                        {t("firstname", { ns: "common" })}
                      </TableCell>
                      <TableCell sx={{ width: "20vw" }}>
                        {t("lastname", { ns: "common" })}
                      </TableCell>
                      <TableCell sx={{ width: "40vw" }}>
                        {t("club", { ns: "common" })}
                      </TableCell>
                      <TableCell sx={{ width: "20vw" }}>
                        {t("category", { ns: "egt" })}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {starters[index].map((starter) => (
                      <TableRow
                        key={starter.id}
                        sx={{
                          textDecoration: starter.isDeleted
                            ? "line-through"
                            : "none",
                        }}
                      >
                        <TableCell sx={{ p: 0 }}>
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
                          {starter.starterlink?.club?.name}
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
            )}
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
}
