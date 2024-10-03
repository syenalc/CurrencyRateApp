import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Rate } from './rate.model';

@Injectable()
export class RateService {
  private dynamoDb = new DynamoDB.DocumentClient();
  private tableName = 'saveRateTable3';  // テーブル名を指定

  // レートをDynamoDBに保存するメソッド
  async saveRate(rate:Rate): Promise<any> {
    
    const params = {
      TableName: this.tableName,
      Item: {
        id: rate.id,
        name: rate.name,  
        currencyPair: rate.currencyPair,  
        exchangeRate: rate.exchangeRate,
        timestamp: rate.timestamp,
      },
    };

    try {
      await this.dynamoDb.put(params).promise();
      return { message: 'Rate saved successfully' };
    } catch (error) {
        console.error('Error saving rate:', error);  // エラーの詳細をログ出力
        throw new Error('Could not save rate');
    }
  }

  // 最新のレートをDynamoDBから取得するメソッド
  async getLastRate(name: string, currencyPair: string): Promise<any> {
    const params = {
        TableName: this.tableName,
        IndexName: 'NameCurrencyPairIndex',  // GSIの名前
        KeyConditionExpression: '#name = :name AND #currencyPair = :currencyPair',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#currencyPair': 'currencyPair',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':currencyPair': currencyPair,
        },
        ScanIndexForward: false,  // 新しいものから取得する
        Limit: 1,  // 最新の1件のみ取得
    };

    try {
        const result = await this.dynamoDb.query(params).promise();
        return result.Items?.[0] || { message: 'No rate found' };
    } catch (error) {
        console.error('Error fetching rate:', error);
        throw new Error('Could not fetch rate');
    }
}


//   async getLastRate(currencyPair: string, name: string): Promise<any> {
//     const params = {
//         TableName: this.tableName,
//         KeyConditionExpression: '#id = :id AND begins_with(currencyPair, :currencyPair)',
//         ExpressionAttributeNames: {
//             '#id': 'id', // 'id' をパーティションキーとして使用
//         },
//         ExpressionAttributeValues: {
//             ':id': name, // nameをIDとして扱う
//             ':currencyPair': currencyPair,
//         },
//         ScanIndexForward: false, // 新しいものから取得
//         Limit: 1,  // 最新の1件を取得
//     };

//     try {
//         const result = await this.dynamoDb.query(params).promise();
//         return result.Items?.[0] || { message: 'No rate found' };
//     } catch (error) {
//         console.error('Error fetching rate:', error);
//         throw new Error('Could not fetch rate');
//     }
//     }



//   async getLastRate(currencyPair: string, name: string): Promise<any> {
//     const params = {
//       TableName: this.tableName,
//       KeyConditionExpression: '#name = :name AND begins_with(currencyPair, :currencyPair)',
//       ExpressionAttributeNames: {
//         '#name': 'name',  // 'name' のエイリアスを定義
//       },
//       ExpressionAttributeValues: {
//         ':name': name,
//         ':currencyPair': currencyPair,
//       },
//       ScanIndexForward: false,  // 新しいものから取得
//       Limit: 1,  // 最新の1件を取得
//     };

//     try {
//       const result = await this.dynamoDb.query(params).promise();
//       return result.Items?.[0] || { message: 'No rate found' };
//     } catch (error) {
//         console.error('Error fetching rate:', error);  // エラーの詳細をログ出力
//         throw new Error('Could not fetch rate');
//     }
//   }
}
