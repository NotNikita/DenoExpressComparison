import config from "./config.ts";
import { logExistingTables, saveCarInDB } from "./database.ts";
import { Car } from "./types.ts";

Deno.serve({ port: config.appPort }, async (req) => {
  const url = new URL(req.url).pathname;
  if (url === "/health") return new Response("OK");

  if (req.method === "GET" && url === "/api/cars") {
    const car = {
      id: "860ccf86-97d2-42bc-bd2c-6c2bdf56d911",
      producer: "BMW",
      year: 2025,
    } as Car;
    logExistingTables();

    return Response.json(car);
  }

  if (req.method === "POST" && url === "/api/cars") {
    const car = await req.json();
    car.id = crypto.randomUUID();

    // TODO: start timer
    return saveCarInDB(car)
      .then(() => {
        // TODO: stop timer
        return Response.json(car, { status: 201 });
      })
      .catch((e) => {
        console.error(e);
        return Response.json({ message: e.message }, { status: 400 });
      });
  }

  return new Response("Resource not found", { status: 404 });
});
