import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@Controller({
  path: '/v1/uploads'
})
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file)
  }

  @Post('uploads')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 10 },
  ]))
  uploadFiles(@UploadedFiles() files: { files?: Express.Multer.File[] }) {
    return files.files?.map(file => this.uploadsService.uploadFile(file))
  }
}
