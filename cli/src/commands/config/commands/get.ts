import { cliffy } from '../../../../deps.ts';

export const get = new cliffy.Command();

get
  .name('get')
  .description('Get the value of a certain config setting')
  .arguments('<key:string>')
  .action((options, key) => {
    console.log(key);
  });
