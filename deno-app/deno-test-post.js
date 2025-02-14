import http from "k6/http";
import { check } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  // vus: 10,
  // A string specifying the total duration of the test run.
  // duration: "20s",
  stages: [
    { duration: "30s", target: 30 },
    { duration: "1m30s", target: 20 },
    { duration: "20s", target: 5 },
  ],
};

// Runs once, for each user at the start
export function init() {
  console.log("Virtual User (VU) setup");
}

// Runs as many times or as long as is configured in the test options.
export default function () {
  const url = "http://localhost:8080/api/cars";
  const payload = JSON.stringify({
    producer: "Porsche",
    year: 2025,
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    "status was 200": (r) => r.status === 201,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });
}
