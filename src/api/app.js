import { forms, getStoreInstance } from '../data';

export async function getAll(){
  return await forms.find({});
}

export async function saveInstance(document, instance){
  let storeInstance = getStoreInstance(instance);
  if(!document._id){
    return await storeInstance.insert(document);
  } else {
    return await storeInstance.update({ _id : document._id }, document, { returnUpdatedDocs : true });
  }
}
