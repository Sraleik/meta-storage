const NodeStorage = require('node-localstorage').LocalStorage;

const createBluzelleInterface = require('./bluzellifier');
const bddConnection = createBluzelleInterface(new NodeStorage('./scratch'));

function createMockBluzelle(){
	return bddConnection({private:'fake', public:'morefake'});
}

module.exports = createMockBluzelle(); 