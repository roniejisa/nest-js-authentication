import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LogService {
  count = 0;
  log() {
    this.count++;
    return this.count;
  }
}
