import loki from 'lokijs';

var _db = new loki('src/data/store-simple-db.json',
{
  autosave: true,
  autosaveInterval: 10000,
  autoload: true
});

_db.loadDatabase();

export default _db;
