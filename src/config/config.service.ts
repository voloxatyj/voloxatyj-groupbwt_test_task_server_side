import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('SERVER_PORT');
  }

  public async getMongoConfig() {
    const host = this.get('MONGO_DB_HOST');
    const database = this.get('MONGO_DB_DATABASE');
    const user = this.get('MONGO_DB_USER');
    const password = this.get('MONGO_DB_PASSWORD');
    console.log(``);

    return {
      uri: 'mongodb://localhost:27017',
      useNewUrlParser: true,
      useUnifieldTopology: true,
    };
  }
}
