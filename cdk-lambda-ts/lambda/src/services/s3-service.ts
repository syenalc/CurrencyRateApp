import * as AWS from 'aws-sdk';
import * as fs from 'fs'; // Node.js のファイルシステムモジュール

const s3 = new AWS.S3();

export const uploadFile = async (bucket: string, key: string, body: Buffer, contentType: string) => {
    try {
        await s3.upload({
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: contentType, // ファイルの種類に応じて変更
        }).promise();
        console.log(`File uploaded successfully. ${key}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error uploading file: ${error.message}`);
        } else {
            console.error('An unknown error occurred during file upload.');
        }
    }
};

export const uploadDirectory = async (bucket: string, directoryPath: string) => {
    try {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = `${directoryPath}/${file}`;
            const fileContent = fs.readFileSync(filePath);
            const key = file; // 必要に応じてキーを変更

            // contentType を適切に設定する必要があります
            const contentType = 'text/html'; // 例として HTML の Content-Type を設定

            await uploadFile(bucket, key, fileContent, contentType);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error uploading directory: ${error.message}`);
        } else {
            console.error('An unknown error occurred during directory upload.');
        }
    }
};

export const downloadFile = async (bucket: string, key: string, downloadPath: string) => {
    try {
        const params = {
            Bucket: bucket,
            Key: key,
        };

        // S3 からファイルをダウンロードする
        const data = await s3.getObject(params).promise();
        
        // ダウンロードしたファイルの内容をファイルシステムに書き込む
        fs.writeFileSync(downloadPath, data.Body as Buffer);
        console.log(`File downloaded successfully. ${key}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error downloading file: ${error.message}`);
        } else {
            console.error('An unknown error occurred during file download.');
        }
    }
};

