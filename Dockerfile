FROM hayd/alpine-deno:1.0.0

WORKDIR /app

USER deno
COPY . .

CMD ["run", "--allow-net", "--allow-env", "-c", "tsconfig.json", "index.ts"]