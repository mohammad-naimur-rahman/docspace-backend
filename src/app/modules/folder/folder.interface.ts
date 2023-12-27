import { Model, Types } from 'mongoose'

export interface IFolder {
  title: string
  parentFolder: Types.ObjectId | 'root'
  subFolders: Types.ObjectId[]
  files: Types.ObjectId[]
  owner: Types.ObjectId
}

export type FolderModel = Model<IFolder, Record<string, unknown>>
