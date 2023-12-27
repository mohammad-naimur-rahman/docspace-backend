import { Schema, model } from 'mongoose'
import { fileTypesArr } from './file.constants'
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
      ref: 'Folder',
      default: 'root',
      required: true
    },
    size: {
      type: Number,
      max: 10,
      required: true
    },
    type: {
      type: String,
      enum: fileTypesArr,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
