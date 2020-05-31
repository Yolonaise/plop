export const apiConfig = {
  configuration: Deno.env.get("API_CONFIGURATION") ?? "local",
  hostname: Deno.env.get("API_HOSTNAME") ?? "localhost",
  port: toInt(Deno.env.get("API_PORT")) ?? 5200,
};

export const dbConfig = {
  host: Deno.env.get("DB_HOST") ?? "diplo",
  port: toInt(Deno.env.get("DB_PORT")) ?? 27017,
  database: Deno.env.get("DB_DATABASE") ?? "plop_home",
};

function toInt(value?: string): number | null {
  return value ? parseInt(value) : null;
}
