import { useFormContext, useWatch } from "react-hook-form";

export function useFormValues() {
  const context = useFormContext();
  useWatch();

  if (context.getValues) {
    return {
      ...context.getValues(),
    };
  }

  return {};
}
