import { Controller, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TagsService } from '../tags/tags.service';
import { TagPatchDto } from '../tags/dto/tag-patch.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Patch(':id')
  async patchTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() tagPatchDto: TagPatchDto,
  ) {
    return this.tagsService.patchTag(id, tagPatchDto);
  }
}
