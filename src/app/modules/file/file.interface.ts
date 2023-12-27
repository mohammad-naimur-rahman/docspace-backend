import { Model } from 'mongoose'

export interface IFile {
  title: string
  parentFolder: string
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
}

export type FileModel = Model<IFile, Record<string, unknown>>
