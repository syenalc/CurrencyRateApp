import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    findAll():Item[]{
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id')id:string):Item{
        return this.itemsService.findById(id);
    }

    @Post()
    create(
        @Body('id')id:string,
        @Body('name')name:string,
        @Body('description')description:string,
        @Body('createdAt')createdAt:string,
    ):Item{
        const item:Item={
            id,
            name,
            description,
            createdAt,
        }
        return this.itemsService.create(item);
    }

    @Put(':id')
    update(@Param('id')id:string){
        return this.itemsService.update(id);
    }

    @Delete(':id')
    delete(@Param('id')id:string){
        this.itemsService.delete(id);
    }
}
