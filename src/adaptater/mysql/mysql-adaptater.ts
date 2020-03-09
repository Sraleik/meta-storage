import { prepareFile }from './file-utils'
import { createConnection } from "typeorm";
import { IFileMeta } from '../../interface/IFileMeta'

// TODO rename mysqlBdd en mysqlConnection
export async function createMysqlMetaStorage(mysqlBdd: any) {
  async function set(itemMeta: IFileMeta){

      if(itemMeta.type === 'file') {
          const file = await prepareFile(itemMeta) 
          await file.save() 
      }
      
  }
  
  async function close(){
    await mysqlBdd.close()
  }

  return {
    set,
    close
  };
}
