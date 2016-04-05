import { documents } from '../data';

export async function save(document){
  return await documents.insert(document);
}

export async function getAll(){
  return await documents.find({});
}

export async function remove (items) {
  return await documents.remove({ _id : { $in : items.map(x => x._id )} }, { multi : true});
}
