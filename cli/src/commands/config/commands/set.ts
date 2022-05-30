import { cliffy } from '../../../../deps.ts';

export const set = new cliffy.Command();

set
  .name('set')
  .description('Set the value of a certain config setting')
  .arguments('<key:string> <value:string>')
  .action((options, key, value) => {
    console.log(key, value);
  });
