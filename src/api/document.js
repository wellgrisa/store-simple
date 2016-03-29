import { documents } from '../data';

export async function save(document){
  return await documents.insert(document);
}

export async function getAll(){  
  return await documents.find({});
}
