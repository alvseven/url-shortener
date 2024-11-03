import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const updateLinkRequestSchema = z.object({
  userId: z.string().uuid(),
  shortCode: z.string().max(6),
  newUrl: z.string().url(),
});

export type UpdateLinkInput = z.infer<typeof updateLinkRequestSchema>;

export class UpdateLinkRequestDTO extends AbstractDTO<
  typeof updateLinkRequestSchema
> {
  protected rules() {
    return updateLinkRequestSchema;
  }
}
