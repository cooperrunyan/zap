import { cliffy } from '../../../../deps.ts';

export const ls = new cliffy.Command();

ls.name('ls')
  .description('List the available versions of Zap to use')
  .action(() => {
    console.log('dsfsdfasdf');
  });
