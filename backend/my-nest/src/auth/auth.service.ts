import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth.model';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private dynamoDb: AWS.DynamoDB.DocumentClient;
    private readonly tableName = 'CurrencyRateAppAuthTable'; // DynamoDBテーブル名

    // constructor() {
        //     this.dynamoDb = new AWS.DynamoDB.DocumentClient();
        // }
    constructor(private configService: ConfigService) { // ConfigServiceを注入
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    async create(auth: Auth): Promise<Auth> {
        if (auth.password) {
            const saltRounds = 10;
            console.log('ハッシュ化前のパスワード:', auth.password);
            auth.password = await bcrypt.hash(auth.password, saltRounds);
            console.log('ハッシュ化後のパスワード:', auth.password);
        }

        const params = {
            TableName: this.tableName,
            Item: auth,
        };

        try {
            await this.dynamoDb.put(params).promise();
            console.log('User saved successfully');
            return auth;
        } catch (error) {
            console.error('Error saving item to DynamoDB', error);
            throw new Error('Could not save item');
        }
    }

    async validateUser(email: string, password: string): Promise<boolean> {
        const params = {
            TableName: this.tableName,
            IndexName: 'EmailIndex', // GSIの名前
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
        };
    
        try {
            // DynamoDBから該当するメールアドレスのユーザーを取得
            const result = await this.dynamoDb.query(params).promise();
        
            // mailが一致したときにパスワードの照合を行う
            if (result.Items && result.Items.length > 0) {
                const user = result.Items[0] as Auth;
                const isPasswordValid = await bcrypt.compare(password, user.password);
    
                if (!isPasswordValid) {
                    console.error('パスワードが一致しません');
                }
    
                return isPasswordValid; // パスワードを照合
            } else {
                console.error('ユーザーが見つかりません');
                return false; // ユーザーが見つからない場合
            }
        } catch (error) {
            console.error('Error querying DynamoDB', error);
            throw new Error('ユーザー認証に失敗しました');
        }
    }

    async generateJwtToken(email: string): Promise<string> {
        const payload = { email };
        const secret = this.configService.get<string>('JWT_SECRET'); // ConfigServiceを使って取得
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        try {
            return jwt.sign(payload, secret, { expiresIn: '1h' });
        } catch (error) {
            console.error('Error generating JWT token', error);
            throw new Error('JWTトークンの生成に失敗しました');
        }
    }
}







