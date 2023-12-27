import { Types } from 'mongoose'

export interface IFolder {
  title: string
  parentFolder: Types.ObjectId
  subFolders: Types.ObjectId[]
  files: Types.ObjectId[]
  owner: Types.ObjectId
}
