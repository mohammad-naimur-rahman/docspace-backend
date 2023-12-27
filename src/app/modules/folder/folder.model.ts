import { Schema, model } from 'mongoose'
import { FolderModel, IFolder } from './folder.interface'

const folderSchema = new Schema<IFolder, FolderModel>(
  {
    title: {
      type: String,
      required: true
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
      required: false
    },
    subFolders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
      }
    ],
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: 'File'
      }
    ],
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

export const Folder = model<IFolder, FolderModel>('Folder', folderSchema)
