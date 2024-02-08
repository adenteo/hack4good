'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getAuthSession } from '../auth';
// import { auth } from '@clerk/nextjs';

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION_H4G!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_H4G!,
    secretAccessKey: process.env.AWS_SECRET_KEY_H4G!,
  },
});

export async function getSignedURL(fileName: string) {

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME_H4G!,
    Key: fileName,
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 }, // 60 seconds
  );

  return { success: { url } };
}
