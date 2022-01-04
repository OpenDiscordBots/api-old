import { Callable } from "./utils/types";

export type RouteData = Record<string, string | number>;
export type Callback = Callable<[Request, RouteData], Promise<Response>>;
export type RouteHandlers = Array<{
  method: string;
  path: string;
  handler: Callback;
}>;

class Route {
  method: string;
  signature: Array<string>;
  callback: Callback;

  constructor(method: string, signature: Array<string>, callback: Callback) {
    this.method = method.toUpperCase();
    this.signature = signature;
    this.callback = callback;
  }

  private handleSpecial(sig: string, part: string): false | string | number {
    if (sig.startsWith(":s")) {
      return part;
    }

    if (sig.startsWith(":i")) {
      return parseInt(part);
    }

    return false;
  }

  public validate(method: string, path: string): false | RouteData {
    if (this.method !== method) {
      return false;
    }

    const parts = path.split("/");
    const result: RouteData = {};

    if (parts.length !== this.signature.length) {
      return false;
    }

    for (let i = 0; i < parts.length; i++) {
      const sigpart = this.signature[i];

      if (sigpart.startsWith(":")) {
        try {
          const part = this.handleSpecial(sigpart, parts[i]);

          if (part === false) {
            return false;
          }

          result[sigpart.slice(2)] = part;
        } catch (e) {
          return false;
        }

        continue;
      }

      if (parts[i] !== this.signature[i]) {
        return false;
      }
    }

    return result;
  }
}

export class Router {
  routes: Array<Route>;

  constructor() {
    this.routes = [];
  }

  public add(method: string, signature: Array<string>, callback: Callback): void {
    this.routes.push(new Route(method, signature, callback));
  }

  public find(method: string, path: string): false | { route: Route; res: RouteData } {
    for (const route of this.routes) {
      const res = route.validate(method, path);

      if (res) {
        return { route, res };
      }
    }

    return false;
  }
}
