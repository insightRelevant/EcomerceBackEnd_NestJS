import { Injectable, NotFoundException } from '@nestjs/common';
import { TagPatchDto } from './dto/tag-patch.dto';

@Injectable()
export class TagsService {
  getAllTags() {
      throw new Error('Method not implemented.');
  }
  private tags: { id: number; tag: string }[] = [
    { id: 1, tag: 'Etiqueta 1' },
  ];

  // Método para actualizar un tag específico
  patchTag(id: number, tagPatchDto: TagPatchDto) {
    const tagIndex = this.tags.findIndex((tag) => tag.id === id);
    if (tagIndex === -1) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    const updatedTag = { ...this.tags[tagIndex], ...tagPatchDto };
    this.tags[tagIndex] = updatedTag;
    return updatedTag;
  }
}
