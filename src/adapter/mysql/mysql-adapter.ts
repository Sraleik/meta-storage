import { prepareFile }from './file-utils'
import { classToPlain} from 'class-transformer'
import { IFileMeta } from '../../interface/IFileMeta'
import { IItemMeta } from '../../interface/IItemMeta'
import { FileMeta } from "../../entity/FileMeta";
import { getRepository } from "typeorm";
import { IAdapter } from '../IAdapter';

export async function createMysqlMetaStorage(mysqlConnection: any): Promise<IAdapter> {
  async function set(itemMeta: IItemMeta){
      if(itemMeta.type === 'file') {
          const file = await prepareFile(itemMeta as IFileMeta) 
          await file.save()
          
          return file.id
      }
  }
  
  async function read({ id, type }: IItemMeta): Promise<Object | undefined> {
    let res;
    if(type === 'file') {
        const fileEntity = 
          await getRepository(FileMeta)
            .createQueryBuilder('file_meta')
            .leftJoinAndSelect('file_meta.versions', "versions")
            .where("file_meta.id = :id", {id})
            .orderBy({'versions.date': 'ASC'})
            .getOne(); 

        res = classToPlain(fileEntity) 
    }

    return res;
  }

  async function destroy({ id, type }: IItemMeta){
    if(type === 'file') {
        const fileEntity = await FileMeta.findOne({ where: { id }})
        await fileEntity?.remove()

        return id
    }
  }

  async function has({ id, type }: IItemMeta): Promise<boolean>{
    if(type === 'file') {
        const fileEntity = await FileMeta.findOne({ where: { id }})
        return Boolean(fileEntity) 
    }
    return false
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
  }
}
