const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("./config");
const { saveCarInDB, countRows } = require("./database");

const app = express();
app.use(bodyParser.json());

app.get("/health", (_, res) => {
  res.send("OK");
});

app.get("/api/cars", (_, res) => {
  const car = {
    id: "860ccf86-97d2-42bc-bd2c-6c2bdf56d911",
    producer: "BMW",
    year: 2025,
  };

  res.setHeader("Content-Type", "application/json");
  res.json(car);
});

app.post("/api/cars", (req, res) => {
  const car = req.body;
  car.id = crypto.randomUUID();

  saveCarInDB(car)
    .then(() => {
      // TODO: stop timer
      res.status(201).json(car);
    })
    .catch((e) => {
      console.error(e);
      res.status(400).json({ message: e.message });
    });
});

app.get("/api/count", async (_, res) => {
  try {
    const count = await countRows();
    res.setHeader("Content-Type", "application/json");
    res.json({ count });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

app.listen(config.appPort, () => {
  console.log("Express server is listening on port " + config.appPort);
});
