import { cliffy } from '../../../../deps.ts';
import { println } from '../../../lib/println.ts';

export const set = new cliffy.Command();

set
  .name('set')
  .description('Set the value of a certain config setting')
  .arguments('<key:string> <value:string>')
  .action(async (options, key, value) => {
    println(key, value);
  });
