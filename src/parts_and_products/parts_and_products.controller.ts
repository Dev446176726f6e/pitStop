import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PartsAndProductsService } from "./parts_and_products.service";
import { CreatePartsAndProductsDto } from "./dto/create-parts_and_product.dto";
import { UpdatePartsAndProductsDto } from "./dto/update-parts_and_product.dto";

@Controller("parts-and-products")
export class PartsAndProductsController {
  constructor(
    private readonly partsAndProductsService: PartsAndProductsService
  ) {}

  @Post()
  create(@Body() createPartsAndProductDto: CreatePartsAndProductsDto) {
    return this.partsAndProductsService.create(createPartsAndProductDto);
  }

  @Get()
  findAll() {
    return this.partsAndProductsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.partsAndProductsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePartsAndProductDto: UpdatePartsAndProductsDto
  ) {
    return this.partsAndProductsService.update(+id, updatePartsAndProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.partsAndProductsService.remove(+id);
  }
}
