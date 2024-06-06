import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleDrivePhotosService {
  private driveClient: any;
  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
      /**
       * If you need more permissions, you can request other scopes like:
        https://www.googleapis.com/auth/drive.file: Allows read and write access to the files created or opened by the app.
        https://www.googleapis.com/auth/drive: Full, permissive scope to access all of the user's files, including the ability to modify or delete them.
       */
    });
    this.driveClient = google.drive({ version: 'v3', auth });
  }
  async getRandomPhoto(folderId:string):Promise<string>{
    try{
      const response = await this.driveClient.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, thumbnailLink)',
      });
      const files = response.data.files;
      if (!files || files.length === 0) {
        throw new Error('No files found in the folder.');
      }
      const randomFile = files[Math.floor(Math.random() * files.length)];
      //const previewUrl = `https://drive.google.com/uc?export=view&id=${randomFile.id}`;
      return randomFile.thumbnailLink;
    }catch(error){
      throw new Error(`Failed to retrieve photo: ${error.message}`);
    }
  }
}
