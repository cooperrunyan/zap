export * as cliffy from 'https://deno.land/x/cliffy@v0.24.2/mod.ts';
export { exists } from 'https://deno.land/std@0.141.0/fs/mod.ts';

// @deno-types="https://deno.land/x/chalk_deno@v4.1.1-deno/index.d.ts"
import { Chalk } from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';
export const chalk = new Chalk();
