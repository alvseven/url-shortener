import { type ZodType, ZodError, z } from 'zod';

import { ValidationError } from '../errors/zod-validation.error';
import { ZodCustomErrorMap } from './zod-error-map';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class AbstractDTO<Schema extends ZodType> {
  private zodErrorMap: ZodCustomErrorMap;
  protected data: z.infer<Schema>;

  public constructor(
    data: Record<string, unknown>,
    protected path: Array<Exclude<keyof z.infer<Schema>, symbol>> = [],
  ) {
    this.path = path;
    this.zodErrorMap = new ZodCustomErrorMap();
    this.validate(data);
  }

  protected abstract rules(): Schema;

  public getAll(): z.infer<Schema> {
    return this.data;
  }

  public get<K extends keyof z.infer<Schema>>(key: K) {
    return this.data[key];
  }

  private validate(data: unknown) {
    try {
      this.data = this.rules().parse(data, {
        errorMap: this.zodErrorMap.errorMap.bind(this.zodErrorMap),
        path: this.path,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error);
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
