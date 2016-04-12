import os from 'os';
import { exec } from 'child_process';

const platform = os.platform();

const action = process.argv.slice(2)[0];

if(action === 'run'){
  if(/win/ig.test(platform)){
    exec('npm run win');
  } else if (/linux/ig.test(platform)){
    exec('npm run lin');
  }  
}
