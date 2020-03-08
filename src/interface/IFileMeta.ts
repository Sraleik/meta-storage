import { IFileVersion } from "./IFileVersion";

export interface IFileMeta {
    id: string;
    type: 'file';
    versions: [IFileVersion] 
}