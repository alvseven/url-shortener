import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const redirectRequestSchema = z.object({
  shortCode: z.string().max(6),
});

export type RedirectInput = z.infer<typeof redirectRequestSchema>;

export class RedirectRequestDTO extends AbstractDTO<
  typeof redirectRequestSchema
> {
  protected rules() {
    return redirectRequestSchema;
  }
}
