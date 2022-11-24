import yargs from 'yargs';

export const getArgs = async () => (await yargs.option('dir', { type: 'string' }).argv);
