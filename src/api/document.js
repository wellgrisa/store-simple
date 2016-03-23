import loki from 'lokijs';



export function save(document){
  const db = new loki('store-simple-db');

  const documents = db.addCollections('documents');
  debugger;
  console.log('passeiaqui');
  return documents.insert(document);
}
