import "reflect-metadata";
import {createConnection} from "typeorm";
import { IFileVersion } from "../../interface/IFileVersion";
import { IFileMeta } from "../../interface/IFileMeta";
import { FileMeta } from "../../entity/FileMeta";
import { FileVersion } from "../../entity/FileVersion";

export async function prepareFileVersions(fileVersions?: [IFileVersion] | []): Promise<FileVersion[] | undefined>{
    if(!fileVersions){
        return undefined
    }

    const versions: FileVersion[] = [];

    for(let i = 0; i < fileVersions.length; i++){
        const fileVersion = fileVersions[i]

        let version = new FileVersion()
        version.id = fileVersion.id
        version.cid = fileVersion.cid
        version.date = fileVersion.date
        version.name = fileVersion.name
        version.isEncrypted = fileVersion.isEncrypted
        version.parentFolderId = fileVersion.parentFolderId

        versions.push(version)

    }
    
    return versions.length === 0 ? undefined : versions
}

export async function prepareFile(fileMeta: IFileMeta): Promise<FileMeta>{
    const file = new FileMeta()
    file.id = fileMeta.id 
    file.type = fileMeta.type 
    const versions = await prepareFileVersions(fileMeta.versions)

    file.versions = versions 

    return file
}
