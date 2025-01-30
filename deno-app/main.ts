import { collectDefaultMetrics, Registry } from "prom-client";
import config from "./config.ts";
import { saveCarInDB, countRows } from "./database.ts";
import { Car } from "./types.ts";
import { histogram } from "./histogram.ts";

// Creating a Registry to add it to metric
const register = new Registry();
collectDefaultMetrics({ register });
register.registerMetric(histogram);

Deno.serve({ port: config.appPort }, async (req) => {
  const url = new URL(req.url).pathname;
  if (url === "/health") return new Response("OK");

  if (url === "/metrics")
    return register.metrics().then(
      (metrics) =>
        new Response(metrics, {
          headers: {
            "Content-Type": register.contentType,
          },
        })
    );

  if (req.method === "GET" && url === "/api/cars") {
    const car = {
      id: "860ccf86-97d2-42bc-bd2c-6c2bdf56d911",
      producer: "BMW",
      year: 2025,
    } as Car;

    return Response.json(car);
  }

  if (req.method === "POST" && url === "/api/cars") {
    const car = await req.json();
    car.id = crypto.randomUUID();

    // Start a timer. Calling the returned function will observe the duration in seconds in the histogram.
    const end = histogram.startTimer();
    return saveCarInDB(car)
      .then(() => {
        end({ operation: "postgres-save" });
        return Response.json(car, { status: 201 });
      })
      .catch((e) => {
        console.error(e);
        return Response.json({ message: e.message }, { status: 400 });
      });
  }

  if (req.method === "GET" && url === "/api/count") {
    const count = await countRows();
    return Response.json({ count });
  }

  return new Response("Resource not found", { status: 404 });
});
