import { LocalStorage as NodeStorage } from 'node-localstorage';

import createBluzelleInterface from './bluzellifier';
const bddConnection = createBluzelleInterface(new NodeStorage('./scratch'));

function createMockBluzelle(){
	return bddConnection({private:'fake', public:'morefake'}); 
}

export default createMockBluzelle(); 