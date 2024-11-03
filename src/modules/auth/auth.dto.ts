import { z } from 'zod';

import { AbstractDTO } from 'src/shared/dtos/abstract-dto';

const atLeastOneUpperCaseChar = /(?=.*?[A-Z])/;
const atLeastOneLowerCaseChar = /(?=.*?[a-z])/;
const atLeastOneNumber = /(?=.*?\d)/;

const SignInRequestSchema = z.object({
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

export type SignInInput = z.infer<typeof SignInRequestSchema>;

export class SignInRequestDTO extends AbstractDTO<typeof SignInRequestSchema> {
  protected rules() {
    return SignInRequestSchema;
  }
}
