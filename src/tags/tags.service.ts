import { Injectable, NotFoundException } from '@nestjs/common';
import { TagPatchDto } from './dto/tag-patch.dto'; // Asegúrate de que el DTO esté importado correctamente.

@Injectable()
export class TagsService {
  private tags: { id: number; tag: string }[] = [
    { id: 1, tag: 'Disponible' },
    { id: 2, tag: 'Agotado' },
    // Agrega más etiquetas si es necesario
  ];

  // Método para obtener todas las tags
  getAllTags() {
    return this.tags;
  }

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
