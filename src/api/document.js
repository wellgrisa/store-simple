import { documents } from '../data';

export async function save(document){
  if(!document._id){
    return await documents.insert(document);
  } else {
    return await documents.update({ _id : document._id }, document, { returnUpdatedDocs : true });
  }
}

export async function getAll(searchTerm = {}){
  return await documents.find(searchTerm);
}

export async function remove (items) {
  return await documents.remove({ _id : { $in : items.map(x => x._id )} }, { multi : true});
}
