import { Injectable } from '@nestjs/common';
import { Auth } from './auth.model';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // private auth: Auth[] = [];
    private dynamoDb: AWS.DynamoDB.DocumentClient;
    private readonly tableName = 'CurrencyRateAppAuthTable'; // DynamoDBテーブル名

    constructor() {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    async create(auth: Auth): Promise<Auth> {
        if (auth.password) {
            const saltRounds = 10;
            console.log('ハッシュ化前のパスワード:', auth.password);
            auth.password = await bcrypt.hash(auth.password, saltRounds);
            console.log('ハッシュ化後のパスワード:', auth.password);
        }else{
            console.log("aaa");
        }

        console.log('AuthService - Saving user to DynamoDB', auth);
        const params = {
            TableName: this.tableName, // DynamoDBテーブル名
            Item: auth, // フロントエンドから送信されたアイテムデータItemキーを使ってデータを指定
        };

        try {
            await this.dynamoDb.put(params).promise(); // DynamoDBにデータを保存
            console.log('User saved successfully');
            return auth; // 保存したデータを返す
        } catch (error) {
            console.error('Error saving item to DynamoDB', error);
            throw new Error('Could not save item');
        }
    }
}
