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
      type: Schema.Types.ObjectId,
      ref: 'Folder'
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
