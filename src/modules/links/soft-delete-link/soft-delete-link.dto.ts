import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const softDeleteLinkRequestSchema = z.object({
  userId: z.string().uuid(),
  shortCode: z.string().max(6),
});

export type SoftDeleteLinkInput = z.infer<typeof softDeleteLinkRequestSchema>;

export class SoftDeleteLinkRequestDTO extends AbstractDTO<
  typeof softDeleteLinkRequestSchema
> {
  protected rules() {
    return softDeleteLinkRequestSchema;
  }
}
