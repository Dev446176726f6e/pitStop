import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceTypeService } from './resource_type.service';
import { CreateResourceTypeDto } from './dto/create-resource_type.dto';
import { UpdateResourceTypeDto } from './dto/update-resource_type.dto';

@Controller('resource-type')
export class ResourceTypeController {
  constructor(private readonly resourceTypeService: ResourceTypeService) {}

  @Post()
  create(@Body() createResourceTypeDto: CreateResourceTypeDto) {
    return this.resourceTypeService.create(createResourceTypeDto);
  }

  @Get()
  findAll() {
    return this.resourceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceTypeDto: UpdateResourceTypeDto) {
    return this.resourceTypeService.update(+id, updateResourceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceTypeService.remove(+id);
  }
}
