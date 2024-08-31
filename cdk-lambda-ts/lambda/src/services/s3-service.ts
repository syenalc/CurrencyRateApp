import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const uploadFile = async (bucket: string, key: string, body: Buffer) => {
    // S3にファイルをアップロードする処理
    // ...
};

export const downloadFile = async (bucket: string, key: string) => {
    // S3からファイルをダウンロードする処理
    // ...
};
