export async function createBluzelleMetaStorage(bluzelleConnection: any) {
  const create = (itemMeta: any) => {
    return bluzelleConnection.create(itemMeta.id, JSON.stringify(itemMeta));
  };

  const update = (itemMeta: any) => {
    return bluzelleConnection.update(itemMeta.id, JSON.stringify(itemMeta));
  };

  const read = async (id: string, type: string) => {
    const value = await bluzelleConnection.read(id);
    return JSON.parse(value);
  };

  const set = async (itemMeta: any) => {
    if (await bluzelleConnection.has(itemMeta.id)) {
      return update(itemMeta);
    }

    return create(itemMeta);
  };

  return {
    ...bluzelleConnection,
    create,
    update,
    read,
    set,
  };
}
