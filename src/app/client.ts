import {Injectable} from '@angular/core';
import {DeepkitClient} from '@deepkit/rpc';
import {DebugControllerInterface} from '@deepkit/framework-debug-shared';
import {FrameworkControllerInterface} from "../shared";

@Injectable()
export class ControllerClient {
  constructor(protected client: DeepkitClient) {
  }

  public readonly framework = this.client.controller(FrameworkControllerInterface);
}
