export async function createBluzelleMetaStorage(bluzelleBdd: any) {
  const create = (itemMeta: any) => {
    return bluzelleBdd.create(itemMeta.id, JSON.stringify(itemMeta));
  };

  const update = (itemMeta: any) => {
    return bluzelleBdd.update(itemMeta.id, JSON.stringify(itemMeta));
  };

  const read = async (key: string, type: string) => {
    const value = await bluzelleBdd.read(key);
    return JSON.parse(value);
  };

  const set = async (itemMeta: any) => {
    if (await bluzelleBdd.has(itemMeta.id)) {
      return update(itemMeta);
    }

    return create(itemMeta);
  };

  return {
    ...bluzelleBdd,
    create,
    update,
    read,
    set,
  };
}
