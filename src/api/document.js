import db from '../data/db'

export function save(document){
  const _documents = db.getCollection('documents')
    ? db.getCollection('documents')
    : db.addCollection('documents')

  return _documents.insert(document);
}

export function getAll(){
  return db.getCollection('documents')
    ? db.getCollection('documents').data
    : [];
}
