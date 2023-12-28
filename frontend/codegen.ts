
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/schema.gql",
  documents: "src/**/*.gql.ts",
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withMutationOptionsType: true,
        enumsAsTypes: true
      },
    }
  }
};

export default config;
