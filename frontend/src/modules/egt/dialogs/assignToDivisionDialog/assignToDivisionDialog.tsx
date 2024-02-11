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
  Sex,
  StarterLink,
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
  starters: StarterLink[];
};

type CategoryWithSex = {
  category: number;
  sex: Sex;
};

export function AssignToDivisionDialog(props: AssignToDivisionDialogProps) {
  const { id } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation(["egt", "common"]);
  const [divisions, setDivisions] = useState<{
    [index: string]: Partial<EgtDivision>[];
  }>({});
  const categoriesWithSex: CategoryWithSex[] = useMemo(() => {
    const categoriesWithSex: CategoryWithSex[] = props.starters
      .filter((starter) => starter && starter.egt?.category)
      .map((starter) => ({
        category: starter.egt?.category || -1,
        sex: starter.starter.sex,
      }));

    // deduplicates categories array
    return categoriesWithSex
      .filter(
        (category, index) =>
          categoriesWithSex.findIndex(
            (c) => c.category === category.category && c.sex === category.sex
          ) === index
      )
      .sort((a, b) => a.category - b.category)
      .sort((a, b) => a.sex.localeCompare(b.sex));
  }, [props.starters]);
  const [storing, setStoring] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      ...categoriesWithSex.reduce((prev, curr) => {
        if (curr) {
          prev[`${curr.category}_${curr.sex}`] = "";
        }
        return prev;
      }, {} as { [key: string]: string }),
    },
    mode: "onChange",
  });

  const [assignMutataion] = useEgtAssignToDivisionDialogMutationMutation();
  const [divisionQuery] = useEgtAssignToDivisionDialogLazyQuery();
  useEffect(() => {
    async function getDivisions() {
      setLoading(true);
      const divisions: { [index: string]: Partial<EgtDivision>[] } = {};
      for (const category of categoriesWithSex) {
        if (category) {
          const resp = await divisionQuery({
            variables: {
              filter: {
                competitionID: id!,
                category: category.category,
                sex: category.sex,
              },
            },
          });
          if (resp.data?.egtDivisions) {
            divisions[`${category.category}_${category.sex}`] =
              resp.data?.egtDivisions;
          }
        }
      }
      setDivisions(divisions);
      setLoading(false);
    }

    if (props.isOpen) {
      getDivisions();
    }
  }, [categoriesWithSex, props.isOpen]);

  async function onSubmit(data: FieldValues) {
    setStoring(true);
    for (const starter of props.starters) {
      if (starter && starter.egt?.category && starter.egt?.id) {
        const divisionId =
          data[`${starter.egt.category}_${starter.starter.sex}`];
        if (divisionId !== starter.egt?.division?.id) {
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

  function renderDivisionSelection(category: CategoryWithSex) {
    if (loading) {
      return <Skeleton variant="rectangular" />;
    }

    return (
      <FormTextInput
        name={`${category.category}_${category.sex}`}
        label={t(
          `category_${category.category}_${category.sex.toLowerCase()}`,
          {
            context: category.sex.toLowerCase(),
          }
        )}
        annotation={category.sex.toLowerCase()}
        ns="egt"
        fieldProps={{ select: true }}
        rules={{ required: true }}
      >
        {...(divisions[`${category.category}_${category.sex}`] || []).map(
          (division) => (
            <MenuItem key={division.id} value={division.id}>
              {t("division")} {division.number}
            </MenuItem>
          )
        )}
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
            {...categoriesWithSex.map((category) =>
              renderDivisionSelection(category)
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
