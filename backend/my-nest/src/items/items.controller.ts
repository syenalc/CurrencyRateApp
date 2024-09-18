import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    // @Get(':id')
    // findById(@Param('id')id:string):Item{
    //     return this.itemsService.findById(id);
    // }

    // @Post()
    // create(
    //     @Body('id')id:string,
    //     @Body('name')name:string,
    //     @Body('description')description:string,
    //     @Body('createdAt')createdAt:string,
    // ):Item{
    //     const item:Item={
    //         id,
    //         name,
    //         description,
    //         createdAt,
    //     }
    //     return this.itemsService.create(item);
    // }
    @Post()
    async create(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('createdAt') createdAt: string,
        @Body('country1') country1: string | null,
        @Body('country2') country2: string | null,
    ): Promise<Item> {  // 返り値をPromise<Item>にする
        const item: Item = {
            id,
            name,
            description,
            createdAt,
            country1,
            country2,
        };
        return await this.itemsService.create(item);  // 非同期処理なのでawaitを付ける
    }

    // @Put(':id')
    // update(@Param('id')id:string){
    //     return this.itemsService.update(id);
    // }
    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updatedItem: Partial<Item>,
    // ): Item {
    //     return this.itemsService.update(id, updatedItem);
    // }
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('description') description: string, // リクエストボディから description を取得
    ): Promise<Item> {
        return await this.itemsService.update(id, description);  // 非同期処理のためawaitを付ける
    }



    // @Delete(':id')
    // delete(@Param('id')id:string){
    //     this.itemsService.delete(id);
    // }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.itemsService.delete(id);  // 非同期処理のためawaitを付ける
    }

}
