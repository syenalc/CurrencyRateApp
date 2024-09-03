import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    
    findAll():Item[]{
        return this.items;
    }

    findById(id:string):Item{
        return this.items.find((item)=>item.id===id);
    }

    create(item: Item){
        this.items.push(item);
        return item;
    }

    update(id:string):Item{
        const item=this.findById(id); 
        return item;
    }

    delete(id:string){
        this.items= this.items.filter((item)=>item.id !== id);
    }
}
