import { documents } from '../data';
import datastore from 'nedb-promise'

export function save(document){
  documents.insert(document);

  return document;
}

export async function getAll(){
  return await datastore.fromInstance(documents).find({});
}
