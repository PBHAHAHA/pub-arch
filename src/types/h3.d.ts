import "h3";
import type { Token } from "~/schema/jwt";
declare module "h3" {
  export interface H3EventContext {
    user: {
      name: string;
    };
    token: {
      error?: Error | undefined;
      payload?: Token;
    };
  }
}
