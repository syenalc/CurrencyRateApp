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
<<<<<<< HEAD
        }else{
            console.log("aaa");
        }

        console.log('AuthService - Saving user to DynamoDB', auth);
=======
        }

>>>>>>> login
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

<<<<<<< HEAD
    async validateUser(email: string, password: string): Promise<boolean> {
        const params = {
          TableName: this.tableName,
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: {
            ':email': email,
          },
=======
    async validateUser(email: string, password: string): Promise<Auth | null> {
        const params = {
            TableName: this.tableName,
            IndexName: 'EmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
>>>>>>> login
        };
    
        try {
            const result = await this.dynamoDb.query(params).promise();
<<<<<<< HEAD
        
            if (result.Items && result.Items.length > 0) {
                const user = result.Items[0] as Auth;
                return await bcrypt.compare(password, user.password); // パスワードを照合
            }
            return false; // ユーザーが見つからない場合
=======
            
            if (result.Items && result.Items.length > 0) {
                const user = result.Items[0] as Auth;
                const isPasswordValid = await bcrypt.compare(password, user.password);
    
                if (isPasswordValid) {
                    return user; // 認証されたユーザー情報を返す
                } else {
                    console.error('パスワードが一致しません');
                }
            } else {
                console.error('ユーザーが見つかりません');
            }
            return null; // ユーザーが見つからない場合
>>>>>>> login
        } catch (error) {
            console.error('Error querying DynamoDB', error);
            throw new Error('ユーザー認証に失敗しました');
        }
<<<<<<< HEAD
      }
    
      async generateJwtToken(email: string): Promise<string> {
        // JWTトークンを生成するロジック。ここでは仮にシンプルなシークレットキーを使っていますが、
        // 実際の環境では、process.env.JWT_SECRETなどの環境変数を使用します。
        const payload = { email };
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
=======
    }
    

    async generateJwtToken(email: string, name: string): Promise<string> {
        const payload = { email, name }; 
        const secret = this.configService.get<string>('JWT_SECRET');
    
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        
        try {
            return jwt.sign(payload, secret, { expiresIn: '1h' });
>>>>>>> login
        } catch (error) {
            console.error('Error generating JWT token', error);
            throw new Error('JWTトークンの生成に失敗しました');
        }
<<<<<<< HEAD
      }
=======
    }
    
>>>>>>> login
}







