import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
require('dotenv').config();

@Injectable()
export class GoogleDrivePhotosService {
  private driveClient: any;
  constructor() {

    const auth = new GoogleAuth({

      credentials: {
        client_id: process.env.GOOGLE_CREDENTIALS_CLIENT_ID,
        client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
        project_id: process.env.GOOGLE_CREDENTIALS_PROJECT_ID,
        private_key: process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],  
      /**
        If you need more permissions, you can request other scopes like:
        https://www.googleapis.com/auth/drive.file: Allows read and write access to the files created or opened by the app.
        https://www.googleapis.com/auth/drive: Full, permissive scope to access all of the user's files, including the ability to modify or delete them.
       */
    });
    this.driveClient = google.drive({ version: 'v3', auth });
  }
  async getRandomPhoto(folderId:string){
    try{
      const response = await this.driveClient.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, name)',
      });
      const files = response.data.files;
      if (!files || files.length === 0) {
        throw new Error('No files found in the folder.');
      }
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const previewUrl = `https://drive.google.com/uc?export=view&id=${randomFile.id}`;
      return previewUrl;
    }catch(error){
      throw new Error(`Failed to retrieve photo: ${error.message}`);
    }
  }
}
