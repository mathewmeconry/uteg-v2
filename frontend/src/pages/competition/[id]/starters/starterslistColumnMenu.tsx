import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { GridColumnMenuProps, useGridApiContext } from "@mui/x-data-grid";
import { StarterLink } from "../../../../__generated__/graphql";
import { useEffect, useMemo } from "react";
import Check from "@mui/icons-material/Check";

export function StarterlistColumnMenu(
  props: GridColumnMenuProps & {
    rows: StarterLink[];
  }
) {
  const gridApi = useGridApiContext();
  const columnHeaderElement = gridApi.current.getColumnHeaderElement(
    props.colDef.field
  );

  const deduplicatedItems = useMemo(() => {
    const filterValues: string[] = [];
    for (const row of props.rows) {
      if (props.colDef.valueGetter) {
        const rowValue = props.colDef.valueGetter({ row });
        if (!filterValues.includes(rowValue)) {
          filterValues.push(rowValue);
        }
      }
    }
    return filterValues.sort();
  }, [props.rows]);

  function getClubFilterItem() {
    for (const filterItem of gridApi.current.state.filter.filterModel.items) {
      if (filterItem.field === "club.name" && filterItem.operator === "in") {
        return filterItem;
      }
    }
    return {
      field: "club.name",
      operator: "in",
      value: [],
    };
  }

  useEffect(() => {
    const filterItem = getClubFilterItem();
    if (filterItem.value.length > 0) {
      filterItem.value = filterItem.value.filter((value: string) =>
        deduplicatedItems.includes(value)
      );

      if (filterItem.value.length === 0) {
        gridApi.current.setFilterModel({
          items: [],
        });
      } else {
        gridApi.current.setFilterModel({
          items: [filterItem],
        });
      }
    }
  }, [deduplicatedItems]);

  function onItemClick(value: string) {
    const clubFilter = getClubFilterItem();
    if (clubFilter.value.includes(value)) {
      clubFilter.value.splice(clubFilter.value.indexOf(value), 1);
    } else {
      clubFilter.value.push(value);
    }

    if (
      clubFilter.value.length === 0 ||
      JSON.stringify(deduplicatedItems) ===
        JSON.stringify(clubFilter.value.sort())
    ) {
      gridApi.current.setFilterModel({
        items: [],
      });
    } else {
      gridApi.current.setFilterModel({
        items: [clubFilter],
      });
    }
  }

  return (
    <Menu
      open={props.open}
      anchorEl={columnHeaderElement}
      onClose={props.hideMenu}
    >
      {deduplicatedItems.map((value, index) => (
        <MenuItem onClick={() => onItemClick(value)} key={index}>
          {getClubFilterItem().value.includes(value) && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          {value}
        </MenuItem>
      ))}
    </Menu>
  );
}
