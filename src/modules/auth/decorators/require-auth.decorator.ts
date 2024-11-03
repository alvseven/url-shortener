import { SetMetadata } from '@nestjs/common';

export const RequireAuth = (isRequired: boolean = true) =>
  SetMetadata('isAuthRequired', isRequired);
