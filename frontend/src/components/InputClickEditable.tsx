import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Variant } from "@mui/material/styles/createTypography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export type InputClickEditableProps = {
  value: string;
  label: string;
  typographyVariant?: Variant;
  onChange?: (value: string) => void | Promise<void>;
  onSave?: (value: string) => void | Promise<void>;
  onCancel?: () => void;
  endAdornment?: string;
  loading?: boolean;
};

export function InputClickEditable(props: InputClickEditableProps) {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(props.value);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  async function onSave() {
    setUpdating(true);
    setEditable(false);
    if (props.onSave) {
      await props.onSave(value);
    }
    setUpdating(false);
  }

  function onCancel() {
    setEditable(false);
    setValue(props.value);
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  }

  if (!editable) {
    return (
      <>
        <Typography variant="caption">{props.label}</Typography>
        {props.loading && <Skeleton sx={{ width: 1 }} variant="text" />}
        {!props.loading && (
          <Typography
            variant={props.typographyVariant}
            onClick={() => setEditable(true)}
            mb={1}
          >
            {props.value}
            {props.endAdornment ? props.endAdornment : ""}
            <IconButton
              size="small"
              onClick={() => setEditable(true)}
              sx={{ float: "right" }}
            >
              {updating && <CircularProgress size={20} />}
              {!updating && <ModeEditIcon fontSize="small" />}
            </IconButton>
          </Typography>
        )}
      </>
    );
  }

  return (
    <TextField
      value={value}
      label={props.label}
      onChange={onChange}
      autoFocus
      margin="dense"
      size="small"
      fullWidth
      variant="standard"
      disabled={!editable}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.endAdornment ? props.endAdornment : ""}
            <IconButton size="small" color="success" onClick={onSave}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
