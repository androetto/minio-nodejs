import express, { Request, Response } from 'express';
import multer from 'multer';
import axios from 'axios';
import * as Minio from 'minio';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const uploadDirectory = './uploads';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '',
  port: 9000,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

const app = express();
const port = 310;

app.use(express.json());

const upload = multer({ dest: uploadDirectory });

async function uploadObject(req: Request, res: Response): Promise<void> {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error uploading image.');
      return;
    }

    const imageFile = req.file;
    const { path, bucket } = req.body;

    if (!imageFile) {
      res.status(400).send('No image uploaded.');
      return;
    }

    const filePath: string = './uploads/' + imageFile.filename;

    try {
      await minioClient.fPutObject(bucket, path + imageFile.filename, filePath);

      fs.unlinkSync(filePath);

      const fileUrl = `https://${process.env.MINIO_ENDPOINT}:9000/${bucket}/${path + imageFile.filename}`;

      const pingResponse = await axios.head(fileUrl);
      if (pingResponse.status === 200) {
        res.status(200).send({
          url: fileUrl,
        });
      } else {
        res.status(500).send('Error accessing uploaded object.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading object.');
    }
  });
}

async function deleteObject(req: Request, res: Response): Promise<void> {
  const { bucket, path } = req.body;

  if (!bucket || !path) {
    res.status(400).send('Missing bucket or path.');
    return;
  }

  try {
    await minioClient.removeObject(bucket, path);
    res.status(200).send('Object deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting object.');
  }
}

app.post('/upload-object', uploadObject);
app.delete('/delete-object', deleteObject);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
