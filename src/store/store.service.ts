import { Inject } from "@nestjs/common";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { DEFAULT_CONFIG_TOKEN, StoreConfig } from "./store.config";

export class StoreService {
  constructor(@Inject(DEFAULT_CONFIG_TOKEN) private storeConfig: StoreConfig) {
    if (!existsSync(this.storeConfig.dirname)) {
      mkdirSync(this.storeConfig.dirname);
    }
  }
  save(data) {
    appendFileSync(
      this.storeConfig.dirname + "/" + this.storeConfig.filename,
      JSON.stringify(data) + "\n",
    );
    return true;
  }
}
