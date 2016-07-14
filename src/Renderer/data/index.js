import dataStore from './db';
import promise from 'nedb-promise';

export const documents = promise.fromInstance(dataStore('documents'));
