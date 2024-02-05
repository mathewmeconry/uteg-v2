import { FieldValues } from "react-hook-form";
import {
  CreateEgtSettingsDocument,
  EgtCategorySettings,
} from "../../../../__generated__/graphql";
import { apolloClient } from "../../../../helpers/apollo";

export async function createCompetition(
  competitionID: string,
  values: FieldValues
): Promise<void> {
  const categorySettings: EgtCategorySettings[] = [];

  for (const [key, value] of Object.entries(values)) {
    switch (key) {
      case "categories":
        for (const [sex, settings] of Object.entries(value)) {
          for (const category in settings as Array<any>) {
            categorySettings.push({
              category: parseInt(category),
              honourPrecentage: parseInt(settings[category].honourPrecentage),
              sex: sex as EgtCategorySettings["sex"],
            });
          }
        }
        break;
    }
  }

  await apolloClient.mutate({
    mutation: CreateEgtSettingsDocument,
    variables: {
      competitionID,
      data: {
        categorySettings,
      },
    },
  });
}
