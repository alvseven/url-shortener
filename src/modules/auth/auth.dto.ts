import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const signInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInRequestSchema>;

export class SignInRequestDTO extends AbstractDTO<typeof signInRequestSchema> {
  protected rules() {
    return signInRequestSchema;
  }
}
