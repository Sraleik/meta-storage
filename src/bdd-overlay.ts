async function createMetaStorage(simpleBdd: any) {
  const create = (key: string, value: any) => {
    return simpleBdd.create(key, JSON.stringify(value));
  };

  const update = (key: string, value: any) => {
    return simpleBdd.update(key, JSON.stringify(value));
  };

  const read = async (key: string) => {
    const value = await simpleBdd.read(key);
    return JSON.parse(value);
  };

  const set = async (key: string, value: any) => {
    if (await simpleBdd.has(key)) {
      return update(key, value);
    }

    return create(key, value);
  };

  return {
    ...simpleBdd,
    create,
    update,
    read,
    set,
  };
}

export default createMetaStorage;
