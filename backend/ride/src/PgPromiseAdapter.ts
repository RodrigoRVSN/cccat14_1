import pgp from "pg-promise";
import { DatabaseConnection } from "./DatabaseConnection";
import pg from "pg-promise/typescript/pg-subset";

export class PgPromiseAdapter implements DatabaseConnection {
  connection: pgp.IDatabase<{}, pg.IClient>

  constructor() {
    this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}