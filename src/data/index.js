import dataStore from './db';
import promise from 'nedb-promise';

export const forms = promise.fromInstance(dataStore('forms'));

export const documents = promise.fromInstance(dataStore('documents'));

export const getStoreInstance = collection => promise.fromInstance(dataStore(collection));
