import { useEffect, useState } from "react";
import { useFormState } from "react-hook-form";
import { useFormValues } from "../useFormValues/useFormValues";

export type useFormSubmitReturn = {
  onValid: (func: onValidFunc) => void;
  onInvalid?: (func: onInvalidFunc) => void;
};

export type onValidFunc = (data: any) => void;
export type onInvalidFunc = () => void;

export function useFormSubmit(): useFormSubmitReturn {
  const [onValid, setOnValid] = useState<onValidFunc>((_: any) => {});
  const [onInvalid, setOnInvalid] = useState<onInvalidFunc>(() => {});

  const { isSubmitting, errors } = useFormState();
  const formValues = useFormValues();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        onValid(formValues);
      } else {
        onInvalid();
      }
    }
  }, [isSubmitting, errors]);

  return {
    onValid: (func: onValidFunc) => setOnValid(() => func),
    onInvalid: (func: onInvalidFunc) => setOnInvalid(() => func),
  };
}
