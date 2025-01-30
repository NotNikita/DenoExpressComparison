import { Histogram } from "prom-client";

/*
In the context of Prometheus and k6, "buckets" are used in histograms 
to categorize the observed values into different ranges. This is 
particularly useful for measuring the distribution of request durations, 
response times, or other metrics.
*/
// A metric to record the duration of requests such as DB queries
export const histogram = new Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in milliseconds",
  labelNames: ["operation"],
  // These buckets represent the upper bounds of the ranges for request durations.
  // Example: The first bucket counts requests that took up to 50 milliseconds.
  buckets: [
    30, 50, 70, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000,
  ],
});
