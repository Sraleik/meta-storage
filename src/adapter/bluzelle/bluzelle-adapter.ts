import { IAdapter } from "../IAdapter";
import { IItemMeta } from "../../interface/IItemMeta";

export async function createBluzelleMetaStorage(bluzelleConnection: any): Promise<IAdapter> {
  async function create (itemMeta: IItemMeta) {
    await bluzelleConnection
            .create(itemMeta.id, JSON.stringify(itemMeta))
    
    return itemMeta.id 
  };

  async function update(itemMeta: IItemMeta) {
    await bluzelleConnection
            .update(itemMeta.id, JSON.stringify(itemMeta));

    return itemMeta.id
  };

  async function read({ id }: IItemMeta) {
    const value = await bluzelleConnection.read(id);
    return JSON.parse(value);
  };

  async function destroy({ id }: IItemMeta) {
    await bluzelleConnection.delete(id);
    return id
  }
  
  function has({ id }: IItemMeta): Promise<boolean> {
    return bluzelleConnection.has(id);
  }

  async function set(itemMeta: IItemMeta) {
    if (await bluzelleConnection.has(itemMeta.id)) {
      return update(itemMeta);
    }

    return create(itemMeta);
  };

  async function close(){
    await bluzelleConnection.close() //TODO
  }

  return {
    set,
    read,
    destroy,
    has,
    close
  };
}
