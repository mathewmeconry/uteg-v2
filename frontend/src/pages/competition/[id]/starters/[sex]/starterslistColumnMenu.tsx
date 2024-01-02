import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { GridColumnMenuProps, useGridApiContext } from "@mui/x-data-grid";
import { StarterLink } from "../../../../../__generated__/graphql";
import { useEffect, useMemo, useState } from "react";
import Check from "@mui/icons-material/Check";

export function StarterlistColumnMenu(
  props: GridColumnMenuProps & {
    rows: StarterLink[];
  }
) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
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
    return filterValues;
  }, [props.rows]);

  useEffect(() => {
    setSelectedFilters((filters) => {
      for (const filter of selectedFilters) {
        if (!deduplicatedItems.includes(filter)) {
          filters.splice(filters.indexOf(filter), 1);
        }
      }
      return [...filters];
    });
  }, [deduplicatedItems]);

  function onItemClick(value: string) {
    setSelectedFilters((filters) => {
      if (filters.includes(value)) {
        filters.splice(filters.indexOf(value), 1);
      } else {
        filters.push(value);
      }
      return [...filters];
    });
  }

  console.log(selectedFilters);
  console.log(props);
  return (
    <Menu
      open={props.open}
      anchorEl={columnHeaderElement}
      onClose={props.hideMenu}
    >
      {deduplicatedItems.map((value, index) => (
        <MenuItem onClick={() => onItemClick(value)} key={index}>
          {selectedFilters.includes(value) && (
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
