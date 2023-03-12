import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class UploadsService {
  uploadFile(file: Express.Multer.File) {
    const randomString = crypto.randomBytes(10).toString('hex')
    const extension = path.extname(file.originalname)
    const filename = Date.now() + randomString + extension
    const filepath = process.cwd() + `/uploads/${filename}`
    fs.writeFileSync(filepath, file.buffer.toString())
    return filename
  }
}
