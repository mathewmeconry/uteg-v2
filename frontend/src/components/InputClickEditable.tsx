import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
};

export function InputClickEditable(props: InputClickEditableProps) {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(props.value);

  async function onSave() {
    setEditable(false);
    if (props.onSave) {
      await props.onSave(value);
    }
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
        <Typography
          variant={props.typographyVariant}
          onClick={() => setEditable(true)}
          mb={1}
        >
          {props.value}
          <IconButton
            size="small"
            onClick={() => setEditable(true)}
            sx={{ float: "right" }}
          >
            <ModeEditIcon fontSize="small" />
          </IconButton>
        </Typography>
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
