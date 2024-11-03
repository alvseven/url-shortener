import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaLinksRepository } from '../repositories/links.repository';

import type { SoftDeleteLinkInput } from './soft-delete-link.dto';

@Injectable()
export class SoftDeleteLinkService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async remove({ shortCode, userId }: SoftDeleteLinkInput) {
    const link = await this.linksRepository.findByShortCode(shortCode, {
      select: { userId: true },
    });

    if (!link) {
      throw new NotFoundException('Link não encontrado');
    }

    if (link.userId !== userId) {
      throw new ForbiddenException('Usuário sem permissão para deletar o link');
    }

    const currentDate = new Date();

    await this.linksRepository.softDelete(shortCode, currentDate);
  }
}
