import * as v from 'valibot';

export const schema = v.pipe(
  v.object({
    mtohInput: v.string(),
    htomInput: v.string(),
  }),
  v.readonly(),
);
