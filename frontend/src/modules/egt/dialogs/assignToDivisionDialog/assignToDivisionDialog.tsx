import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  EgtDivision,
  EgtStarterLink,
  Sex,
  useEgtAssignToDivisionDialogLazyQuery,
  useEgtAssignToDivisionDialogMutationMutation,
} from "../../../../__generated__/graphql";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { enqueueSnackbar } from "notistack";

export type AssignToDivisionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  starters: EgtStarterLink[];
  sex: Sex;
};

export function AssignToDivisionDialog(props: AssignToDivisionDialogProps) {
  const { id } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation(["egt", "common"]);
  const [divisions, setDivisions] = useState<{
    [index: number]: Partial<EgtDivision>[];
  }>({});
  const categories = useMemo(() => {
    const categories = props.starters.map((starter) => starter.category);
    // deduplicates categories array
    return categories.filter(
      (category, index) => categories.indexOf(category) === index
    );
  }, [props.starters]);
  const [storing, setStoring] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      ...categories.reduce((prev, curr) => {
        if (curr) {
          prev[curr] = "";
        }
        return prev;
      }, {} as { [key: number]: string }),
    },
    mode: "onChange",
  });

  const [assignMutataion] = useEgtAssignToDivisionDialogMutationMutation();
  const [divisionQuery] = useEgtAssignToDivisionDialogLazyQuery();
  useEffect(() => {
    async function getDivisions() {
      setLoading(true);
      const divisions: { [index: number]: Partial<EgtDivision>[] } = {};
      for (const category of categories) {
        if (category) {
          const resp = await divisionQuery({
            variables: {
              filter: {
                competitionID: id!,
                category: category,
                sex: props.sex,
              },
            },
          });
          if (resp.data?.egtDivisions) {
            divisions[category] = resp.data?.egtDivisions;
          }
        }
      }
      setDivisions(divisions);
      setLoading(false);
    }

    if (props.isOpen) {
      getDivisions();
    }
  }, [categories, props.isOpen]);

  async function onSubmit(data: FieldValues) {
    setStoring(true);
    for (const starter of props.starters) {
      if (starter.category && starter.id) {
        const divisionId = data[starter.category];
        if (divisionId !== starter.division?.id) {
          try {
            await assignMutataion({
              variables: {
                data: {
                  divisionID: divisionId,
                  id: starter.id,
                },
              },
            });
          } catch {
            enqueueSnackbar(t("error"), { variant: "error" });
          }
        }
      }
    }
    enqueueSnackbar(
      t("assigned", {
        ns: "common",
        name: t("starter_count", {
          ns: "common",
          count: props.starters.length,
        }),
      }),
      { variant: "success" }
    );
    props.onClose();
    setStoring(false);
  }

  function renderDivisionSelection(category: number) {
    if (loading) {
      return <Skeleton variant="rectangular" />;
    }

    return (
      <FormTextInput
        name={category.toString()}
        label={t(`category_${category}`, {
          context: props.sex.toLowerCase(),
        })}
        ns="egt"
        fieldProps={{ select: true }}
        rules={{ required: true }}
      >
        {...divisions[category].map((division) => (
          <MenuItem key={division.id} value={division.id}>
            {t("division")} {division.number}
          </MenuItem>
        ))}
      </FormTextInput>
    );
  }

  return (
    <Dialog
      open={props.isOpen}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      onClose={props.onClose}
    >
      <DialogTitle>
        {t("assign_to", {
          what: t("starter", { ns: "common", count: props.starters.length }),
          to: t("division"),
        })}
      </DialogTitle>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            {...Object.keys(divisions).map((category) =>
              renderDivisionSelection(parseInt(category))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>{t("cancel")}</Button>
            <Button variant="contained" color="success" type="submit">
              {storing && <CircularProgress size={24} />}
              {!storing && t("save", { ns: "common" })}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
