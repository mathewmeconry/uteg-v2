
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/schema.gql",
  ignoreNoDocuments: true,
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      documents: ["src/**/*.gql.ts"],
      config: {
        withHooks: true,
        withMutationOptionsType: true,
        enumsAsTypes: true
      },
    },
    'src/__new_generated__/': {
      preset: 'client',
      documents: ['src/**/*.tsx', 'src/**/*.ts'],
      config: {

      }
    }
  }
};

export default config;
