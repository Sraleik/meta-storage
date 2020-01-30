const expect = require('chai').expect;
const { execSync } = require('child_process');
const mockBluzellePromise = require('../test-utils/create-mock-bluzelle');
const createMetaStorage = require('./bdd-overlay');

let mockBluzelle, metaStorage; 

describe('MetaStorage', async () => {
	before(async function() {
		mockBluzelle = await mockBluzellePromise;
		metaStorage = await createMetaStorage(mockBluzelle);
	});

	after(function(){
		execSync('rm -rf ./scratch/*');
	});
	
	it('Should create the key and save value', async () => {
		await metaStorage.set('john', 'doe');

		expect(await metaStorage.read('john')).to.be.equal('doe');
	});

	it('Should update the key value', async () => {
		await metaStorage.set('billy', 'bob');
		await metaStorage.set('billy', 'the kid');

		expect(await metaStorage.read('billy')).to.be.equal('the kid');
	});

	it('Should delete the key', async () => {
		await metaStorage.set('neo', 'the one');
		await metaStorage.delete('neo');

		expect(await metaStorage.read('neo')).to.be.null;
	});

	it('Should stringify Object', async () => {
		const bob = {
			firstName: 'Bob',
			lastName: 'le bricoleur',
			age: 31,
			job: 'worker'
		};

		await metaStorage.set('bob', bob );
		const resBob = await metaStorage.read('bob');

		expect(resBob).to.be.deep.equal(bob);
	});
	
	it('Should stringify date', async () => {
		const kirikouBirthday = new Date();
		const kirikou = {
			firstName: 'kirikou',
			lastName: 'est petit',
			birthday: kirikouBirthday
		};

		await metaStorage.set('kirikou', kirikou);
		const resKirikou = await metaStorage.read('kirikou');

		expect(resKirikou.birthday).to.be.equal(kirikouBirthday.toISOString());
	});
});
