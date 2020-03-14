import { prepareFile }from './file-utils'
import { classToPlain} from 'class-transformer'
import { IFileMeta } from '../../interface/IFileMeta'
import { FileMeta } from "../../entity/FileMeta";
import { getRepository } from "typeorm";

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
        const fileEntity = await getRepository(FileMeta)
                                  .createQueryBuilder('file_meta')
                                  .leftJoinAndSelect('file_meta.versions', "versions")
                                  .where("file_meta.id = :id", {id})
                                  .orderBy({'versions.date': 'ASC'})
                                  .getOne(); 
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
