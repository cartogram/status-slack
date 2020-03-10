import {Method} from '@shopify/network';

const mathPath = (regExp: string | RegExp) => (event: FetchEvent) => {
  const url = new URL(event.request.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  console.log(match[0], path);
  return match[0] === path;
};

const matchMethod = (method: Method) => (event: any) => {
  console.log(event.request);
  return event.request.method === method;
};
type Handler = (req: FetchEvent) => Promise<Response>;
interface Route {
  conditions: ((req: FetchEvent) => boolean)[];
  handler: Handler;
}

export class Router {
  private routes: Route[];
  constructor() {
    this.routes = [];
  }

  handle(conditions: Route['conditions'], handler: Route['handler']) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  get(url: string | RegExp, handler: Handler) {
    return this.handle([matchMethod(Method.Get), mathPath(url)], handler);
  }

  post(url: string | RegExp, handler: Handler) {
    return this.handle([matchMethod(Method.Post), mathPath(url)], handler);
  }

  put(url: string | RegExp, handler: Handler) {
    return this.handle([matchMethod(Method.Put), mathPath(url)], handler);
  }

  all(handler: Handler) {
    return this.handle([], handler);
  }

  route(request: FetchEvent) {
    const route = this.resolve(request);

    if (route) {
      return route.handler(request);
    }

    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plain',
      },
    });
  }

  resolve(request: FetchEvent) {
    return this.routes.find((route) => {
      if (
        !route.conditions ||
        (Array.isArray(route) && !route.conditions.length)
      ) {
        return true;
      }

      const conditions = Array.isArray(route.conditions)
        ? route.conditions
        : [route.conditions];

      console.log(
        request,
        conditions.every((condition) => condition(request)),
      );

      return conditions.every((condition) => condition(request));
    });
  }
}
