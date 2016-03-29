import { documents } from '../data';

export function save(document){
  documents.insert(document);

  return document;
}

export async function getAll(){
  return await documents.find({});
}
