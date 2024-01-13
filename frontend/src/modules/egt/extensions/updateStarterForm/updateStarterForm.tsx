import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { MenuItem, Skeleton } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
  useEgtDivisionLazyQuery,
  useEgtStarterLinkLazyQuery,
  useEgtStarterLinkMutationMutation,
} from "../../../../__generated__/graphql";
import { useEffect } from "react";
import { useFormSubmit } from "../../../../hooks/useFormSubmit/useFormSubmit";
import { ApolloError } from "@apollo/client";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { FormCategorySelect } from "../../components/form/FormCategorySelect";

export function EGTUpdateStarterForm() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { control: formControl, setValue } = useFormContext();
  const formSubmit = useFormSubmit();
  const sex = useWatch({ name: "sex", control: formControl });
  const linkId = useWatch({ name: "id", control: formControl });
  const category = useWatch({ name: "category", control: formControl });
  const [
    starterQuery,
    { loading: starterLoading, data: starterData },
  ] = useEgtStarterLinkLazyQuery();
  const [
    divisionQuery,
    { loading: divisionLoading, data: divisionData },
  ] = useEgtDivisionLazyQuery();
  const [mutation] = useEgtStarterLinkMutationMutation();

  async function onSubmit(data: any) {
    try {
      await mutation({
        variables: {
          data: {
            starterLinkID: data.id,
            category: parseInt(data.category),
            divisionID: data.division,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "category" });
        },
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
    if (starterData?.egtStarterLink?.category) {
      setValue("category", starterData.egtStarterLink.category);
    }
  }, [starterData]);

  useEffect(() => {
    if (linkId) {
      starterQuery({
        variables: {
          starterLinkID: linkId,
        },
      });
    }
  }, [linkId]);

  useEffect(() => {
    if (category && sex) {
      divisionQuery({
        variables: {
          filter: {
            competitionID: id || "",
            category: parseInt(category),
            sex,
          },
        },
      });
    }
  }, [category, sex]);

  function renderCategorySelection() {
    if (starterLoading || !linkId) {
      return <Skeleton variant="text" />;
    }

    return <FormCategorySelect rules={{ required: false }} />;
  }

  function renderDivisionSelection() {
    if (divisionLoading || !linkId || !category) {
      return <Skeleton variant="text" />;
    }

    return (
      <FormTextInput
        name="division"
        rules={{ required: false }}
        defaultValue=""
        fieldProps={{
          select: true,
        }}
      >
        {divisionData?.egtDivisions.map((division) => (
          <MenuItem key={division.id} value={division.id}>
            {t("egt.division")} {division.number}
          </MenuItem>
        ))}
      </FormTextInput>
    );
  }

  return (
    <>
      {renderCategorySelection()}
      {renderDivisionSelection()}
    </>
  );
}
