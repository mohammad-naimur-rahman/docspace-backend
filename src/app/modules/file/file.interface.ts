import { Model, Types } from 'mongoose'

export interface IFile {
  title: string
  parentFolder: Types.ObjectId
  size: number
  type:
    | 'doc'
    | 'docx'
    | 'jpg'
    | 'jpeg'
    | 'pdf'
    | 'png'
    | 'ppt'
    | 'pptx'
    | 'txt'
    | 'xlsx'
    | 'xls'
  filePath: string
  owner: Types.ObjectId
}

export type FileModel = Model<IFile, Record<string, unknown>>
