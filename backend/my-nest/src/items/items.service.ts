// import { Injectable } from '@nestjs/common';
// import { Item } from './items.model';

// @Injectable()
// export class ItemsService {
//     private items: Item[] = [];
    
//     findAll():Item[]{
//         return this.items;
//     }

//     findById(id:string):Item{
//         return this.items.find((item)=>item.id===id);
//     }

//     create(item: Item){
//         this.items.push(item);
//         return item;
//     }

//     update(id: string, description: string): Item {
//         // IDに一致するアイテムを見つける
//         const item = this.items.find((item) => item.id === id);
//         if (!item) {
//             throw new Error('Item not found'); // アイテムが見つからなかった場合のエラーハンドリング
//         }
    
//         // アイテムの description を更新
//         item.description = description;
    
//         // 更新されたアイテムを返す
//         return item;
//     }

//     delete(id:string){
//         this.items= this.items.filter((item)=>item.id !== id);
//     }
// }

import { Injectable } from '@nestjs/common';
import { Item } from './items.model';
import * as AWS from 'aws-sdk';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    private dynamoDb: AWS.DynamoDB.DocumentClient;
    private readonly tableName = 'CurrencyRateAppTable'; // DynamoDBテーブル名

    constructor() {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    
    async findAll(): Promise<Item[]> {
        const params = {
            TableName: this.tableName,
        };

        try {
            const data = await this.dynamoDb.scan(params).promise();
            return data.Items as Item[]; // DynamoDBからのデータを返す
        } catch (error) {
            console.error('DynamoDB Scanエラー', error);
            throw new Error('データの取得に失敗しました');
        }
    }


    async create(item: Item): Promise<Item> {
        const params = {
            TableName: this.tableName, // DynamoDBテーブル名
            Item: item, // フロントエンドから送信されたアイテムデータ
        };

        try {
            await this.dynamoDb.put(params).promise(); // DynamoDBにデータを保存
            return item; // 保存したデータを返す
        } catch (error) {
            console.error('Error saving item to DynamoDB', error);
            throw new Error('Could not save item');
        }
    }

    async update(id: string, description: string): Promise<Item> {
        const params = {
            TableName: this.tableName,
            Key: { id },  // 更新するアイテムのキー
            UpdateExpression: 'set description = :description',
            ExpressionAttributeValues: {
                ':description': description,
            },
            ReturnValues: 'ALL_NEW',  // 更新後のアイテムを返す設定
        };

        try {
            const result = await this.dynamoDb.update(params).promise();
            return result.Attributes as Item; // 更新後のアイテムを返す
        } catch (error) {
            throw new Error('Error updating item: ' + error.message);
        }
    }

    async delete(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id },  // 削除するアイテムのキー
        };

        try {
            await this.dynamoDb.delete(params).promise();
        } catch (error) {
            throw new Error('Error deleting item: ' + error.message);
        }
    }
}
