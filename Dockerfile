FROM hayd/alpine-deno:1.0.0

WORKDIR /app

USER root

COPY deps.ts .
RUN deno cache --unstable deps.ts

COPY . .
RUN deno cache --unstable -c tsconfig.json index.ts

CMD ["run","-A","-c","tsconfig.json","--unstable","index.ts"]