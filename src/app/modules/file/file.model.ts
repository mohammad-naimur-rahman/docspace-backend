import { Schema, model } from 'mongoose'
import { FileModel, IFile } from './file.interface'

const userSchema = new Schema<IFile, FileModel>(
  {
    title: {
      type: String,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    parentFolder: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true,
      max: 10
    },
    type: {
      type: String,
      enum: [
        'doc',
        'docx',
        'jpg',
        'jpeg',
        'pdf',
        'png',
        'ppt',
        'pptx',
        'txt',
        'xlsx',
        'xls'
      ],
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

export const File = model<IFile, FileModel>('File', userSchema)
