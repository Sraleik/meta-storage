async function createMetaStorage(simpleBdd) {
	const create = (key, value) => {
		return simpleBdd.create(key, JSON.stringify(value));
	};

	const update = (key, value) => {
		return simpleBdd.update(key, JSON.stringify(value));
	};

	const read = async (key) => {
		const value = await simpleBdd.read(key);
		return JSON.parse(value);
	};

	const set = async (key, value) => {
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
		set
	};
}

module.exports = createMetaStorage; 