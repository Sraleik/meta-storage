import "reflect-metadata";
import {v4 as uuid} from "uuid";
import {createConnection} from "typeorm";
import { IFileVersion } from "../../interface/IFileVersion";
import { IFileMeta } from "../../interface/IFileMeta";
import { FileMeta } from "../../entity/FileMeta";
import { FileVersion } from "../../entity/FileVersion";

async function prepareFileVersions(fileVersions?: [IFileVersion] | []): Promise<FileVersion[] | undefined>{
    if(!fileVersions){
        return undefined
    }

    const versions: FileVersion[] = [];

    for(let i = 0; i < fileVersions.length; i++){
        const fileVersion = fileVersions[i]

        let version: FileVersion | undefined = await FileVersion.findOne(fileVersion.id)

        if(!version) {
            version = new FileVersion()
            version.id = uuid()
            version.cid = fileVersion.cid
            version.date = fileVersion.date
            version.name = fileVersion.name
            version.isEncrypted = fileVersion.isEncrypted
            version.parentFolderId = fileVersion.parentFolderId
        }

        versions.push(version)

    }
    
    return versions.length === 0 ? undefined : versions
}

async function prepareFile(fileMeta: IFileMeta){
    const file = new FileMeta()
    file.id = fileMeta.id 
    file.type = fileMeta.type 
    console.log('file', file)
    const versions = await prepareFileVersions(fileMeta.versions)
    console.log('versions', versions)

    file.versions = versions 

    return file
}

//Todo : add IFolderMeta to possible type
async function set(itemMeta: IFileMeta){
    const connection = await createConnection()

    if(itemMeta.type === 'file') {
        const file = await prepareFile(itemMeta) 
        await file.save() 
    }
    
    await connection.close()
}


export {set}