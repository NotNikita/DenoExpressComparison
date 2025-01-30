import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics";

const requestDuration = new Trend("request_duration");
const requests = new Counter("requests");
const errors = new Counter("errors");
const successRate = new Rate("success_rate");

export const options = {
  // A number specifying the number of VUs to run concurrently.
  // vus: 10,
  // A string specifying the total duration of the test run.
  // duration: "20s",
  stages: [
    { duration: "30s", target: 30 },
    // { duration: "1m30s", target: 100 },
    // { duration: "20s", target: 300 },
  ],
  thresholds: {
    request_duration: ["avg<200"],
    success_rate: ["rate>0.95"],
  },
};

// Runs as many times or as long as is configured in the test options.
export default function () {
  const res = http.get("http://localhost:8080/api/cars");

  // Basic metrics
  requestDuration.add(res.timings.duration);
  requests.add(1);

  // Track success/failure
  const success = res.status === 200;
  if (!success) {
    errors.add(1);
  }
  successRate.add(success);

  // Basic checks
  check(res, {
    "status was 200": (r) => r.status === 200,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
