import * as Entities from "./models";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const entities = Object.values(Entities);

const settings: { [env: string]: PostgresConnectionOptions } = {
  production: {
    name: "default",
    type: "postgres",
    url: "postgres://postgres.jvvlgkcdnplwhfbtugkp:Eyva*Postgres@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
    ssl: { rejectUnauthorized: false },
    entities,
    logging: ["error"],
  },
  development: {
    name: "default",
    type: "postgres",
    url: "postgres://postgres.jvvlgkcdnplwhfbtugkp:Eyva*Postgres@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
    entities,
    synchronize: true, // it should not be used in prod
  },
};

const env = (process.env.NODE_ENV as keyof typeof settings) || "development";
export const dataSource = new DataSource(settings[env]);

export async function buildDataSource() {
  await dataSource.initialize();
  return dataSource;
}
