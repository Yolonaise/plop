import { IConfiguration } from "../../deps.ts";

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

export const rabbitConfig = {
  host: Deno.env.get("RABBIT_HOST") ?? "rabbit",
  port: toInt(Deno.env.get("RABBIT_PORT") ?? "5672"),
  password: Deno.env.get("RABBIT_PASSWORD") ?? "rabbitmq",
  username: Deno.env.get("RABBIT_USERNAME") ?? "rabbitmq",
} as IConfiguration;
