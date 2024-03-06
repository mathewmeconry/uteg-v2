import { GridFilterItem, GridFilterOperator } from "@mui/x-data-grid";

const inFilter: GridFilterOperator = {
  label: "In",
  value: "in",
  // @ts-ignore need to add noop based on the docs (https://mui.com/x/react-data-grid/filtering/customization/#optimize-performance)
  getApplyFilterFn: () => {},
  getApplyFilterFnV7: (filterItem: GridFilterItem) => {
    return (value: string): boolean => {
      if (filterItem.value.length === 0) {
        return true;
      }

      return filterItem.value.includes(value);
    };
  },
};

export default inFilter;
