import { DatabaseConnection } from "../database/DatabaseConnection";

export class ORM {
  constructor(private connection: DatabaseConnection) { }

  async save(model: Model) {
    const columns = model.columns.map((column) => column.column).join(",");
    const params = model.columns
      .map((column, index) => `$${index + 1}`)
      .join(",");
    const values = model.columns.map((column) => model[column.property]);
    const query = `insert into ${model.schema}.${model.table} (${columns}) values (${params})`;
    await this.connection.query(query, values);
  }

  async get(model: any, field: string, value: string) {
    const query = `select * from ${model.prototype.schema}.${model.prototype.table} where ${field} = $1`;
    const [data] = await this.connection.query(query, [value]);
    const obj = new model();
    for (const column of model.prototype.columns) {
      obj[column.property] = data[column.column];
    }
    return obj;
  }
}

export class Model {
  declare schema: string;
  declare table: string;
  declare columns: { column: string; property: string; pk: boolean }[];
  [key: string]: any;
}

export const model = (schema: string, table: string) => {
  return (constructor: Function) => {
    constructor.prototype.schema = schema;
    constructor.prototype.table = table;
  };
};

export const column = (name: string, pk: boolean = false) => {
  return (target: any, propertyKey: string) => {
    target.columns = target.columns || [];
    target.columns.push({ column: name, property: propertyKey, pk });
  };
};
