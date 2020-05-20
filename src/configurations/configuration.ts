export const apiConfig = {
  configuration: Deno.env.get('API_CONFIGURATION') ?? 'local',
  hostname: Deno.env.get('API_HOSTNAME') ?? 'localhost',
  port: toInt(Deno.env.get('API_PORT')) ?? 5200
};

export const dbConfig =  {
  user: Deno.env.get('POSTGRES_USER') ?? 'trex',
  password: Deno.env.get('POSTGRES_PASSWORD') ?? 'trexxx',
  database: Deno.env.get('POSTGRES_DB') ?? 'plop_db'
}

function toInt(value?: string): number | null {
  return value ? parseInt(value) : null;
}

