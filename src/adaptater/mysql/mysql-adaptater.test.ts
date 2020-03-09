import { execSync } from 'child_process';
import { createConnection } from "typeorm";
import { createMysqlMetaStorage  } from './mysql-adaptater';
import { v4 as uuid } from 'uuid';

let mysqlBdd: any, metaStorage: any;

describe.only('MetaStorage', () => {
    beforeAll(async function() {
		mysqlBdd = await createConnection();
		metaStorage = await createMysqlMetaStorage(mysqlBdd);
	});

    afterAll(async function() {
		metaStorage.close()
    });

    test.only('Should create the key and save value', async () => {
		const file = {
			id: uuid(), 
			type:'file', 
			versions: [ 
				{
					id: uuid(), 
					cid: 'FakeCID',
					name: 'newFile.txt',
					isEncrypted: false,
					date: new Date(),
					parentFolderId: '/'
				} 
			]
		}

		await metaStorage.set(file);
		// const res = await metaStorage.read(user.id) 
        // expect(user).toStrictEqual(res);
    });

    test('Should update the key value', async () => {
		const userId = uuid()
		await metaStorage.set({id: userId, type:'user', name: 'bob'});
		await metaStorage.set({id: userId, type:'user', name: 'john'});

		const res = await metaStorage.read(userId)

		expect(res.name).toBe('john');
	});

	test('Should delete the key', async () => {
		const user = {id: uuid(), type:'user', name: 'neo'}
		await metaStorage.set(user);
		await metaStorage.delete(user.id);

		expect(await metaStorage.read(user.id)).toBeNull()
	});

	test('Should stringify Array', async () => {
		const fruit = {id: uuid(), type: 'fruits', fruitList: ['banane', 'pêche', 'fraise', 'tomate'] };

		await metaStorage.set(fruit);
		const resFruit = await metaStorage.read(fruit.id, fruit.type);

		expect(resFruit).toStrictEqual(fruit);
	});

	test('Should stringify Object', async () => {
		const bob = {
			firstName: 'Bob',
			lastName: 'le bricoleur',
			age: 31,
			job: 'worker',
		};

		const invoice = { id: uuid(), type: 'invoice', to: bob}

		await metaStorage.set(invoice);
		const res= await metaStorage.read(invoice.id, invoice.type);

		expect(res.to).toEqual(bob);
	});

	test('Should stringify date', async () => {
		const kirikouBirthday = new Date();
		const kirikou = {
			id: uuid(),
			type: 'user',
			firstName: 'kirikou',
			lastName: 'est petit',
			birthday: kirikouBirthday,
		};

		await metaStorage.set(kirikou);
		const resKirikou = await metaStorage.read(kirikou.id, kirikou.type);

		expect(resKirikou.birthday).toBe(kirikouBirthday.toISOString());
	});
});