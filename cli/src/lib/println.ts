export async function println(x: string, ...other: string[]) {
  return Deno.stdout.write(new TextEncoder().encode(x + other.join(' ') + '\n'));
}
