import { cliffy } from '../../../../deps.ts';
import { println } from '../../../lib/println.ts';

export const get = new cliffy.Command();

get
  .name('get')
  .description('Get the value of a certain config setting')
  .arguments('<key:string>')
  .action(async (options, key) => {
    await println(key);
  });
