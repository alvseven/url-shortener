import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const atLeastOneUpperCaseChar = /(?=.*?[A-Z])/;
const atLeastOneLowerCaseChar = /(?=.*?[a-z])/;
const atLeastOneNumber = /(?=.*?\d)/;

const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'O campo [password] é obrigatório e deve conter 8 caracteres',
    })
    .regex(
      atLeastOneUpperCaseChar,
      'A senha deve conter pelo menos uma letra maiúscula',
    )
    .regex(
      atLeastOneLowerCaseChar,
      'A senha deve conter pelo menos uma letra minúscula',
    )
    .regex(atLeastOneNumber, 'A senha deve conter pelo menos um número'),
});

const createUserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CreateUserInput = z.infer<typeof createUserRequestSchema>;

export class CreateUserRequestDTO extends AbstractDTO<
  typeof createUserRequestSchema
> {
  protected rules() {
    return createUserRequestSchema;
  }
}

export class CreateUserResponseDTO extends AbstractDTO<
  typeof createUserResponseSchema
> {
  protected rules() {
    return createUserResponseSchema;
  }
}
