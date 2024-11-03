import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const generateLinkRequestSchema = z.object({
  url: z.string().url(),
  userId: z.string().uuid().nullable(),
});

export type GenerateLinkInput = z.infer<typeof generateLinkRequestSchema>;

export class GenerateLinkRequestDTO extends AbstractDTO<
  typeof generateLinkRequestSchema
> {
  protected rules() {
    return generateLinkRequestSchema;
  }
}
