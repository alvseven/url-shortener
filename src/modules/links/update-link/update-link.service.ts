import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaLinksRepository } from '../repositories/links.repository';

import type { UpdateLinkInput } from './update-link.dto';

@Injectable()
export class UpdateLinkService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async update({ shortCode, newUrl, userId }: UpdateLinkInput) {
    const link = await this.linksRepository.findByShortCode(shortCode, {
      select: { userId: true },
    });

    if (!link) {
      throw new NotFoundException('Link não encontrado');
    }

    if (link.userId !== userId) {
      throw new ForbiddenException(
        'Usuário sem permissão para atualizar o link',
      );
    }

    const updatedLink = await this.linksRepository.updateByShortCode(
      shortCode,
      newUrl,
    );

    return updatedLink;
  }
}
