import { prepareFile }from './file-utils'
import { createConnection } from "typeorm";
import { classToPlain} from 'class-transformer'
import { IFileMeta } from '../../interface/IFileMeta'
import { FileMeta } from "../../entity/FileMeta";

// TODO rename mysqlBdd en mysqlConnection
export async function createMysqlMetaStorage(mysqlConnection: any) {
  async function set(itemMeta: IFileMeta){
      if(itemMeta.type === 'file') {
          const file = await prepareFile(itemMeta) 
          await file.save().catch((e) => {
            throw new Error(e)
          })
      }
  }
  
  async function read(id: string, type: string){
    if(type === 'file') {
        const fileEntity = await FileMeta.findOne({ where: { id }, relations: ['versions'] })
        return classToPlain(fileEntity)  
    }
  }

  async function destroy(id: string, type: string){
    if(type === 'file') {
        const fileEntity = await FileMeta.findOne({ where: { id }})
        await fileEntity?.remove()
    }
  }

  async function has(id: string, type: string){
    if(type === 'file') {
        const fileEntity = await FileMeta.findOne({ where: { id }})
        return Boolean(fileEntity) 
    }
  }

  async function close(){
    await mysqlConnection.close()
  }

  return {
    set,
    read,
    destroy,
    has,
    close
  };
}
