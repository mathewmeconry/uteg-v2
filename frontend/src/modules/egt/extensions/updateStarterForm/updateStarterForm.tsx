import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { MenuItem, Skeleton } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
  useEgtStarterLinkLazyQuery,
  useEgtStarterLinkMutationMutation,
} from "../../../../__generated__/graphql";
import { useEffect } from "react";
import { useFormSubmit } from "../../../../hooks/useFormSubmit/useFormSubmit";
import { ApolloError } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

export function EGTUpdateStarterForm() {
  const { t } = useTranslation();
  const { control: formControl, setValue } = useFormContext();
  const formSubmit = useFormSubmit();
  const sex = useWatch({ name: "sex", control: formControl });
  const linkId = useWatch({ name: "id", control: formControl });
  const [query, { loading, data }] = useEgtStarterLinkLazyQuery();
  const [mutation] = useEgtStarterLinkMutationMutation();

  async function onSubmit(data: any) {
    try {
      await mutation({
        variables: {
          data: {
            starterLinkID: data.id,
            category: parseInt(data.category),
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "category" });
        }
      });
      enqueueSnackbar(t("Starter EGT link updated"), { variant: "success" });
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(t(e.message), { variant: "error" });
      }
      console.error(e);
    }
  }

  useEffect(() => {
    formSubmit.onValid(onSubmit);
  }, []);

  useEffect(() => {
    if (data?.egtStarterLink?.category) {
      setValue("category", data.egtStarterLink.category);
    }
  }, [data]);

  useEffect(() => {
    if (linkId) {
      query({
        variables: {
          starterLinkID: linkId,
        },
      });
    }
  }, [linkId]);

  if (loading || !linkId) {
    return <Skeleton variant="text" />;
  }

  return (
    <>
      <FormTextInput
        name="category"
        rules={{ required: false }}
        defaultValue=""
        fieldProps={{
          select: true,
        }}
      >
        <MenuItem value="1">{t("egt.category.1")}</MenuItem>
        <MenuItem value="2">{t("egt.category.2")}</MenuItem>
        <MenuItem value="3">{t("egt.category.3")}</MenuItem>
        <MenuItem value="4">{t("egt.category.4")}</MenuItem>
        <MenuItem value="5">{t("egt.category.5")}</MenuItem>
        <MenuItem value="6">{t("egt.category.6")}</MenuItem>
        <MenuItem value="7">{t("egt.category.7")}</MenuItem>
        <MenuItem value="8">{t(`egt.category.8.${sex}`)}</MenuItem>
      </FormTextInput>
    </>
  );
}
