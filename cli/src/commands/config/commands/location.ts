import { cliffy } from '../../../../deps.ts';

export const location = new cliffy.Command();

location
  .name('location')
  .description('Get the path to the config file')
  .action(() => {
    console.log('~/.zaprc.yml');
  });
