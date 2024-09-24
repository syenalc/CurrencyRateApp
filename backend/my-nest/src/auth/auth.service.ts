import { Injectable } from '@nestjs/common';
import { Auth } from './auth.model';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

    async validateUser(email: string, password: string): Promise<boolean> {
        const params = {
          TableName: this.tableName,
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: {
            ':email': email,
          },
        };
    
        try {
            const result = await this.dynamoDb.query(params).promise();
        
            if (result.Items && result.Items.length > 0) {
                const user = result.Items[0] as Auth;
                return await bcrypt.compare(password, user.password); // パスワードを照合
            }
            return false; // ユーザーが見つからない場合
        } catch (error) {
            console.error('Error querying DynamoDB', error);
            throw new Error('ユーザー認証に失敗しました');
        }
      }
    
      async generateJwtToken(email: string): Promise<string> {
        // JWTトークンを生成するロジック。ここでは仮にシンプルなシークレットキーを使っていますが、
        // 実際の環境では、process.env.JWT_SECRETなどの環境変数を使用します。
        const payload = { email };
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        } catch (error) {
            console.error('Error generating JWT token', error);
            throw new Error('JWTトークンの生成に失敗しました');
        }
      }
}
