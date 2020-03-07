import { execSync } from 'child_process';
import  { createMockBluzelle } from '@sraleik/mock-bluzelle';
import { createMetaStorage  } from './bdd-overlay';

let mockBluzelle: any, metaStorage: any;

describe('MetaStorage', () => {
    beforeAll(async function() {
		mockBluzelle = await createMockBluzelle('./scratch');
		metaStorage = await createMetaStorage(mockBluzelle);
    });

	afterAll(function() {
		execSync('rm -rf ./scratch');
	});

    test('Should create the key and save value', async () => {
        await metaStorage.set('john', 'doe');
        expect(await metaStorage.read('john')).toBe('doe');
    });

    test('Should update the key value', async () => {
		await metaStorage.set('billy', 'bob');
		await metaStorage.set('billy', 'the kid');

		expect(await metaStorage.read('billy')).toBe('the kid');
	});

	test('Should delete the key', async () => {
		await metaStorage.set('neo', 'the one');
		await metaStorage.delete('neo');

		expect(await metaStorage.read('neo')).toBeNull()
	});

	test('Should stringify Array', async () => {
		const fruit = ['banane', 'pêche', 'fraise', 'tomate'];

		await metaStorage.set('fruit', fruit);
		const resFruit = await metaStorage.read('fruit');

		expect(resFruit).toEqual(fruit);
	});

	test('Should stringify Object', async () => {
		const bob = {
			firstName: 'Bob',
			lastName: 'le bricoleur',
			age: 31,
			job: 'worker',
		};

		await metaStorage.set('bob', bob);
		const resBob = await metaStorage.read('bob');

		expect(resBob).toEqual(bob);
	});

	test('Should stringify date', async () => {
		const kirikouBirthday = new Date();
		const kirikou = {
			firstName: 'kirikou',
			lastName: 'est petit',
			birthday: kirikouBirthday,
		};

		await metaStorage.set('kirikou', kirikou);
		const resKirikou = await metaStorage.read('kirikou');

		expect(resKirikou.birthday).toBe(kirikouBirthday.toISOString());
	});
});