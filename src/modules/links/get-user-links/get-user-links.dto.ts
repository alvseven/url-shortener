import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const getUserLinksRequestSchema = z.object({
  userId: z.string().uuid(),
});

export type GetUserLinksInput = z.infer<typeof getUserLinksRequestSchema>;

export class GetUserLinksRequestDTO extends AbstractDTO<
  typeof getUserLinksRequestSchema
> {
  protected rules() {
    return getUserLinksRequestSchema;
  }
}
