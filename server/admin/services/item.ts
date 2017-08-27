import * as itemRepository from '../repositories/Item';
import { IItem } from '../../interfaces/IItem';
import * as Utils from '../../utils/utils';

export async function list(filter: any) {   
    filter = JSON.parse(filter); 
    if(!filter.name) {
        delete filter.name;
    }

    if(!filter.requester) {
        delete filter.requester;
    }

    if(!filter.status) {
        delete filter.status;
    }

    filter = await Utils.addLike(filter);

    if(filter.requester) {
        filter.user = {};
        filter.user.name = filter.requester;
        delete filter.requester;
    }
    return await itemRepository.list(filter);
}
export async function findById(id: number) {
    return await itemRepository.findById(id);
}

export async function saveItem(item: IItem) {
    return await itemRepository.saveItem(item);
}

export async function deleteItem(id: string) {
    return await itemRepository.deleteItem(id);
}

export async function updateItem(item: IItem) {
   return await itemRepository.updateItem(item);
}