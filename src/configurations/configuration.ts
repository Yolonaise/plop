export const apiConfig = {
  hostname: Deno.env.get('API_HOSTNAME') ?? '127.0.0.1',
  port: toInt(Deno.env.get('API_PORT')) ?? 5100,
};

function toInt(value?: string): number | null {
  return value ? parseInt(value) : null;
}

export const dbConfig =  {

}
