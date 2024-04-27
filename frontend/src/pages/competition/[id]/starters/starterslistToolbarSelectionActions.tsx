import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { StarterLink } from "../../../../__generated__/graphql";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModules } from "../../../../hooks/useModules/useModules";
import { useParams } from "react-router-dom";

export type StarterslistToolbarSelectionActionsProps = {
  onRowDeletionClick: (rows: MRT_Row<StarterLink>[]) => void;
  table: MRT_TableInstance<StarterLink>;
};

export default function StarterslistToolbarSelectionActions(
  props: StarterslistToolbarSelectionActionsProps
) {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const modules = useModules(id!);
  const selectedRows = props.table.getSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}></Box>;
  }

  return (
    <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
      {...modules.modules.map(
        (module) =>
          module.extensions.starterslistSelectedRowsActions && (
            <module.extensions.starterslistSelectedRowsActions
              table={props.table}
            />
          )
      )}
      <Tooltip
        title={t("delete_typed", {
          ns: "common",
          count: selectedRows.length,
          type: t("starter", { count: selectedRows.length }),
        })}
      >
        <Button
          color="error"
          onClick={() => props.onRowDeletionClick(selectedRows)}
          size="small"
        >
          <DeleteIcon />
          <Typography variant="body1"> ({selectedRows.length})</Typography>
        </Button>
      </Tooltip>
    </Box>
  );
}
