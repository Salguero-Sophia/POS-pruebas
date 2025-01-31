import { Store } from './store.interface';

export interface Employee {
    id : string;
    code : number
    name : string
    lastName : string
    position : string
    isActive : boolean
    createdAt : Date
    updatedAt : Date
    store : Store
    storeId : string
}