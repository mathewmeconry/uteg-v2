import { IconButton } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Dispatch, SetStateAction } from "react";
export function StarterslistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
}) {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <IconButton onClick={() => props.openDialog("addStarter")}>
        <PersonAddIcon />
      </IconButton>
    </GridToolbarContainer>
  );
}
