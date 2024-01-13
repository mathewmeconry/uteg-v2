import { Dispatch, SetStateAction } from "react";
import {
  EgtStarterLinkMutationDocument,
  StarterLink,
} from "../../../../__generated__/graphql";
import { ImportFailure } from "../../../../pages/competition/[id]/starters/import/steps/importStep";
import { apolloClient } from "../../../../helpers/apollo";

export async function importStarters(
  starters: any[],
  starterLinks: Partial<StarterLink>[],
  progressUpdater: Dispatch<SetStateAction<number>>,
  setFailure: Dispatch<SetStateAction<ImportFailure[]>>
): Promise<void> {
  for (const link of starterLinks) {
    const starter = findStarterObj(starters, link.starter?.id || "");
    if (starter) {
      try {
        await apolloClient.mutate({
          mutation: EgtStarterLinkMutationDocument,
          variables: {
            data: {
              category: starter.egt.category
                ? parseInt(starter.egt.category)
                : undefined,
              starterLinkID: link.id,
              divisionNumber: starter.egt.divisionNumber
                ? parseInt(starter.egt.divisionNumber)
                : undefined,
            },
          },
        });
        progressUpdater((oldProgress) => oldProgress + 1);
      } catch (e) {
        setFailure((oldFailure) => [
          ...oldFailure,
          {
            step: "egt",
            starter: starter,
          },
        ]);
      }
    }
  }
}

function findStarterObj(starters: any[], id: string): any | undefined {
  for (const starter of starters) {
    if (starter.id === id) {
      return starter;
    }
  }
  return undefined;
}
