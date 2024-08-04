import { DynamicModule, Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import {
  DEFAULT_CONFIG_TOKEN,
  StoreFeatureConfig,
  StoreRootConfig,
} from "./store.config";
import type { StoreConfig } from "./store.config";
let rootStoreConfig: StoreConfig;
const DEFAULT_DIRNAME_CONFIG = "store";
const DEFAULT_FILE_NAME = "data.json";

@Module({
  providers: [StoreService],
  exports: [StoreService],
})
class RootStoreModule {}

@Module({
  //   providers: [
  //     StoreService,
  //     {
  //       provide: "STORE_CONFIG",
  //       useValue: {
  //         dirName: "store",
  //         filename: "data.json",
  //       } as StoreConfig,
  //     },
  //   ],
  //   exports: [StoreService],
})
export class StoreModule {
  static forRoot(storeConfig?: StoreRootConfig): DynamicModule {
    rootStoreConfig = StoreModule.createConfig(storeConfig);
    return {
      module: RootStoreModule,
      providers: [
        {
          provide: DEFAULT_CONFIG_TOKEN,
          useValue: rootStoreConfig,
        },
      ],
    };
  }
  static forFeature(storeConfig?: StoreFeatureConfig): DynamicModule {
    const token = "STORE_SERVICE" + storeConfig.filename;
    return {
      module: StoreModule,
      providers: [
        {
          provide: token,
          useFactory: () => {
            const featureStoreConfig = StoreModule.createConfig({
              ...rootStoreConfig,
              ...storeConfig,
            });
            return new StoreService(featureStoreConfig);
          },
        },
      ],
      exports: [token],
    };
  }

  private static createConfig(storeConfig: StoreConfig): StoreConfig {
    return {
      dirname: DEFAULT_DIRNAME_CONFIG,
      filename: DEFAULT_FILE_NAME,
      ...storeConfig,
    };
  }
}
