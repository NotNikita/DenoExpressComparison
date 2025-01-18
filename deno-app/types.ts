export interface Car {
  id: string;
  producer: string;
  year: number;
}

export interface Config {
  appPort: number;
  db: DBConfig;
}

export interface DBConfig {
  user: string;
  password: string;
  database: string;
  host: string;
  table: string;
  maxConnections: number;
}
