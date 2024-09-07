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

    update(id: string, description: string): Item {
        // IDに一致するアイテムを見つける
        const item = this.items.find((item) => item.id === id);
        if (!item) {
            throw new Error('Item not found'); // アイテムが見つからなかった場合のエラーハンドリング
        }
    
        // アイテムの description を更新
        item.description = description;
    
        // 更新されたアイテムを返す
        return item;
    }
    // update(id:string):Item{
    //     const item=this.findById(id); 
    //     return item;
    // }
    // update(id:string):Item{
    //     const item=this.items.find((item)=>item.id===id);; 
    //     // item.description= 
    //     return item;
    // }
    
    // update(id: string, updatedItem: Partial<Item>): Item {
    //     const itemIndex = this.items.findIndex(item => item.id === id);
    //     if (itemIndex === -1) {
    //         throw new Error('Item not found');
    //     }
    
    //     // 指定されたidのアイテムを新しいデータで更新
    //     this.items[itemIndex] = { ...this.items[itemIndex], ...updatedItem };
    //     return this.items[itemIndex];
    // }
    

    delete(id:string){
        this.items= this.items.filter((item)=>item.id !== id);
    }
}
