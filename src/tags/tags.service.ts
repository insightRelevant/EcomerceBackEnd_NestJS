import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    private tags: string[] = ['Etiqueta 1'];
    
    getAllTags(): string[] {
        return this.tags;
    }
}
