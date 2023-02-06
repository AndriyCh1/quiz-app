import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import ConfigService from '../config/config.service';

class AwsS3Service {
  private storage: AWS.S3;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    this.region = this.configService.get<string>('AWS_BUCKET_REGION');
    this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
    this.secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');

    this.storage = this.getS3Service();
  }

  private getS3Service(): AWS.S3 {
    return new AWS.S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
    });
  }

  public async getObjectByKey(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    return await this.storage.getObject(params).promise();
  }

  public async uploadObject(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucketName,
      Key: uuid(),
      Body: file.buffer,
    };

    return await this.storage.upload(params).promise();
  }

  public async deleteObject(key: string): Promise<AWS.S3.DeleteObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    return await this.storage.deleteObject(params).promise();
  }
}

export default AwsS3Service;
