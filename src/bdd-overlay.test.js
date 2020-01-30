const expect = require('chai').expect;

describe('Item', () => {
	it('Should create a file with default name', async () => {
		const file = Item.createFile({ ipfsId: 'QmWKkkeJnRvKVneS195GyeGSj4ihBFunVQKMvKPZZwLokm' });

		expect(file.name).to.be.equal('New file');
		expect(file.type).to.be.equal('file');
		expect(file.parentFolder).to.be.equal('root');
		expect(file.ipfsId).to.be.equal('QmWKkkeJnRvKVneS195GyeGSj4ihBFunVQKMvKPZZwLokm');
	});
});
