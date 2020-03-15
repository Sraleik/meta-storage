import { createConnection } from "typeorm";
import { createMysqlMetaStorage  } from './mysql-adaptater';
import { v4 as uuid } from 'uuid';

let mysqlConnection: any, metaStorage: any;

function fileFactory ({
	cid = 'FakeCID',
	name = 'newFile.txt',
	isEncrypted = false,
	parentFolderId = '/'
} = {}){
	return {
		id: uuid(), 
		type:'file', 
		versions: [ 
			{
				id: uuid(), 
				cid,
				name,
				isEncrypted,
				date: new Date().toISOString(),
				parentFolderId
			} 
		]
	}
}

describe('MetaStorage', () => {
    beforeAll(async function() {
		mysqlConnection= await createConnection();
		metaStorage = await createMysqlMetaStorage(mysqlConnection);
	});

    afterAll(async function() {
		metaStorage.close()
    });

    test('Should create file & versions', async () => {
		const file = fileFactory() 

		await metaStorage.set(file);
		const res = await metaStorage.read(file) 
        expect(file).toStrictEqual(res);
    });

    test('Should update the file', async () => {
		const file = fileFactory() 
		await metaStorage.set(file);

		file.versions[0].name = 'super-plan.txt'	
		await metaStorage.set(file);

		const res = await metaStorage.read(file)

		expect(res).toEqual(file);
	});

	test('Should have the file', async () => {
		const file = fileFactory() 
		const file2 = fileFactory() 
		await metaStorage.set(file);

		const isFileStored = await metaStorage.has(file)
		expect(isFileStored).toEqual(true);
		const isFile2Stored = await metaStorage.has(file2)
		expect(isFile2Stored).toEqual(false);
	});

	test('Should delete the file', async () => {
		const file = fileFactory() 
		await metaStorage.set(file);
		expect(await metaStorage.has(file)).toBe(true)

		await metaStorage.destroy(file)
		expect(await metaStorage.has(file)).toBe(false)
	});

	test('Should have multiple version', async () => {
		const file = fileFactory() 
		const versionDate = new Date()
		versionDate.setSeconds(versionDate.getSeconds() + 10)
		file.versions.push({
			id: uuid(), 
			cid: 'FakerCid',
			name: 'notarealfile.txt',
			date: versionDate.toISOString(),
			isEncrypted: true,
			parentFolderId: '/'
		})

		await metaStorage.set(file);
		const res = await metaStorage.read(file);

		expect(res).toStrictEqual(file);
	});

	test('Should stringify date', async () => {
		const file = fileFactory() 
		await metaStorage.set(file);

		const res = await metaStorage.read(file);

		expect(res.versions[0].date).toBe(file.versions[0].date);
	});
});