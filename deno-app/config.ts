import { readFileSync } from "node:fs";
import { load } from "js-yaml";
import { Config } from "./types.ts";

const config = load(readFileSync("./config.yaml", "utf-8")) as Config;

export default config;
