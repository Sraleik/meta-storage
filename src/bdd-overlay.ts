export async function createMetaStorage(simpleBdd: any) {
  const create = (itemMeta: any) => {
    return simpleBdd.create(itemMeta.id, JSON.stringify(itemMeta));
  };

  const update = (itemMeta: any) => {
    return simpleBdd.update(itemMeta.id, JSON.stringify(itemMeta));
  };

  const read = async (key: string, type: string) => {
    const value = await simpleBdd.read(key);
    return JSON.parse(value);
  };

  const set = async (itemMeta: any) => {
    if (await simpleBdd.has(itemMeta.id)) {
      return update(itemMeta);
    }

    return create(itemMeta);
  };

  return {
    ...simpleBdd,
    create,
    update,
    read,
    set,
  };
}
