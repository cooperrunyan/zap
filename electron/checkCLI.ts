import { exec } from 'child_process';
import { join } from 'path';

export async function checkCLI() {
  return new Promise<string | null>((resolve) => {
    exec('zap -V').on('close', (code) => {
      if (code !== 0 && process.env.NODE_ENV !== 'development')
        resolve(`export PATH="$PATH:${join(__dirname, `../cli/`)}"`);
      else resolve(null);
    });
  });
}
