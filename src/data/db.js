import Datastore from 'nedb';
import path from 'path';

import config from '../config';

const DB_PATH = config.development.db

export default function Store(name) {
  let store = new Datastore({
    filename: path.join(DB_PATH, `${name}.json`),
    autoload: true
  })

  return store;
}
