/* eslint-disable prefer-promise-reject-errors */
module.exports = function createBluzelleLikeBdd (bdd) {
	function create (key, value) {
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

	function update (key, value) {
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

	function read (key) {
		return new Promise((resolve) => {
			resolve(
				bdd.getItem(key)
			);
		});
	}

	function remove (key) {
		return new Promise((resolve) => {
			resolve(
				bdd.removeItem(key)
			);
		});
	}

	function has (key) {
		return new Promise((resolve) => {
			resolve(
				Boolean(bdd.getItem(key))
			);
		});
	}

	// eslint-disable-next-line no-unused-vars
	return function bddConnection (keyPair) {
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
