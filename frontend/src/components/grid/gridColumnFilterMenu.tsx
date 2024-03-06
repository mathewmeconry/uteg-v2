import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { GridColumnMenuProps, useGridApiContext } from "@mui/x-data-grid";
import { StarterLink } from "../../__generated__/graphql";
import { useEffect, useMemo } from "react";
import Check from "@mui/icons-material/Check";

export function GridColumnFilterMenu(
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
    for (const row of (props.rows ?? [])) {
      if (props.colDef.valueGetter) {
        // @ts-expect-error
        const rowValue = props.colDef.valueGetter({ row: row });
        if (!filterValues.includes(rowValue)) {
          filterValues.push(rowValue);
        }
      }
    }
    return filterValues.sort();
  }, [props.rows]);

  function getFilterItem() {
    const index = getFilterItemIndex();
    if (index === -1) {
      return {
        field: props.colDef.field,
        operator: "in",
        value: [],
      };
    }
    return gridApi.current.state.filter.filterModel.items[index];
  }

  function getFilterItemIndex() {
    return gridApi.current.state.filter.filterModel.items.findIndex(
      (filterItem) => {
        return (
          filterItem.field === props.colDef.field &&
          filterItem.operator === "in"
        );
      }
    );
  }

  useEffect(() => {
    const filterItemIndex = getFilterItemIndex();
    if (filterItemIndex === -1) {
      return;
    }

    const filterItem = getFilterItem();
    if (filterItem.value.length > 0) {
      filterItem.value = filterItem.value.filter((value: string) =>
        deduplicatedItems.includes(value)
      );
    }

    const newFilterItems = gridApi.current.state.filter.filterModel.items;
    newFilterItems[filterItemIndex] = filterItem;

    gridApi.current.setFilterModel({
      items: newFilterItems,
    });
  }, [deduplicatedItems]);

  function onItemClick(value: string) {
    const filterItem = getFilterItem();
    if (filterItem.value.includes(value)) {
      filterItem.value.splice(filterItem.value.indexOf(value), 1);
    } else {
      filterItem.value.push(value);
    }

    if (
      filterItem.value.length === 0 ||
      JSON.stringify(deduplicatedItems) === JSON.stringify(filterItem.value)
    ) {
      gridApi.current.setFilterModel({
        items: [],
      });
      return;
    }

    gridApi.current.setFilterModel({
      items: [filterItem],
    });
  }

  return (
    <Menu
      open={props.open}
      anchorEl={columnHeaderElement}
      onClose={props.hideMenu}
    >
      {deduplicatedItems.map((value, index) => (
        <MenuItem onClick={() => onItemClick(value)} key={index}>
          {getFilterItem().value.includes(value) && (
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
