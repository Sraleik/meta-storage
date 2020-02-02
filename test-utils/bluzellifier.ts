/* eslint-disable prefer-promise-reject-errors */
export default function createBluzelleLikeBdd (bdd: any) {
	function create (key: string, value: any) {
		return new Promise((resolve, reject) => {
			if (bdd.getItem(key)) {
				reject(new Error(`The key: ${key} already exist`));
			} else {
				resolve(
					bdd.setItem(key, value)
				);
			}
		});
	}

	function update (key: string, value: any) {
		return new Promise((resolve, reject) => {
			if (bdd.getItem(key)) {
				resolve(
					bdd.setItem(key, value)
				);
			} else {
				reject(new Error(`The key: ${key} doesn't exist`));
			}
		});
	}

	function read (key: string) {
		return new Promise((resolve) => {
			resolve(
				bdd.getItem(key)
			);
		});
	}

	function remove (key: string) {
		return new Promise((resolve) => {
			resolve(
				bdd.removeItem(key)
			);
		});
	}

	function has (key: string) {
		return new Promise((resolve) => {
			resolve(
				Boolean(bdd.getItem(key))
			);
		});
	}

	// eslint-disable-next-line no-unused-vars
	return function bddConnection (keyPair: KeyPair) {
		return new Promise((resolve) => {
			resolve({
				create,
				update,
				read,
				quickread: read,
				delete: remove,
				has
			});
		});
	};
};

interface KeyPair {
	public: string,
	private: string
}