import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import { APP_ENV } from '../../common/constants/app_env';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(envFilePath: string) {
    // todo : 파일이 없는 경우 예외 처리
    this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }

  getNumber(key: string): number {
    return Number(this.get(key));
  }

  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [
      __dirname + '/../../app_modules/**/*.entity{.ts,.js}',
      __dirname + '/../../shared_modules/**/*.entity{.ts,.js}',
    ];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        './../../app_modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
    }
    return {
      entities,
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.get('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      logging:
        (this.get('APP_ENV') === APP_ENV.LOCAL ||
          this.get('APP_ENV') === APP_ENV.DEV) &&
        typeof jest === 'undefined',
      migrationsRun: false,
      synchronize: false,
    };
  }
}
