FROM denoland/deno:2.1.5

WORKDIR /app

USER deno

COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["deno", "task", "dev"]