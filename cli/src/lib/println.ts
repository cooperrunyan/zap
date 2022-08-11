export function println(x: string, ...other: string[]) {
  return Deno.stdout.writeSync(new TextEncoder().encode(x + other.join(' ') + '\n'));
}
