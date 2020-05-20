FROM hayd/alpine-deno:1.0.0

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .
RUN deno cache -c tsconfig.json index.ts

CMD ["run", "--allow-net", "--allow-env", "-c", "tsconfig.json", "index.ts"]